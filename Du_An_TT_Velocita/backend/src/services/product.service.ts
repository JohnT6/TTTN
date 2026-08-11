/* eslint-disable @typescript-eslint/no-explicit-any */
import productRepository from '../repositories/product.repository';
import { productQueryData, createProductData, updateProductData } from '../types/product';
import { Prisma, GenderCategory } from '../generated/prisma/client';

const toRelativePath = (url: any): string => {
  if (!url || typeof url !== 'string') return '';
  let clean = url.trim();
  if (clean.startsWith('http://localhost:3000')) {
    clean = clean.replace('http://localhost:3000', '');
  } else if (clean.startsWith('http://127.0.0.1:3000')) {
    clean = clean.replace('http://127.0.0.1:3000', '');
  } else {
    clean = clean.replace(/^https?:\/\/[^\/]+/i, '');
  }
  return clean;
};

const sanitizeHtmlContent = (htmlContent?: string | null): string => {
  if (!htmlContent || typeof htmlContent !== 'string') return htmlContent || '';
  let clean = htmlContent.replace(/src=["']http:\/\/localhost:3000(\/[^"']*)["']/gi, 'src="$1"');
  clean = clean.replace(/src=["']http:\/\/127.0.0.1:3000(\/[^"']*)["']/gi, 'src="$1"');
  return clean;
};

