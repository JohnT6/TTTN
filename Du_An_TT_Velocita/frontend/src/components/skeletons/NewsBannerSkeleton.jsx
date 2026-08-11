import React from 'react';

const NewsBannerSkeleton = () => {
  return (
    <div className="max-w-[1360px] mx-auto px-6 mb-16 select-none">
      <div className="w-full h-[360px] md:h-[450px] bg-slate-200 animate-pulse relative overflow-hidden rounded-none shadow-xs">
        {/* Background Shimmer Placeholder nằm gọn trong Container max-w-[1360px] */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 animate-shimmer"></div>
      </div>
    </div>
  );
};

export default NewsBannerSkeleton;
