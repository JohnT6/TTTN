import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToCartAsync } from '../../store/cartSlice';
import ProductCard from '../../components/common/ProductCard';
import ProductDetailSkeleton from '../../components/skeletons/ProductDetailSkeleton';
import ReviewModal from '../../components/common/ReviewModal';
import { getProductByIdApi, toggleFavoriteAPI, checkFavoriteStatusAPI } from '../../services/api';
import { formatProductData, formatImageUrl } from '../../helpers/helper';
import { getCookie } from '../../helpers/cookie';

// Icon Mũi tên xuống SVG FontAwesome
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    className="w-4 h-4 fill-current transition-transform duration-300"
  >
    <path d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z" />
  </svg>
);

// Icon Trái tim Chưa Nhấn (Outline)
const HeartOutlineIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    className="w-5 h-5 fill-current"
  >
    <path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z" />
  </svg>
);

// Icon Trái tim Đã Nhấn (Solid)
const HeartSolidIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    className="w-5 h-5 fill-current"
  >
    <path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z" />
  </svg>
);

// Helper vẽ ngôi sao đánh giá
const StarRating = ({ rating = 5 }) => {
  const stars = [];
  const rounded = Math.round(rating);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rounded ? 'text-black' : 'text-gray-300'}>
        ★
      </span>
    );
  }
  return <div className="inline-flex gap-0.5 text-sm tracking-widest">{stars}</div>;
};

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const authUser = useSelector((state) => state.auth?.user || state.user?.user);
  const storeProducts = useSelector((state) => state.products?.items || []);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('40');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // State vị trí hover zoom ảnh
  const [zoomStyle, setZoomStyle] = useState({});
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  // Accordion state bên cột trái
  const [openAccordions, setOpenAccordions] = useState({
    reviews: false,
    description: true,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Lấy ID tài khoản người dùng từ Cookie
  const getUserId = useCallback(() => {
    if (authUser?.id) return authUser.id;
    const stored = getCookie('user_info');
    if (stored && typeof stored === 'object') return stored.id || null;
    return null;
  }, [authUser]);

  // Nạp thông tin sản phẩm thực từ Backend API dựa trên param ID / Slug từ URL
  const loadDetail = useCallback(async () => {
    setLoading(true);
    try {
      const targetIdOrSlug = id || (storeProducts.length > 0 ? (storeProducts[0].slug || storeProducts[0].id) : null);

      if (!targetIdOrSlug) {
        setProduct(null);
        setLoading(false);
        return;
      }

      let res = null;
      try {
        res = await getProductByIdApi(targetIdOrSlug);
      } catch {
        const found = storeProducts.find((p) => p.id === targetIdOrSlug || p.slug === targetIdOrSlug);
        if (found) {
          res = { success: true, data: found };
        }
      }

      if (res && res.success && res.data) {
        const formatted = formatProductData(res.data);
        setProduct(formatted);

        // Kiểm tra xem user hiện tại đã thích sản phẩm này chưa
        const userId = getUserId();
        if (userId && formatted?.id) {
          try {
            const favRes = await checkFavoriteStatusAPI(formatted.id, userId);
            if (favRes && favRes.data) {
              setIsFavorite(Boolean(favRes.data.isFavorite));
            }
          } catch (err) {
            // Ignore
          }
        }
      } else {
        setProduct(null);
      }
    } catch (err) {
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id, storeProducts, getUserId]);

  useEffect(() => {
    loadDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [loadDetail]);

  // Kiểm tra đăng nhập từ Cookie
  const checkAuth = () => {
    const token = getCookie('access_token') || getCookie('token');
    return Boolean(token);
  };

  // Nút mở Modal Viết Đánh Giá (Bắt buộc Đăng nhập)
  const handleOpenReviewModal = () => {
    if (!checkAuth()) {
      navigate('/sign-in');
      return;
    }
    setIsReviewModalOpen(true);
  };

  // Nút Trái tim Yêu thích thực tế (Bắt buộc Đăng nhập + Gọi API Toggle)
  const handleToggleFavorite = async () => {
    if (!checkAuth()) {
      navigate('/sign-in');
      return;
    }

    if (!product) return;

    const userId = getUserId();
    const nextFavoriteState = !isFavorite;
    setIsFavorite(nextFavoriteState); // Phản hồi UI tức thì

    try {
      const res = await toggleFavoriteAPI(product.id, userId);
      if (res && res.data) {
        setIsFavorite(Boolean(res.data.isFavorite));
      }
    } catch (err) {
      setIsFavorite(!nextFavoriteState); // Revert lại nếu có lỗi API
    }
  };

  // Callback sau khi viết đánh giá thành công
  const handleReviewSuccess = () => {
    loadDetail();
  };

  // Danh sách hình ảnh chi tiết của sản phẩm - Kết hợp Ảnh chính, Ảnh Hover và bảng product_images
  const productImages = useMemo(() => {
    if (!product) return [];
    const list = [];

    // Bổ sung ảnh đại diện chính (Product.image)
    if (product.image) {
      const formattedMain = formatImageUrl(product.image);
      if (formattedMain && !list.includes(formattedMain)) {
        list.push(formattedMain);
      }
    }

    // Bổ sung ảnh hover (Product.hoverImage)
    if (product.hoverImage) {
      const formattedHover = formatImageUrl(product.hoverImage);
      if (formattedHover && !list.includes(formattedHover)) {
        list.push(formattedHover);
      }
    }

    // Lấy thêm danh sách ảnh chi tiết từ bảng product_images DB
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach((imgObj) => {
        const rawUrl = typeof imgObj === 'string' ? imgObj : (imgObj.imageUrl || imgObj.image_url || imgObj.image);
        if (rawUrl) {
          const formatted = formatImageUrl(rawUrl);
          if (formatted && !list.includes(formatted)) {
            list.push(formatted);
          }
        }
      });
    }

    return list;
  }, [product]);

  // Biến thể màu sắc (Variants) - Lấy từ DB thật 100% (của cùng styleCode)
  const colorVariants = useMemo(() => {
    if (!product) return [];

    if (product.colorVariants && Array.isArray(product.colorVariants) && product.colorVariants.length > 0) {
      return product.colorVariants.map((c) => ({
        id: c.id,
        name: c.colorName || c.color_name || c.name || 'Màu tiêu chuẩn',
        slug: c.slug,
        img: formatImageUrl(c.image),
        isCurrent: String(c.id) === String(product.id) || c.slug === product.slug,
      }));
    }

    if (product.styleCode && storeProducts.length > 0) {
      const sameStyle = storeProducts.filter((p) => (p.styleCode || p.style_code) === product.styleCode);
      if (sameStyle.length > 0) {
        return sameStyle.map((p) => ({
          id: p.id,
          name: p.colorName || p.color_name || p.name,
          slug: p.slug,
          img: formatImageUrl(p.image),
          isCurrent: String(p.id) === String(product.id) || p.slug === product.slug,
        }));
      }
    }

    return [
      {
        id: product.id,
        name: product.colorName || product.color_name || 'Tiêu chuẩn',
        slug: product.slug,
        img: productImages[0] || formatImageUrl(product.image),
        isCurrent: true,
      },
    ];
  }, [product, storeProducts, productImages]);

  // Đồng bộ selectedColorIndex khi colorVariants thay đổi
  useEffect(() => {
    if (colorVariants.length > 0) {
      const curIdx = colorVariants.findIndex((c) => c.isCurrent);
      setSelectedColorIndex(curIdx >= 0 ? curIdx : 0);
    }
  }, [colorVariants]);

  // Tính toán điểm sao trung bình & mảng đánh giá từ DB
  const reviewsData = useMemo(() => {
    const reviewsList = product?.reviews || [];
    const totalReviews = reviewsList.length;

    if (totalReviews === 0) {
      return {
        averageRating: '0.0',
        totalReviews: 0,
        hasReviews: false,
        reviewsList: [],
        ratingCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        ratingPercentages: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };
    }

    const sumRating = reviewsList.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
    // Điểm sao trung bình dạng số thập phân lẻ thực tế (VD: 4.1, 4.3, 4.7, 4.8)
    const averageRating = (sumRating / totalReviews).toFixed(1);

    // Thống kê số lượng & phần trăm từng mức sao (5 sao -> 1 sao)
    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviewsList.forEach((r) => {
      const star = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5)));
      ratingCounts[star] = (ratingCounts[star] || 0) + 1;
    });

    const ratingPercentages = {
      5: Math.round(((ratingCounts[5] || 0) / totalReviews) * 100),
      4: Math.round(((ratingCounts[4] || 0) / totalReviews) * 100),
      3: Math.round(((ratingCounts[3] || 0) / totalReviews) * 100),
      2: Math.round(((ratingCounts[2] || 0) / totalReviews) * 100),
      1: Math.round(((ratingCounts[1] || 0) / totalReviews) * 100),
    };

    return {
      averageRating,
      totalReviews,
      hasReviews: true,
      reviewsList,
      ratingCounts,
      ratingPercentages,
    };
  }, [product]);

  // Danh sách kích cỡ (Sizes) - Lấy từ variants thật trong DB
  const sizes = useMemo(() => {
    const variants = product?.variants || [];
    if (variants.length === 0) return [];

    const sizeList = [...new Set(variants.map((v) => String(v.size)).filter(Boolean))];
    return sizeList.sort((a, b) => parseFloat(a) - parseFloat(b));
  }, [product]);

  // Map tồn kho từng size dựa vào variants thật trong DB
  const sizeStockMap = useMemo(() => {
    const map = {};
    if (!product) return map;

    const variants = product.variants || [];
    variants.forEach((v) => {
      if (v.size) {
        const s = String(v.size);
        const stockNum = Number(v.stock);
        map[s] = (map[s] || 0) + (isNaN(stockNum) ? 0 : stockNum);
      }
    });
    return map;
  }, [product]);

  // Auto-select size đầu tiên còn hàng khi đổi color
  useEffect(() => {
    if (sizes.length > 0) {
      // Tìm size đầu tiên còn hàng
      const firstAvailable = sizes.find((s) => {
        const stock = sizeStockMap[String(s)];
        return stock === undefined || stock > 0;
      });
      setSelectedSize(firstAvailable || sizes[0]);
    }
  }, [selectedColorIndex, sizes, sizeStockMap]);

  // Lọc danh sách Sản phẩm Liên Quan: CHỈ LẤY CÁC SẢN PHẨM CHÍNH XÁC CÙNG category_id TRONG DB
  const relatedProducts = useMemo(() => {
    if (!product) return [];

    const currentCatId = product.categoryId || product.category_id || product.category?.id;

    const sameCategoryProducts = storeProducts.filter((p) => {
      const pCatId = p.categoryId || p.category_id || p.category?.id;
      const isDifferentProduct = String(p.id) !== String(product.id) && p.slug !== product.slug;
      return isDifferentProduct && currentCatId && String(pCatId) === String(currentCatId);
    });

    return sameCategoryProducts.slice(0, 4);
  }, [product, storeProducts]);

  // Xử lý hiệu ứng Zoom ảnh theo tọa độ con trỏ chuột
  const handleMouseMove = (e, index) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setHoveredImageIndex(index);
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.8)',
    });
  };

  const handleMouseLeave = () => {
    setHoveredImageIndex(null);
    setZoomStyle({
      transformOrigin: 'center center',
      transform: 'scale(1)',
    });
  };

  const [isAdded, setIsAdded] = useState(false);

  // Xử lý Thêm Sản Phẩm Vào Giỏ Hàng Redux Store & Backend API
  const handleAddToCart = () => {
    if (!product) return;
    const selectedColorName = colorVariants[selectedColorIndex]?.name || '';
    const productToAdd = {
      id: product.id,
      title: product.title || product.name,
      name: product.title || product.name,
      desc: selectedColorName || product.desc,
      price: product.price,
      img: productImages[0],
    };

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);

    // Phản hồi local lập tức + Gửi Backend API
    dispatch(addToCart({ product: productToAdd, size: selectedSize, color: selectedColorName, quantity: 1 }));
    dispatch(addToCartAsync({
      productId: product.id,
      size: selectedSize,
      color: selectedColorName,
      quantity: 1,
    }));
  };

  // NẾU ĐANG LOADING: Hiển thị ProductDetailSkeleton từ thư mục skeletons mới
  if (loading) {
    return <ProductDetailSkeleton />;
  }

  // NẾU KHÔNG CÓ SẢN PHẨM: Hiển thị màn hình 404 sạch sẽ
  if (!product) {
    return (
      <main className="max-w-[1440px] w-full mx-auto px-5 py-32 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Sản phẩm không tồn tại hoặc đã bị ẩn</h2>
        <p className="text-gray-500">Vui lòng quay lại danh mục sản phẩm để khám phá các mẫu giày thể thao mới nhất.</p>
        <Link to="/product-catalog" className="inline-block px-6 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors">
          Khám phá sản phẩm
        </Link>
      </main>
    );
  }

  return (
    <main className="product-page max-w-[1440px] w-full mx-auto px-5 pb-[100px] mt-[100px]">

      {/* Top Header Navigation */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 font-medium">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"
        >
          <span>↵</span>
          <span className="underline font-bold">Trở lại</span>
        </button>
        <span className="text-gray-300">/</span>
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-black transition-colors">Trang Chủ</Link>
          <span>/</span>
          <Link to={`/product-catalog?category=${encodeURIComponent(product.brand)}`} className="hover:text-black transition-colors">
            {product.brand}
          </Link>
          <span>/</span>
          <span className="font-bold text-black">{product.title}</span>
        </div>
      </div>

      {/* Main Container 2 Cột */}
      <div className="product-inner">
        <div className="grid grid-cols-12 gap-8 items-start max-lg:flex max-lg:flex-col">

          {/* ==================== CỘT BÊN TRÁI ==================== */}
          <div className="col-span-7 w-full flex flex-col gap-8">

            {/* Lưới Hình Ảnh Sản Phẩm Chi Tiết */}
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3">
              {productImages.map((imgSrc, idx) => (
                <div
                  key={idx}
                  onMouseMove={(e) => handleMouseMove(e, idx)}
                  onMouseLeave={handleMouseLeave}
                  className="bg-[#ebedee] rounded-none aspect-square overflow-hidden relative select-none"
                  style={{
                    cursor: `url("/assets/icons/cursor-pdp-fullscreen-zoom.svg") 16 16, zoom-in`,
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={`Chi tiết ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-200 ease-out pointer-events-none"
                    style={hoveredImageIndex === idx ? zoomStyle : { transform: 'scale(1)', transformOrigin: 'center center' }}
                  />
                </div>
              ))}
            </div>

            {/* Khối Accordion Thông Tin & Đánh Giá */}
            <div className="space-y-2 pt-2">

              {/* Accordion: Đánh giá */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleAccordion('reviews')}
                  className="flex justify-between items-center w-full py-3 text-left font-bold text-lg text-gray-900 cursor-pointer group"
                >
                  <span>Đánh giá ({reviewsData.totalReviews})</span>
                  <div className="flex items-center gap-4">
                    {reviewsData.hasReviews ? (
                      <StarRating rating={Number(reviewsData.averageRating)} />
                    ) : (
                      <span className="text-xs text-gray-400 font-normal">Chưa có đánh giá</span>
                    )}
                    <span className={`text-gray-800 transition-transform duration-300 ${openAccordions.reviews ? 'rotate-180' : 'rotate-0'}`}>
                      <ChevronDownIcon />
                    </span>
                  </div>
                </button>

                <div className={`grid transition-all duration-300 ease-in-out ${openAccordions.reviews ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                  <div className="overflow-hidden space-y-6">
                    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-4xl font-extrabold text-gray-900">
                            {reviewsData.hasReviews ? reviewsData.averageRating : '0.0'}
                          </h3>
                          <div className="mt-1">
                            <StarRating rating={reviewsData.hasReviews ? Number(reviewsData.averageRating) : 0} />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Dựa trên {reviewsData.totalReviews} đánh giá từ người mua</p>
                        </div>

                        {/* NÚT VIẾT ĐÁNH GIÁ */}
                        <button
                          onClick={handleOpenReviewModal}
                          className="px-5 py-2.5 border border-black rounded-full font-bold text-xs hover:bg-black hover:text-white transition-colors cursor-pointer active:scale-95 shadow-2xs"
                        >
                          Viết đánh giá
                        </button>
                      </div>

                      {/* Thanh Thống Kê Phần Trăm % Theo Mức Sao (5★ -> 1★) */}
                      {reviewsData.hasReviews && (
                        <div className="space-y-2 py-4 border-y border-gray-200">
                          {[5, 4, 3, 2, 1].map((star) => {
                            const count = reviewsData.ratingCounts[star] || 0;
                            const pct = reviewsData.ratingPercentages[star] || 0;
                            return (
                              <div key={star} className="flex items-center gap-3 text-xs">
                                <span className="w-10 font-bold text-gray-700 flex items-center gap-1">
                                  {star} <span className="text-amber-500">★</span>
                                </span>
                                <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                                <span className="w-16 text-right font-semibold text-gray-500 font-mono">
                                  {pct}% ({count})
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Danh sách nhận xét từ DB kèm Avatar */}
                      {reviewsData.hasReviews ? (
                        <div className="space-y-3 pt-2">
                          {reviewsData.reviewsList.map((rev) => (
                            <div key={rev.id || Math.random()} className="p-4 bg-white rounded-xl space-y-2 border border-gray-100 shadow-2xs">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                                    <img
                                      src={formatImageUrl(rev.user?.avatar || rev.userAvatar || '/assets/imgs/user_default.jpg')}
                                      alt={rev.user?.name || rev.userName || 'Người mua'}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/assets/imgs/user_default.jpg';
                                      }}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className="font-bold text-sm text-gray-900">
                                    {rev.user?.fullName || rev.user?.name || rev.userName || 'Người mua hàng'}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-400 font-mono">
                                  {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString('vi-VN') : 'Gần đây'}
                                </span>
                              </div>
                              <div>
                                <StarRating rating={Number(rev.rating) || 5} />
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed font-medium">{rev.comment || rev.content}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 pt-4 border-t border-gray-200">
                          Hãy là người đầu tiên trải nghiệm và để lại đánh giá cho sản phẩm này!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion: Mô tả sản phẩm (WYSIWYG format từ DB details) */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleAccordion('description')}
                  className="flex justify-between items-center w-full py-3 text-left font-bold text-lg text-gray-900 cursor-pointer"
                >
                  <span>Mô tả sản phẩm</span>
                  <span className={`text-gray-800 transition-transform duration-300 ${openAccordions.description ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDownIcon />
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ease-in-out ${openAccordions.description ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                  <div className="overflow-hidden text-sm text-gray-700 leading-relaxed">
                    {/* Hiển thị WYSIWYG chi tiết sản phẩm từ DB */}
                    {product.details ? (
                      <div
                        className="prose prose-slate max-w-none space-y-3 font-normal"
                        dangerouslySetInnerHTML={{
                          __html: product.details.replace(/src=["'](\/(?:uploads|assets)\/[^"']+)["']/g, (_match, p1) => {
                            return `src="${formatImageUrl(p1)}"`;
                          }),
                        }}
                      />
                    ) : (
                      <p>{product.desc || product.description || 'Chưa có thông tin mô tả chi tiết cho sản phẩm này.'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Khối SẢN PHẨM LIÊN QUAN */}
            {relatedProducts.length > 0 && (
              <div className="pt-10 border-t border-gray-200">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 uppercase tracking-tight">
                    BẠN CÓ THỂ SẼ THÍCH
                  </h2>
                </div>
                <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
                  {relatedProducts.map((p) => (
                    <div key={p.id}>
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>


          {/* ==================== CỘT BÊN PHẢI ==================== */}
          <div className="col-span-5 w-full sticky bottom-5 self-end space-y-6 bg-white p-2">

            {/* Rating & Title */}
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                {reviewsData.hasReviews ? (
                  <>
                    <span className="font-bold text-gray-900">{reviewsData.averageRating}</span>
                    <StarRating rating={Number(reviewsData.averageRating)} />
                    <span className="underline text-gray-500 cursor-pointer">({reviewsData.totalReviews})</span>
                  </>
                ) : (
                  <span className="text-xs text-gray-500">Chưa có đánh giá</span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight leading-none">
                {product.title}
              </h1>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                {product.hasSale && product.originalPrice && (
                  <span className="text-lg font-normal text-gray-400 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2 font-medium">
                {product.hasSale
                  ? 'Sản phẩm đang được áp dụng mức giá ưu đãi đặc biệt.'
                  : 'Sản phẩm này không được hưởng bất kỳ giảm giá khuyến mãi và ưu đãi nào.'}
              </p>
            </div>

            {/* Selected Color List */}
            <div className="space-y-2 pt-2">
              <label className="block text-sm font-bold text-gray-900">
                Màu sắc ({colorVariants.length})
              </label>
              <div className="grid grid-cols-5 gap-2">
                {colorVariants.map((color, idx) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => {
                      setSelectedColorIndex(idx);
                      if (color.slug && color.slug !== product.slug) {
                        navigate(`/product/${color.slug}`);
                      }
                    }}
                    className={`aspect-square rounded-none border overflow-hidden bg-[#ebedee] transition-all p-1 cursor-pointer ${selectedColorIndex === idx ? 'border-2 border-black font-bold' : 'border-gray-200 hover:border-gray-400'
                      }`}
                  >
                    <img src={color.img} alt={color.name} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1 font-normal">
                {colorVariants[selectedColorIndex]?.name}
              </p>
            </div>

            {/* Selected Size List */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-900">Kích cỡ</label>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => {
                  const stockVal = sizeStockMap[String(size)] !== undefined ? sizeStockMap[String(size)] : 10;
                  const isOutOfStock = stockVal <= 0;
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 rounded-none border text-xs font-medium transition-all relative ${
                        isOutOfStock
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-[#ebedee] text-black border-black font-bold cursor-pointer'
                          : 'bg-[#f5f5f5] text-gray-800 border-transparent hover:border-black cursor-pointer'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons: Add to Cart & Heart SVG */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-black hover:bg-gray-800 text-white font-bold text-sm rounded-none transition-all flex items-center justify-between px-6 cursor-pointer active:scale-98"
                >
                  <span>{isAdded ? 'Đã thêm vào giỏ ✓' : 'Thêm vào giỏ hàng'}</span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    role="img"
                    width="24px"
                    height="24px"
                    fill="none"
                    className="text-white stroke-current"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M8.25 8.25V6a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 110 4.5H3.75v8.25a3.75 3.75 0 003.75 3.75h9a3.75 3.75 0 003.75-3.75V8.25H17.5"
                    ></path>
                  </svg>
                </button>

                {/* NÚT THẢ TIM: KẾT NỐI API THƯỜNG TRỰC KẾT NỐI CSDL */}
                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  className={`w-12 h-12 rounded-none border border-gray-300 flex items-center justify-center transition-colors cursor-pointer ${isFavorite ? 'bg-black text-white border-black' : 'bg-white text-black hover:bg-gray-50'
                    }`}
                  aria-label="Thêm vào danh sách yêu thích"
                >
                  {isFavorite ? <HeartSolidIcon /> : <HeartOutlineIcon />}
                </button>
              </div>

              <button
                type="button"
                className="w-full h-11 border border-black hover:bg-gray-50 text-black font-bold text-xs rounded-none transition-all flex items-center justify-between px-4 cursor-pointer"
              >
                <span>Tìm tại cửa hàng</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP MODAL VIẾT ĐÁNH GIÁ */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        product={product}
        onSuccess={handleReviewSuccess}
      />
    </main>
  );
};

export default ProductDetailPage;
