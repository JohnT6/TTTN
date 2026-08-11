import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../common/ProductCard';
import ProductCardSkeleton from '../skeletons/ProductCardSkeleton';

const ProductSection = ({
  title = 'Sản phẩm',
  products = [],
  isNew,
  isSale,
  isBest,
  sectionId = 'sanpham',
}) => {
  const productsScrollRef = useRef(null);
  const { items: storeProducts, loading } = useSelector((state) => state.products || {});

  // Lấy dữ liệu sản phẩm từ props hoặc Redux Store
  const rawProducts = products.length > 0 ? products : storeProducts;

  // Lọc chuẩn CSDL: Chỉ hiển thị sản phẩm có status !== false VÀ status !== 0
  const validProducts = rawProducts.filter((p) => {
    return p.status !== false && p.status !== 0 && p.status !== '0';
  });

  // Lọc sản phẩm thông minh theo loại (Mới, Bán chạy, Giảm giá)
  let displayProducts = validProducts;

  if (isNew !== undefined && isNew) {
    const filtered = validProducts.filter((p) => Boolean(p.is_new ?? p.isNew));
    displayProducts = filtered.length > 0 ? filtered : validProducts.slice(0, 8);
  } else if (isSale !== undefined && isSale) {
    const filtered = validProducts.filter((p) => Boolean(p.is_sale ?? p.isSale ?? p.hasSale));
    displayProducts = filtered.length > 0 ? filtered : validProducts.slice(0, 8);
  } else if (isBest !== undefined && isBest) {
    const filtered = validProducts.filter((p) => Boolean(p.is_best ?? p.isBest));
    displayProducts = filtered.length > 0 ? filtered : validProducts.slice(0, 8);
  }

  const scrollByAmount = (amount) => {
    if (productsScrollRef.current) {
      productsScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  if (!loading && displayProducts.length === 0) {
    return null;
  }

  return (
    <section id={sectionId} className="home-container mt-16 md:mt-24">
      <div className="home-row flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
        <div>
          <h2 className="home__heading text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">
            {title}
          </h2>
          <div className="w-12 h-1 bg-black mt-2 rounded-full"></div>
        </div>

        <div className="home__btn-wrap flex gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount(-350)}
            className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-black hover:text-white flex justify-center items-center text-sm font-bold text-gray-800 cursor-pointer transition-all duration-200 shadow-2xs"
            title="Cuộn sang trái"
          >
            &#10094;
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(350)}
            className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-black hover:text-white flex justify-center items-center text-sm font-bold text-gray-800 cursor-pointer transition-all duration-200 shadow-2xs"
            title="Cuộn sang phải"
          >
            &#10095;
          </button>
        </div>
      </div>

      <div
        ref={productsScrollRef}
        className="product-cate flex flex-nowrap overflow-x-auto scrollbar-none -mx-[15px] pb-4 scroll-smooth"
      >
        {loading && displayProducts.length === 0 ? (
          // Skeleton loading
          [1, 2, 3, 4].map((n) => (
            <div key={n} className="col flex-shrink-0 w-1/4 max-lg:w-1/3 max-md:w-1/2 max-sm:w-full px-[15px]">
              <ProductCardSkeleton />
            </div>
          ))
        ) : (
          displayProducts.map((product) => (
            <div key={product.id} className="col flex-shrink-0 w-1/4 max-lg:w-1/3 max-md:w-1/2 max-sm:w-full px-[15px]">
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProductSection;
