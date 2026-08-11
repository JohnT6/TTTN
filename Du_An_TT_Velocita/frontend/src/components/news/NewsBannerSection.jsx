import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { formatImageUrl } from '../../helpers/helper';
import NewsBannerSkeleton from '../skeletons/NewsBannerSkeleton';

const NewsBannerSection = ({ banners = [], loading = false }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Chuẩn hóa danh sách Banners từ props (chấp nhận mảng hoặc object đơn lẻ)
  const bannerList = useMemo(() => {
    let list = [];
    if (Array.isArray(banners)) {
      list = banners;
    } else if (banners && typeof banners === 'object') {
      list = [banners];
    }

    return list.filter((b) => Boolean(b && (b.image || b.img || b.videoUrl || b.video_url)));
  }, [banners]);

  const totalSlides = bannerList.length;

  // Next / Prev slide handlers
  const handleNextSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrevSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  // Tự động chuyển Slide mỗi 6 giây nếu có từ 2 Banner trở lên
  useEffect(() => {
    if (totalSlides <= 1 || !isPlaying) return;

    const timer = setInterval(() => {
      handleNextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [totalSlides, isPlaying, handleNextSlide]);

  // Reset activeSlide về 0 nếu danh sách thay đổi
  useEffect(() => {
    setActiveSlide(0);
  }, [totalSlides]);

  // NẾU ĐANG LOADING: Hiển thị Skeleton Banner
  if (loading) {
    return <NewsBannerSkeleton />;
  }

  // NẾU KHÔNG CÓ BANNER NÀO TRONG DB: Ẩn phần Banner hoàn toàn
  if (totalSlides === 0) {
    return null;
  }

  return (
    <div className="max-w-[1360px] mx-auto px-6 mb-16 select-none">
      <div className="w-full relative overflow-hidden bg-[#ebedee] rounded-2xl group shadow-xs min-h-[300px] md:min-h-[420px]">
        {/* Slides list */}
        {bannerList.map((banner, index) => {
          const isCurrent = index === activeSlide;
          const imgSrc = banner.image || banner.img ? formatImageUrl(banner.image || banner.img) : '';
          const videoSrc = banner.videoUrl || banner.video_url ? formatImageUrl(banner.videoUrl || banner.video_url) : '';
          const mediaType = (banner.mediaType || banner.media_type || (videoSrc ? 'VIDEO' : 'IMAGE')).toUpperCase();

          const title = banner.title || banner.heading || '';
          const subtitle = banner.subtitle || banner.desc || '';
          const buttonText = banner.buttonText || banner.button_text || '';
          const link = banner.link || '';
          const hasContent = Boolean(title || subtitle || (buttonText && link));

          const showVideo = (mediaType === 'VIDEO' || mediaType === 'BOTH') && videoSrc;

          return (
            <div
              key={banner.id || index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Media Background (Image hoặc Video MP4) */}
              {showVideo ? (
                <video
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover block"
                />
              ) : (
                <img
                  src={imgSrc}
                  alt={title || 'News Hero Banner'}
                  className="w-full h-full object-cover block transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                />
              )}

              {/* Lớp Overlay Thông Tin (Tiêu đề, Mô tả, Nút bấm) */}
              {hasContent && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-6 space-y-4 z-20">
                  {title && (
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight [text-shadow:0px_2px_10px_rgba(0,0,0,0.5)]">
                      {title}
                    </h2>
                  )}

                  {subtitle && (
                    <p className="text-sm md:text-base font-medium text-white/90 max-w-2xl leading-relaxed [text-shadow:0px_1px_5px_rgba(0,0,0,0.5)]">
                      {subtitle}
                    </p>
                  )}

                  {buttonText && link && (
                    <Link
                      to={link}
                      className="mt-2 inline-block px-7 py-3 bg-white text-black hover:bg-black hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-full shadow-lg active:scale-95 cursor-pointer"
                    >
                      {buttonText}
                    </Link>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* NÚT CHUYỂN SLIDE (CHỈ HIỂN THỊ KHI LENGTH > 1 - ĐỒNG BỘ 100% VỚI TRANG CHỦ) */}
        {totalSlides > 1 && (
          <div className="controls absolute bottom-5 right-5 flex gap-2.5 z-20">
            {/* Nút chuyển slide trước */}
            <button
              type="button"
              onClick={handlePrevSlide}
              className="flex justify-center items-center w-9 h-9 bg-[rgba(229,229,229,0.5)] text-black cursor-pointer rounded-full hover:bg-[rgba(229,229,229,0.8)]"
              title="Slide trước"
            >
              &#10094;
            </button>

            {/* Nút chuyển slide sau */}
            <button
              type="button"
              onClick={handleNextSlide}
              className="flex justify-center items-center w-9 h-9 bg-[rgba(229,229,229,0.5)] text-black cursor-pointer rounded-full hover:bg-[rgba(229,229,229,0.8)]"
              title="Slide kế tiếp"
            >
              &#10095;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsBannerSection;
