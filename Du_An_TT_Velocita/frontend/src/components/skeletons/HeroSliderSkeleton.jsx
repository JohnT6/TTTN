import React from 'react';

const HeroSliderSkeleton = () => {
  return (
    <div className="relative w-full h-[700px] max-[800px]:h-[500px] max-[600px]:h-[400px] bg-slate-200 animate-pulse overflow-hidden select-none">
      {/* Background Shimmer Placeholder Tràn 100% Viền Màn Hình */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 animate-shimmer"></div>

      {/* Đường kẻ chia 2 nửa (Mô phỏng trường hợp BOTH: Nửa ảnh - Nửa video) */}
      <div className="absolute inset-0 flex max-[600px]:flex-col pointer-events-none">
        <div className="w-1/2 h-full border-r border-slate-300/50 max-[600px]:w-full max-[600px]:h-1/2 max-[600px]:border-b max-[600px]:border-r-0"></div>
        <div className="w-1/2 h-full max-[600px]:w-full max-[600px]:h-1/2"></div>
      </div>

      {/* Khối Nội Dung Tiêu Đề Bự & Nút Bấm Ở Chính Giữa Màn Hình */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full max-w-2xl px-5 space-y-5 flex flex-col items-center">
        <div className="h-12 md:h-16 w-3/4 bg-slate-400/80 rounded-2xl"></div>
        <div className="h-4 md:h-5 w-2/3 bg-slate-400/60 rounded-lg"></div>
        <div className="h-4 md:h-5 w-1/2 bg-slate-400/60 rounded-lg"></div>
        <div className="h-12 w-40 bg-slate-500/80 rounded-full mt-4"></div>
      </div>

      {/* Khối Nút Điều Khiển Mũi Tên & Dừng Video Ở Góc Dưới Bên Phải */}
      <div className="absolute bottom-5 right-5 flex gap-2.5 z-20">
        <div className="w-9 h-9 rounded-full bg-slate-400/70"></div>
        <div className="w-9 h-9 rounded-full bg-slate-400/70"></div>
        <div className="w-9 h-9 rounded-full bg-slate-400/70"></div>
      </div>
    </div>
  );
};

export default HeroSliderSkeleton;
