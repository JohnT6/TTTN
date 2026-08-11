import { BASE_URL } from '../services/axios.customize';

/**
 * Format đường dẫn ảnh tập trung: 100% ảnh (Assets & Uploads) đều được gọi trực tiếp từ Backend Domain (http://localhost:3000)
 * An toàn tuyệt đối 100% chống crash nếu truyền Object, Array, null hoặc undefined.
 */
export const formatImageUrl = (url) => {
  if (!url) return `${BASE_URL}/assets/imgs/product-adidas-1.jpg`;

  // Nếu url truyền vào là một object (ví dụ { url: '...', imageUrl: '...' })
  if (typeof url === 'object') {
    if (url.url && typeof url.url === 'string') url = url.url;
    else if (url.imageUrl && typeof url.imageUrl === 'string') url = url.imageUrl;
    else if (url.image_url && typeof url.image_url === 'string') url = url.image_url;
    else if (url.image && typeof url.image === 'string') url = url.image;
    else if (url.img && typeof url.img === 'string') url = url.img;
    else return `${BASE_URL}/assets/imgs/product-adidas-1.jpg`;
  }

  // Đảm bảo url chắc chắn là string
  if (typeof url !== 'string') return `${BASE_URL}/assets/imgs/product-adidas-1.jpg`;

  if (url.startsWith('http://') || url.startsWith('https://')) return url;

  let cleanUrl = url.startsWith('/') ? url : `/${url}`;

  // Chuẩn hóa /assets/img/ (thiếu s) thành /assets/imgs/ đúng với cấu trúc lưu trữ của Backend
  if (cleanUrl.startsWith('/assets/img/')) {
    cleanUrl = cleanUrl.replace('/assets/img/', '/assets/imgs/');
  }

  return `${BASE_URL}${cleanUrl}`;
};

/**
 * Chuyển đổi đường dẫn ảnh về dạng TƯƠNG ĐỐI (/uploads/... hoặc /assets/...) trước khi lưu vào CSDL MySQL
 */
export const toRelativePath = (url) => {
  if (!url || typeof url !== 'string') return '';
  let clean = url.trim();
  if (clean.startsWith('http://localhost:3000')) {
    clean = clean.replace('http://localhost:3000', '');
  } else if (clean.startsWith('http://127.0.0.1:3000')) {
    clean = clean.replace('http://127.0.0.1:3000', '');
  } else if (clean.startsWith('http://') || clean.startsWith('https://')) {
    const match = clean.match(/^https?:\/\/[^\/]+(\/(?:uploads|assets)\/.*)/i);
    if (match && match[1]) {
      clean = match[1];
    }
  }
  return clean;
};

/**
 * Format toàn bộ thẻ <img> trong chuỗi HTML (WYSIWYG content) để hiển thị mượt mà trên trình duyệt
 * Tự động chuyển src="/uploads/..." hoặc src="/assets/..." thành src="http://localhost:3000/uploads/..."
 */
export const formatHtmlContent = (html) => {
  if (!html || typeof html !== 'string') return html || '';
  return html.replace(/src=["'](\/(?:uploads|assets)\/[^"']*)["']/gi, `src="${BASE_URL}$1"`);
};

/**
 * Format giá tiền sang dạng VNĐ hiển thị (Ví dụ: 3.870.750đ)
 */
export const formatCurrencyVND = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '0đ';
  const num = Math.round(Number(amount)) || 0;
  return `${num.toLocaleString('vi-VN')}đ`;
};

/**
 * Helper tự động nhận diện Thương hiệu chuẩn
 */
export const detectBrand = (p) => {
  if (p.category?.name) return p.category.name;
  const nameLower = (p.name || p.title || '').toLowerCase();
  const slugLower = (p.slug || '').toLowerCase();
  if (nameLower.includes('nike') || slugLower.includes('nike')) return 'Nike';
  if (nameLower.includes('puma') || slugLower.includes('puma')) return 'Puma';
  if (nameLower.includes('asics') || slugLower.includes('asics') || nameLower.includes('gel-ds')) return 'Asics';
  if (nameLower.includes('adidas') || slugLower.includes('adidas') || nameLower.includes('coursecup') || nameLower.includes('harden')) return 'Adidas';
  return p.brand || 'Khác';
};

/**
 * Chuẩn hóa đối tượng Sản phẩm từ Backend API về cho Frontend UI sử dụng đồng nhất
 */
export const formatProductData = (p) => {
  if (!p) return null;

  const img = formatImageUrl(p.image || p.img);
  const hoverImg = formatImageUrl(p.hoverImage || p.hoverImg || p.image || p.img);

  const parsePriceNum = (val) => {
    if (val === undefined || val === null) return 0;
    if (typeof val === 'number') return val;
    const cleaned = String(val).replace(/,/g, '');
    const num = Math.round(parseFloat(cleaned));
    return isNaN(num) ? 0 : num;
  };

  const rawPrice = parsePriceNum(p.price);
  const rawSalePrice = p.salePrice ? parsePriceNum(p.salePrice) : null;

  const hasSale = Boolean(rawSalePrice && rawSalePrice > 0 && rawSalePrice < rawPrice);

  const priceDisplay = formatCurrencyVND(hasSale ? rawSalePrice : rawPrice);
  const originalPriceDisplay = hasSale ? formatCurrencyVND(rawPrice) : null;

  const brandName = detectBrand(p);

  return {
    ...p,
    id: p.id,
    categoryId: p.categoryId || p.category_id || p.category?.id || null,
    category_id: p.categoryId || p.category_id || p.category?.id || null,
    title: p.name || p.title || 'Sản phẩm',
    name: p.name || p.title || 'Sản phẩm',
    desc: p.description || p.desc || '',
    description: p.description || p.desc || '',
    details: p.details || p.description || '',
    img,
    image: img,
    hoverImg,
    hoverImage: hoverImg,
    price: priceDisplay,
    originalPrice: originalPriceDisplay,
    hasSale,
    numericPrice: hasSale ? rawSalePrice : rawPrice,
    rawPrice,
    salePrice: rawSalePrice,
    is_new: p.isNew !== undefined ? Boolean(p.isNew) : Boolean(p.is_new),
    is_sale: hasSale || (p.isSale !== undefined ? Boolean(p.isSale) : Boolean(p.is_sale)),
    is_best: p.isBest !== undefined ? Boolean(p.isBest) : Boolean(p.is_best),
    brand: brandName,
    gender: (p.gender || 'unisex').toLowerCase(),
    sizes: p.variants && p.variants.length > 0
      ? p.variants.map((v) => v.size).filter(Boolean)
      : ['38', '39', '40', '41', '42'],
  };
};
