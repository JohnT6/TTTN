import React, { useState, useEffect, useCallback } from 'react';
import { usePuck } from '@puckeditor/core';
import { useInlineImage } from './admin.useInlineImage';

const AdminBannerMetik = ({
    banners = [],
    autoplay = true,
    autoplaySpeed = 5000,
    id,
    puck
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
    }, [banners.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
    }, [banners.length]);

    useEffect(() => {
        let interval;
        // Chỉ chạy autoplay nếu có nhiều hơn 1 ảnh và không đang hover chuột vào
        if (autoplay && banners.length > 1 && !isHovered) {
            interval = setInterval(() => {
                nextSlide();
            }, autoplaySpeed);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [autoplay, autoplaySpeed, nextSlide, banners.length, isHovered]);

    // Lấy dispatch và appState từ Puck để cập nhật dữ liệu inline
    let dispatch = null;
    let appState = null;
    let isEditing = false;
    try {
        const puckContext = usePuck();
        if (puckContext && puckContext.dispatch) {
            dispatch = puckContext.dispatch;
            appState = puckContext.appState;
            isEditing = true;
        }
    } catch (e) {
        // Không có Puck context (đang ở mode Render/Preview)
    }

    // Hàm cập nhật URL ảnh trực tiếp vào state của Puck
    const updateBannerUrl = useCallback((bannerIndexStr, newUrl) => {
        if (!dispatch || !appState || !id) return;
        
        const bannerIndex = parseInt(bannerIndexStr, 10);

        const newContent = appState.data.content.map(item => {
            if (item.props?.id === id) {
                const newBanners = [...(item.props.banners || [])];
                if (newBanners[bannerIndex]) {
                    newBanners[bannerIndex] = { ...newBanners[bannerIndex], imageUrl: newUrl };
                }
                return { ...item, props: { ...item.props, banners: newBanners } };
            }
            return item;
        });

        dispatch({
            type: "set",
            state: {
                data: {
                    ...appState.data,
                    content: newContent
                }
            }
        });

        // UI remount trick
        if (appState.ui.itemSelector) {
            const currentSelector = { ...appState.ui.itemSelector };
            dispatch({ type: "setUi", ui: { itemSelector: null } });
            setTimeout(() => {
                dispatch({ type: "setUi", ui: { itemSelector: currentSelector } });
            }, 100);
        }
    }, [dispatch, appState, id]);

    // Khởi tạo tính năng inline image
    const { containerRef, getEditProps } = useInlineImage({
        isEditing,
        onUpdate: updateBannerUrl
    });

    if (!banners || banners.length === 0) {
        return (
            <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center text-gray-500">
                Chưa có ảnh banner nào.
            </div>
        );
    }

    return (
        <div 
            className="relative w-full overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={containerRef}
        >
            {isEditing && (
                <style dangerouslySetInnerHTML={{
                    __html: `
                    [data-inline-image-id] {
                        pointer-events: auto !important;
                    }
                `}} />
            )}

            {/* Banner Slider */}
            <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {banners.map((banner, index) => (
                    <div 
                        key={index} 
                        className="w-full flex-shrink-0 relative"
                        {...getEditProps(index)}
                    >
                        <img 
                            src={banner.imageUrl || 'https://via.placeholder.com/1920x600?text=Banner'} 
                            alt={banner.alt || `Banner ${index + 1}`} 
                            className={`w-full h-[250px] md:h-[350px] object-cover object-center ${isEditing ? 'pointer-events-none' : ''}`}
                            draggable={false}
                        />
                        {/* Bỏ title/subtitle nếu người dùng không cần, nhưng cứ để dự phòng */}
                        {(banner.title || banner.subtitle) && (
                            <div className={`absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/10 p-4 ${isEditing ? 'pointer-events-none' : ''}`}>
                                {banner.title && <h2 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-xl">{banner.title}</h2>}
                                {banner.subtitle && <p className="text-xl md:text-2xl font-bold drop-shadow-lg">{banner.subtitle}</p>}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Controls (Chỉ hiển thị nếu có từ 2 ảnh trở lên) */}
            {banners.length > 1 && (
                <>
                    {/* Nút Previous (Mũi tên trái: vòng tròn trắng trong suốt viền trắng) */}
                    <button 
                        onClick={prevSlide}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border-2 border-white/80 bg-white/20 hover:bg-orange-500 hover:border-orange-500 text-white cursor-pointer rounded-full flex items-center justify-center transition-all duration-300 shadow-sm backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100"
                        aria-label="Previous Banner"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Nút Next (Mũi tên phải: vòng tròn cam khi hover) */}
                    <button 
                        onClick={nextSlide}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border-2 border-white/80 bg-white/20 hover:bg-orange-500 hover:border-orange-500 text-white cursor-pointer rounded-full flex items-center justify-center transition-all duration-300 shadow-sm backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100"
                        aria-label="Next Banner"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6 pl-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 shadow-sm ${
                                    index === currentIndex 
                                        ? 'bg-white scale-125' 
                                        : 'bg-white/50 hover:bg-white/80'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminBannerMetik;