export const productServices = {
  getAllProducts: async (query: productQueryData | any) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 100; // Tăng limit lấy đủ danh mục sản phẩm cho Catalog
    const skip = (page - 1) * limit;

    const isAdmin = query.admin === 'true' || query.admin === true || query.includeHidden === 'true';
    const where: Prisma.ProductWhereInput = {};

    // Chỉ lọc status = true khi là truy vấn từ trang Client người dùng
    if (!isAdmin) {
      where.status = true;
    }

    // 1. Lọc Đa Thương Hiệu / Danh Mục (Ví dụ: ?category=Adidas,Nike hoặc array)
    const catQuery = query.category || query.categories || query.categoryId;
    if (catQuery) {
      const catList = typeof catQuery === 'string' 
        ? catQuery.split(',').map((c: string) => c.trim()).filter(Boolean)
        : Array.isArray(catQuery) ? catQuery : [catQuery];

      if (catList.length > 0) {
        where.category = {
          name: {
            in: catList,
          },
        };
      }
    }

    // 2. Lọc Giới Tính (MEN, WOMEN, UNISEX)
    if (query.gender) {
      const gUpper = String(query.gender).toUpperCase();
      if (gUpper === 'MEN') {
        where.gender = { in: [GenderCategory.MEN, GenderCategory.UNISEX] };
      } else if (gUpper === 'WOMEN') {
        where.gender = { in: [GenderCategory.WOMEN, GenderCategory.UNISEX] };
      } else if (gUpper === 'UNISEX') {
        where.gender = GenderCategory.UNISEX;
      }
    }

    // 3. Lọc cờ Sản phẩm Mới, Sale, Bán chạy
    if (query.isNew === 'true' || query.isNew === true) where.isNew = true;
    if (query.isSale === 'true' || query.isSale === true) where.isSale = true;
    if (query.isBest === 'true' || query.isBest === true) where.isBest = true;

    // 4. Lọc theo Khoảng Giá minPrice & maxPrice
    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      const min = Number(query.minPrice);
      const max = Number(query.maxPrice);
      where.price = {};
      if (!isNaN(min)) where.price.gte = min;
      if (!isNaN(max)) where.price.lte = max;
    }

    // 5. Lọc theo Kích thước (Size) từ Variants & Màu sắc (colorName) từ Product
    const sizes = query.size ? String(query.size).split(',').map((s) => s.trim()).filter(Boolean) : [];
    const colors = query.color ? String(query.color).split(',').map((c) => c.trim()).filter(Boolean) : [];

    if (sizes.length > 0) {
      where.variants = { some: { size: { in: sizes } } };
    }
    if (colors.length > 0) {
      where.colorName = { in: colors };
    }

    // 6. Tìm kiếm theo từ khóa search / q
    const keyword = query.search || query.q;
    if (keyword) {
      where.OR = [
        { name: { contains: String(keyword) } },
        { description: { contains: String(keyword) } },
      ];
    }

    // 7. Xử lý Sắp Xếp (Sort By)
    let orderBy: any = { createdAt: 'desc' };
    if (query.sort === 'price_asc') orderBy = { price: 'asc' };
    if (query.sort === 'price_desc') orderBy = { price: 'desc' };
    if (query.sort === 'name_asc') orderBy = { name: 'asc' };
    if (query.sort === 'name_desc') orderBy = { name: 'desc' };

    // Query dữ liệu thực từ Prisma
    const items = await (productRepository as any).model.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        variants: true,
      },
    });

    const total = await productRepository.count({ where });

    return {
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  getProductDetail: async (idOrSlug: string) => {
    let product = await productRepository.findDetailById(idOrSlug);

    if (!product) {
      product = await productRepository.findBySlug(idOrSlug);
    }

    if (!product) {
      throw new Error('Sản phẩm không tồn tại hoặc đã bị ẩn.');
    }

    let colorVariants: any[] = [];
    if (product.styleCode) {
      colorVariants = await (productRepository as any).model.findMany({
        where: {
          styleCode: product.styleCode,
          status: true,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          colorName: true,
          image: true,
          price: true,
          salePrice: true,
        },
      });
    }

    if (colorVariants.length === 0) {
      colorVariants = [
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          colorName: product.colorName,
          image: product.image,
          price: product.price,
          salePrice: product.salePrice,
        },
      ];
    }

    return {
      ...product,
      colorVariants,
    };
  },

  createProduct: async (data: any) => {
    const slug = data.slug || (data.name ? data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now() : `product-${Date.now()}`);
    const rawImages = Array.isArray(data.images) ? data.images : (data.image ? [data.image] : []);
    const images = rawImages.map((img: string) => toRelativePath(img)).filter(Boolean);
    const variantsData = Array.isArray(data.variants) ? data.variants : (
      Array.isArray(data.sizes) ? data.sizes.map((s: string) => ({ size: String(s), stock: Number(data.stock || data.quantity || 10) })) : []
    );

    const firstImage = images[0] || toRelativePath(data.image) || '';
    const secondImage = images[1] || firstImage;

    const productData: any = {
      name: data.name,
      slug,
      categoryId: data.categoryId,
      gender: data.gender || 'UNISEX',
      price: Number(data.price),
      salePrice: data.salePrice ? Number(data.salePrice) : null,
      description: sanitizeHtmlContent(data.description),
      details: sanitizeHtmlContent(data.details),
      styleCode: data.styleCode || null,
      colorName: data.colorName || data.color || null,
      image: firstImage,
      hoverImage: secondImage,
      isNew: Boolean(data.isNew),
      isBest: Boolean(data.isBest),
      isSale: Boolean(data.isSale),
      status: data.status !== undefined ? Boolean(data.status) : true,
    };

    if (images.length > 0) {
      productData.images = {
        create: images.map((url: string, idx: number) => ({
          imageUrl: toRelativePath(url),
          sortOrder: idx + 1,
        })),
      };
    }

    if (variantsData.length > 0) {
      const stylePrefix = (data.styleCode || 'PROD').toUpperCase();
      const colorPrefix = (data.colorName || data.color || 'CLR').substring(0, 3).toUpperCase();
      productData.variants = {
        create: variantsData.map((v: any) => ({
          size: String(v.size),
          sku: `${stylePrefix}-${colorPrefix}-${v.size}-${Math.floor(100 + Math.random() * 900)}`,
          stock: Number(v.stock || 0),
        })),
      };
    }

    return await (productRepository as any).model.create({
      data: productData,
      include: {
        images: true,
        variants: true,
        category: true,
      },
    });
  },

  updateProduct: async (id: string, data: any) => {
    const rawImages = Array.isArray(data.images) ? data.images : null;
    const images = rawImages ? rawImages.map((img: string) => toRelativePath(img)).filter(Boolean) : null;
    const variantsData = Array.isArray(data.variants) ? data.variants : (
      Array.isArray(data.sizes) ? data.sizes.map((s: string) => ({ size: String(s), stock: Number(data.stock || data.quantity || 10) })) : null
    );

    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
    if (data.gender !== undefined) updateData.gender = data.gender;
    if (data.price !== undefined) updateData.price = Number(data.price);
    if (data.salePrice !== undefined) updateData.salePrice = data.salePrice ? Number(data.salePrice) : null;
    if (data.description !== undefined) updateData.description = sanitizeHtmlContent(data.description);
    if (data.details !== undefined) updateData.details = sanitizeHtmlContent(data.details);
    if (data.styleCode !== undefined) updateData.styleCode = data.styleCode;
    if (data.colorName !== undefined || data.color !== undefined) updateData.colorName = data.colorName || data.color;
    if (data.isNew !== undefined) updateData.isNew = Boolean(data.isNew);
    if (data.isBest !== undefined) updateData.isBest = Boolean(data.isBest);
    if (data.isSale !== undefined) updateData.isSale = Boolean(data.isSale);
    if (data.status !== undefined) updateData.status = Boolean(data.status);

    if (images && images.length > 0) {
      updateData.image = images[0];
      updateData.hoverImage = images[1] || images[0];

      await (productRepository as any).model.update({
        where: { id },
        data: {
          images: {
            deleteMany: {},
            create: images.map((url: string, idx: number) => ({
              imageUrl: toRelativePath(url),
              sortOrder: idx + 1,
            })),
          },
        },
      });
    }

    if (variantsData && variantsData.length > 0) {
      const stylePrefix = (data.styleCode || updateData.styleCode || 'PROD').toUpperCase();
      const colorPrefix = (data.colorName || data.color || updateData.colorName || 'CLR').substring(0, 3).toUpperCase();
      await (productRepository as any).model.update({
        where: { id },
        data: {
          variants: {
            deleteMany: {},
            create: variantsData.map((v: any) => ({
              size: String(v.size),
              sku: `${stylePrefix}-${colorPrefix}-${v.size}-${Math.floor(100 + Math.random() * 900)}`,
              stock: Number(v.stock || 0),
            })),
          },
        },
      });
    }

    return await (productRepository as any).model.update({
      where: { id },
      data: updateData,
      include: {
        images: true,
        variants: true,
        category: true,
      },
    });
  },

  deleteProduct: async (id: string) => {
    return await productRepository.delete(id);
  },
};
