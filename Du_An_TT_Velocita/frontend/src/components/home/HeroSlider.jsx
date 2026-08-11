import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getBannersAPI } from '../../services/api';
import { formatImageUrl } from '../../helpers/helper';
import HeroSliderSkeleton from '../skeletons/HeroSliderSkeleton';

const HeroSlider = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);

  const videoRefs = useRef([]);

  // Nạp danh sách Banner từ Backend API
  useEffect(() => {
    let isMounted = true;
    const fetchBanners = async () => {
      setLoading(true);
      try {
        const res = await getBannersAPI();
        if (isMounted) {
          if (res && res.success && res.data && res.data.length > 0) {
            // Lọc Banner hiển thị ở trang chủ (chấp nhận không phân biệt hoa thường hoặc position = null)
            const homeBanners = res.data.filter((b) => {
              if (b.status === false || b.status === 0) return false;
              if (!b.position) return true;
              const pos = String(b.position).toUpperCase();
              return pos === 'HOME_HERO' || pos === 'HOME' || pos === 'HERO';
            });
            setBanners(homeBanners.length > 0 ? homeBanners : res.data);
          } else {
            setBanners([]);
          }
        }
      } catch (err) {
        if (isMounted) setBanners([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBanners();
    return () => {
      isMounted = false;
    };
  }, []);

  // Memoize chuẩn hóa danh sách Slides từ Backend API
  const slidesData = useMemo(() => {
    return banners.map((item) => {
      const type = (item.mediaType || item.media_type || 'BOTH').toUpperCase();
      return {
        id: item.id,
        title: item.title || item.heading || 'Velocità Sport',
        subtitle: item.subtitle || item.desc || '',
        img: item.image || item.img ? formatImageUrl(item.image || item.img) : '',
        video: item.videoUrl || item.video_url || item.video ? formatImageUrl(item.videoUrl || item.video_url || item.video) : null,
        mediaType: type,
        buttonText: item.buttonText || item.button_text || 'Cửa hàng',
        link: item.link || '/product-catalog',
      };
    });
  }, [banners]);

  // Memoize kiểm tra slide hiện tại có chứa Video không
  const currentSlideHasVideo = useMemo(() => {
    const current = slidesData[activeSlide];
    if (!current) return false;
    const isVideoType = current.mediaType === 'BOTH' || current.mediaType === 'VIDEO';
    return Boolean(isVideoType && current.video);
  }, [slidesData, activeSlide]);

  // Callback chuyển sang Slide kế tiếp chuẩn xác bằng useCallback
  const handleNextSlide = useCallback(() => {
    if (slidesData.length === 0) return;
    setActiveSlide((prev) => (prev + 1) % slidesData.length);
    setVideoProgress(0);
  }, [slidesData.length]);

  // Callback chuyển về Slide trước
  const handlePrevSlide = useCallback(() => {
    if (slidesData.length === 0) return;
    setActiveSlide((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
    setVideoProgress(0);
  }, [slidesData.length]);

  // RESET VÀ ĐIỀU KHIỂN VIDEO/TỰ ĐỘNG CHUYỂN SLIDE KHI ACTIVESLIDE THAY ĐỔI
  useEffect(() => {
    setVideoProgress(0);

    videoRefs.current.forEach((videoEl, idx) => {
      if (videoEl) {
        if (idx === activeSlide && isPlaying) {
          videoEl.currentTime = 0;
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
          videoEl.currentTime = 0;
        }
      }
    });

    let timer;
    if (isPlaying && !currentSlideHasVideo && slidesData.length > 0) {
      timer = setTimeout(() => {
        handleNextSlide();
      }, 6000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [activeSlide, isPlaying, currentSlideHasVideo, slidesData.length, handleNextSlide]);

  // Cập nhật tiến trình video theo thời gian phát thực tế
  const handleVideoTimeUpdate = (e, index) => {
    if (index === activeSlide) {
      const video = e.currentTarget;
      if (video && video.duration && !isNaN(video.duration)) {
        setVideoProgress(video.currentTime / video.duration);
      }
    }
  };

  // KHI VIDEO PHÁT HẾT 1 LẦN DUY NHẤT (ENDED) -> CHUYỂN NGAY SANG SLIDE KẾ TIẾP
  const handleVideoEnded = (index) => {
    if (index === activeSlide && isPlaying) {
      setVideoProgress(0);
      handleNextSlide();
    }
  };

  // NẾU ĐANG LOADING: Hiển thị Skeleton Placeholder từ thư mục skeletons
  if (loading) {
    return <HeroSliderSkeleton />;
  }

  // NẾU KHÔNG CÓ BANNER NÀO TRONG DB
  if (slidesData.length === 0) {
    return null;
  }

  return (
    <div className="slider-container w-full h-[700px] overflow-hidden relative max-[800px]:h-[500px] max-[600px]:h-[400px]">
      <div className="slider w-full h-full relative">
        {slidesData.map((slide, index) => {
          const isCurrent = index === activeSlide;
          const showBoth = slide.mediaType === 'BOTH' && slide.img && slide.video;
          const showOnlyVideo = slide.mediaType === 'VIDEO' || (!slide.img && slide.video);
          const showOnlyImage = slide.mediaType === 'IMAGE' || (!slide.video && slide.img);

          return (
            <div
              key={slide.id || index}
              className={`slide flex absolute top-0 left-0 w-full h-full transition-opacity duration-1000 max-[600px]:flex-col ${
                isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* TRƯỜNG HỢP 1: BOTH (Cả Ảnh và Video) */}
              {showBoth && (
                <>
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-1/2 h-full object-cover max-[600px]:w-full max-[600px]:h-1/2"
                  />
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    autoPlay
                    muted
                    playsInline
                    onTimeUpdate={(e) => handleVideoTimeUpdate(e, index)}
                    onEnded={() => handleVideoEnded(index)}
                    className="w-1/2 h-full object-cover max-[600px]:w-full max-[600px]:h-1/2"
                  >
                    <source src={slide.video} type="video/mp4" />
                  </video>
                </>
              )}

              {/* TRƯỜNG HỢP 2: ONLY VIDEO */}
              {showOnlyVideo && (
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  autoPlay
                  muted
                  playsInline
                  onTimeUpdate={(e) => handleVideoTimeUpdate(e, index)}
                  onEnded={() => handleVideoEnded(index)}
                  className="w-full h-full object-cover"
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              )}

              {/* TRƯỜNG HỢP 3: ONLY IMAGE */}
              {showOnlyImage && (
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Lớp thông tin Tiêu đề & Nút bấm */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full px-5">
                <h2 className="text-[54px] font-bold text-white [text-shadow:0px_0px_10px_rgba(0,0,0)] max-[800px]:text-[36px]">
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p className="my-5 text-base text-white [text-shadow:0px_0px_10px_rgba(0,0,0)]">
                    {slide.subtitle}
                  </p>
                )}
                <Link
                  to={slide.link || '/product-catalog'}
                  className="btn slide-text__btn"
                >
                  {slide.buttonText || 'Cửa hàng'}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="controls absolute bottom-5 right-5 flex gap-2.5 z-20">
        
        {/* Nút Play/Pause với vòng tròn tiến trình (CHỈ HIỂN THỊ KHI SLIDE HIỆN TẠI CÓ VIDEO) */}
        {currentSlideHasVideo && (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="relative w-9 h-9 bg-transparent cursor-pointer flex justify-center items-center"
            title={isPlaying ? 'Tạm dừng video' : 'Phát video'}
          >
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 36 36"
            >
              <circle
                cx="18" cy="18" r="16"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <circle
                cx="18" cy="18" r="16"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 16}
                strokeDashoffset={2 * Math.PI * 16 * (1 - videoProgress)}
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>
            <span className="relative z-10 text-white text-xs">
              {isPlaying ? '❚❚' : '▶'}
            </span>
          </button>
        )}

        {/* Nút chuyển slide trước */}
        <button
          onClick={handlePrevSlide}
          className="flex justify-center items-center w-9 h-9 bg-[rgba(229,229,229,0.5)] text-black cursor-pointer rounded-full hover:bg-[rgba(229,229,229,0.8)]"
          title="Slide trước"
        >
          &#10094;
        </button>

        {/* Nút chuyển slide sau */}
        <button
          onClick={handleNextSlide}
          className="flex justify-center items-center w-9 h-9 bg-[rgba(229,229,229,0.5)] text-black cursor-pointer rounded-full hover:bg-[rgba(229,229,229,0.8)]"
          title="Slide kế tiếp"
        >
          &#10095;
        </button>

      </div>
    </div>
  );
};

export default HeroSlider;
