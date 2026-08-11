import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../components/common/ProductCard';
import ProductCardSkeleton from '../../components/skeletons/ProductCardSkeleton';
import ProductFilter from '../../components/catalog/ProductFilter';
import { fetchProducts } from '../../store/productSlice';

const ProductCatalogPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Lấy dữ liệu sản phẩm và trạng thái loading từ Redux Store
  const storeProducts = useSelector((state) => state.products?.items || []);
  const loading = useSelector((state) => state.products?.loading || false);

  // Đọc tất cả các cờ từ URL query parameters
  const categoryParam = searchParams.get('category');
  const genderParam = searchParams.get('gender');
  const isSaleParam = searchParams.get('is_sale');
  const isNewParam = searchParams.get('is_new');
  const isBestParam = searchParams.get('is_best');
  const searchKeywordParam = searchParams.get('search') || searchParams.get('q');
  const sizeParam = searchParams.get('size');
  const colorParam = searchParams.get('color');
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  const sortParam = searchParams.get('sort');

  // Đọc danh sách mảng từ URL query dạng phẩy
  const urlBrands = useMemo(() => {
    if (!categoryParam) return [];
    return categoryParam.split(',').map((b) => b.trim()).filter(Boolean);
  }, [categoryParam]);

  const urlSizes = useMemo(() => {
    if (!sizeParam) return [];
    return sizeParam.split(',').map((s) => s.trim()).filter(Boolean);
  }, [sizeParam]);

  const urlColors = useMemo(() => {
    if (!colorParam) return [];
    return colorParam.split(',').map((c) => c.trim()).filter(Boolean);
  }, [colorParam]);

  const urlMinPrice = useMemo(() => {
    const p = Number(minPriceParam);
    return !isNaN(p) && p > 0 ? p : null;
  }, [minPriceParam]);

  const urlMaxPrice = useMemo(() => {
    const p = Number(maxPriceParam);
    return !isNaN(p) && p > 0 ? p : null;
  }, [maxPriceParam]);

  // State các bộ lọc được áp dụng đồng bộ theo URL
  const [appliedFilters, setAppliedFilters] = useState({
    brands: urlBrands,
    sizes: urlSizes,
    colors: urlColors,
    minPrice: urlMinPrice,
    maxPrice: urlMaxPrice,
    sortBy: sortParam || 'default',
  });

  // Tự động gọi API Redux nạp sản phẩm từ Backend
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Tự động đồng bộ tất cả URL query params vào state bộ lọc khi URL thay đổi
  useEffect(() => {
    setAppliedFilters({
      brands: urlBrands,
      sizes: urlSizes,
      colors: urlColors,
      minPrice: urlMinPrice,
      maxPrice: urlMaxPrice,
      sortBy: sortParam || 'default',
    });
  }, [urlBrands, urlSizes, urlColors, urlMinPrice, urlMaxPrice, sortParam]);

  // Tính tiêu đề hiển thị động theo URL
  const pageTitle = useMemo(() => {
    if (searchKeywordParam) return `Kết quả tìm kiếm: "${searchKeywordParam}"`;
    if (urlBrands.length > 0) return `Sản phẩm ${urlBrands.join(', ')}`;
    if (genderParam === 'MEN' || genderParam === 'men') return 'Sản phẩm Nam';
    if (genderParam === 'WOMEN' || genderParam === 'women') return 'Sản phẩm Nữ';
    if (isSaleParam === 'true') return 'Sản phẩm Khuyến Mãi (Sale)';
    if (isNewParam === 'true') return 'Sản phẩm Mới Nổi Bật';
    if (isBestParam === 'true') return 'Sản phẩm Bán Chạy Nhất';
    return 'Danh mục sản phẩm';
  }, [searchKeywordParam, urlBrands, genderParam, isSaleParam, isNewParam, isBestParam]);

  // Lọc và sắp xếp sản phẩm thực tế
  const filteredProducts = useMemo(() => {
    return storeProducts
      .filter((product) => {
        const brandName = product.brand || product.category?.name || '';
        const prodName = product.name || product.title || '';
        const prodGender = (product.gender || 'unisex').toUpperCase();
        const targetGender = (genderParam || '').toUpperCase();

        // Lọc theo từ khóa tìm kiếm trên URL (?search=TừKhóa)
        if (searchKeywordParam) {
          const kw = searchKeywordParam.trim().toLowerCase();
          const matchName = prodName.toLowerCase().includes(kw);
          const matchBrand = brandName.toLowerCase().includes(kw);
          const matchDesc = (product.description || '').toLowerCase().includes(kw);
          if (!matchName && !matchBrand && !matchDesc) {
            return false;
          }
        }

        // Lọc theo Giới Tính Nam / Nữ
        if (targetGender && targetGender !== 'ALL') {
          if (targetGender === 'MEN' && prodGender !== 'MEN' && prodGender !== 'UNISEX') {
            return false;
          }
          if (targetGender === 'WOMEN' && prodGender !== 'WOMEN' && prodGender !== 'UNISEX') {
            return false;
          }
        }

        if (isSaleParam === 'true' && !product.is_sale) {
          return false;
        }
        if (isNewParam === 'true' && !product.is_new) {
          return false;
        }
        if (isBestParam === 'true' && !product.is_best) {
          return false;
        }

        // Lọc thương hiệu theo mảng URL
        if (appliedFilters.brands.length > 0) {
          if (!appliedFilters.brands.some((b) => b.toLowerCase() === brandName.toLowerCase())) {
            return false;
          }
        }

        // Lọc kích thước (Size)
        if (appliedFilters.sizes.length > 0) {
          if (!product.sizes || !appliedFilters.sizes.some((s) => product.sizes.includes(s))) {
            return false;
          }
        }

        // Lọc màu sắc (Color)
        if (appliedFilters.colors.length > 0) {
          const prodColor = product.colorName || product.color_name || '';
          if (!appliedFilters.colors.some((c) => prodColor.toLowerCase().includes(c.toLowerCase()))) {
            return false;
          }
        }

        // Lọc khoảng giá minPrice & maxPrice
        const priceValue = product.numericPrice || product.rawPrice || 0;
        if (appliedFilters.minPrice !== null && priceValue < appliedFilters.minPrice) {
          return false;
        }
        if (appliedFilters.maxPrice !== null && priceValue > appliedFilters.maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.numericPrice || a.rawPrice || 0;
        const priceB = b.numericPrice || b.rawPrice || 0;
        const titleA = a.title || a.name || '';
        const titleB = b.title || b.name || '';

        if (appliedFilters.sortBy === 'price_asc') {
          return priceA - priceB;
        }
        if (appliedFilters.sortBy === 'price_desc') {
          return priceB - priceA;
        }
        if (appliedFilters.sortBy === 'name_asc') {
          return titleA.localeCompare(titleB);
        }
        if (appliedFilters.sortBy === 'name_desc') {
          return titleB.localeCompare(titleA);
        }
        return 0;
      });
  }, [storeProducts, searchKeywordParam, genderParam, isSaleParam, isNewParam, isBestParam, appliedFilters]);

  // Xử lý khi người dùng bấm "Áp dụng" trong Bộ lọc
  const handleApplyFilters = (newFilters) => {
    setAppliedFilters(newFilters);

    const newParams = new URLSearchParams(searchParams);

    // 1. Thương hiệu (category)
    if (newFilters.brands && newFilters.brands.length > 0) {
      newParams.set('category', newFilters.brands.join(','));
    } else {
      newParams.delete('category');
    }

    // 2. Kích thước (size)
    if (newFilters.sizes && newFilters.sizes.length > 0) {
      newParams.set('size', newFilters.sizes.join(','));
    } else {
      newParams.delete('size');
    }

    // 3. Màu sắc (color)
    if (newFilters.colors && newFilters.colors.length > 0) {
      newParams.set('color', newFilters.colors.join(','));
    } else {
      newParams.delete('color');
    }

    // 4. Giá tối thiểu (minPrice)
    if (newFilters.minPrice !== null && newFilters.minPrice !== undefined && Number(newFilters.minPrice) > 0) {
      newParams.set('minPrice', String(newFilters.minPrice));
    } else {
      newParams.delete('minPrice');
    }

    // 5. Giá tối đa (maxPrice)
    if (newFilters.maxPrice !== null && newFilters.maxPrice !== undefined && Number(newFilters.maxPrice) < 12490000) {
      newParams.set('maxPrice', String(newFilters.maxPrice));
    } else {
      newParams.delete('maxPrice');
    }

    // 6. Sắp xếp (sort)
    if (newFilters.sortBy && newFilters.sortBy !== 'default') {
      newParams.set('sort', newFilters.sortBy);
    } else {
      newParams.delete('sort');
    }

    setSearchParams(newParams);
  };

  // Đặt lại bộ lọc
  const handleResetFilters = () => {
    setAppliedFilters({
      brands: [],
      sizes: [],
      colors: [],
      minPrice: null,
      maxPrice: null,
      sortBy: 'default',
    });
    setSearchParams({});
  };

  return (
    <main>
      <div className="container home max-w-[1440px] w-full mx-auto px-5">
        {/* Top Bar */}
        <section className="home-container product-mt mt-[136px]">
          <div className="home-row flex items-center justify-between mb-8">
            <div>
              <h2 className="home__heading text-[32px] font-bold">{pageTitle}</h2>
              <p className="text-sm text-gray-500 mt-1">Hiển thị {loading ? '...' : filteredProducts.length} sản phẩm</p>
            </div>
            <div id="filter-wrap" className="filter-wrap relative">
              {/* Nút Hiện bộ lọc */}
              <button
                className="filter-btn group flex items-center gap-[10px] text-sm font-semibold text-black px-5 py-2.5 rounded-full border border-[#d2d1d6] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer shadow-xs"
                onClick={() => setIsFilterOpen(true)}
              >
                <span>Hiện bộ lọc</span>
                <img
                  src="/assets/icons/filter.svg"
                  alt="Filter Icon"
                  className="filter-btn__icon w-4 h-4 transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                />
              </button>
            </div>
          </div>

          {/* Product Grid / Skeleton */}
          {loading ? (
            <div className="product-cate grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[30px]">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <ProductCardSkeleton key={n} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="product-cate grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[30px]">
              {filteredProducts.map((product) => (
                <div key={product.id} className="col">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center space-y-3">
              <p className="text-xl font-bold text-gray-800">Không tìm thấy sản phẩm phù hợp</p>
              <p className="text-sm text-gray-500">Vui lòng thử tìm kiếm với từ khóa khác hoặc bỏ bớt bộ lọc.</p>
            </div>
          )}
        </section>

        {/* Drawer Filter Panel */}
        <ProductFilter
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={appliedFilters}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />
      </div>
    </main>
  );
};

export default ProductCatalogPage;
