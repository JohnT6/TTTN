import React from 'react';

const ProductDetailSkeleton = () => {
  return (
    <main className="product-page max-w-[1440px] w-full mx-auto px-5 pb-[100px] mt-[100px] select-none animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>

      {/* Main Container 2 Cột */}
      <div className="grid grid-cols-12 gap-8 items-start max-lg:flex max-lg:flex-col">
        {/* Cột trái: Lưới 4 ảnh sản phẩm */}
        <div className="col-span-7 w-full space-y-6">
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3">
            <div className="bg-gray-200 aspect-square w-full rounded-none"></div>
            <div className="bg-gray-200 aspect-square w-full rounded-none"></div>
            <div className="bg-gray-200 aspect-square w-full rounded-none"></div>
            <div className="bg-gray-200 aspect-square w-full rounded-none"></div>
          </div>
          {/* Accordion Skeleton */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-24 bg-gray-100 rounded"></div>
          </div>
        </div>

        {/* Cột phải: Thông tin sản phẩm */}
        <div className="col-span-5 w-full space-y-6 sticky top-24">
          <div className="h-4 bg-gray-200 rounded w-1/5"></div>
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          
          {/* Màu sắc Skeleton */}
          <div className="space-y-2 pt-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="flex gap-2">
              <div className="w-14 h-14 bg-gray-200 rounded"></div>
              <div className="w-14 h-14 bg-gray-200 rounded"></div>
              <div className="w-14 h-14 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Kích cỡ Skeleton */}
          <div className="space-y-2 pt-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>

          {/* Nút bấm Skeleton */}
          <div className="pt-6 space-y-3">
            <div className="h-12 bg-gray-300 rounded w-full"></div>
            <div className="h-11 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailSkeleton;
