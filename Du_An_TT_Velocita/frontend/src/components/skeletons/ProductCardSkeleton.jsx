import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="product-container flex flex-col h-full pt-[5px] pb-[15px] px-[5px] border border-transparent select-none animate-pulse">
      {/* Khung ảnh vuông Shimmer */}
      <div className="w-full pt-[100%] bg-gray-200 relative overflow-hidden rounded-none">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
      </div>
      {/* Khung Tiêu đề */}
      <div className="h-5 bg-gray-200 rounded-md mt-3 w-4/5"></div>
      {/* Khung Mô tả */}
      <div className="h-4 bg-gray-200 rounded-md mt-2 w-3/5"></div>
      {/* Khung Giá tiền */}
      <div className="h-5 bg-gray-300 rounded-md mt-4 w-2/5"></div>
    </div>
  );
};

export default ProductCardSkeleton;
