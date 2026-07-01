import React, { useState, useEffect, useCallback, useRef } from 'react';
import { usePuck } from '@puckeditor/core';
import { useInlineImage } from './admin.useInlineImage';
import { getTextStyle, getBackgroundStyle } from './admin.styleUtils';

// Helper component for Star Rating
const getCustomRadius = (radiusObj) => {
    if (!radiusObj) return '50%';
    if (radiusObj.type === 'custom') {
        return `${radiusObj.tl || '0px'} ${radiusObj.tr || '0px'} ${radiusObj.br || '0px'} ${radiusObj.bl || '0px'}`;
    }
    return radiusObj.all || '50%';
};

const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            );
        } else if (rating >= i - 0.5) {
            stars.push(
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
                </svg>
            );
        } else {
            stars.push(
                <svg key={i} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            );
        }
    }
    return <div className="flex">{stars}</div>;
};

const AdminDanhGiaMetik = ({
    title,
    titleConfig,
    reviews,
    background,
    id
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const itemsPerPage = isMobile ? 1 : 2;
    const maxIndex = Math.max(0, (reviews || []).length - itemsPerPage);

    const nextSlide = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    const prevSlide = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

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
    } catch (e) { }

    const updateReviewData = useCallback((indexStr, field, value) => {
        if (!dispatch || !appState || !id) return;
        const pIndex = parseInt(indexStr, 10);

        const newContent = appState.data.content.map(item => {
            if (item.props?.id === id) {
                const newReviews = [...(item.props.reviews || [])];
                if (newReviews[pIndex]) {
                    newReviews[pIndex] = { ...newReviews[pIndex], [field]: value };
                }
                return { ...item, props: { ...item.props, reviews: newReviews } };
            }
            return item;
        });

        dispatch({ type: "set", state: { data: { ...appState.data, content: newContent } } });

        if (field === 'imageUrl' && appState.ui.itemSelector) {
            const currentSelector = { ...appState.ui.itemSelector };
            dispatch({ type: "setUi", ui: { itemSelector: null } });
            setTimeout(() => {
                dispatch({ type: "setUi", ui: { itemSelector: currentSelector } });
            }, 50);
        }
    }, [dispatch, appState, id]);

    const { containerRef, getEditProps } = useInlineImage({
        isEditing,
        onUpdate: (editId, newUrl) => updateReviewData(editId, 'imageUrl', newUrl)
    });

    return (
        <section className="py-12 md:py-20" style={getBackgroundStyle(background)} ref={containerRef}>
            {isEditing && (
                <style dangerouslySetInnerHTML={{
                    __html: `
                    [data-inline-image-id] {
                        pointer-events: auto !important;
                    }
                `}} />
            )}
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                {/* Tiêu đề */}
                <div className="mb-10 md:mb-16 relative inline-block">
                    <h2
                        className="text-2xl md:text-3xl font-black text-[#2e7d32] uppercase tracking-wide relative z-10"
                        style={getTextStyle(titleConfig)}
                    >
                        {title}
                    </h2>
                    <div className="absolute bottom-1 left-0 w-[110%] h-3 z-0 -ml-2" style={{ backgroundColor: titleConfig?.bgColor || '#fbc02d' }}></div>
                </div>

                {/* Slider Đánh giá */}
                <div className="relative w-full">
                    <div className="overflow-hidden px-2 py-4 -mx-2">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
                        >
                            {(reviews || []).map((r, i) => (
                                <div key={i} className="w-full lg:w-1/2 flex-shrink-0 px-4 md:px-8" {...getEditProps(i)}>
                                    <div className="flex flex-col sm:flex-row items-center  gap-6 w-full">

                                        {/* Avatar (Left) */}
                                        <div
                                            className="w-[123px] h-[123px] flex-shrink-0 relative cursor-pointer overflow-hidden border-4 border-[#fbc02d] shadow-md"
                                            style={{ borderRadius: getCustomRadius(r.imageRadius || { type: 'all', all: '50%' }) }}
                                        >
                                            <img
                                                src={r.imageUrl || 'https://via.placeholder.com/200x200?text=Avatar'}
                                                alt={r.author || 'Avatar'}
                                                className={`w-full h-full object-cover ${isEditing ? 'pointer-events-none' : ''}`}
                                                draggable={false}
                                            />
                                        </div>

                                        {/* Content (Right) */}
                                        <div className="flex flex-col text-center sm:text-left pt-2">
                                            {/* Stars */}
                                            <div className="flex justify-center sm:justify-start">
                                                <StarRating rating={r.rating || 5} />
                                            </div>

                                            {/* Quote */}
                                            <div
                                                className="mt-3 mb-4 text-gray-600 leading-relaxed text-base md:text-lg ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                                                style={getTextStyle(r.quoteConfig)}
                                            >
                                                {r.quote || 'Nội dung đánh giá...'}
                                            </div>

                                            {/* Author */}
                                            <div
                                                className="font-bold text-gray-800 text-sm md:text-base ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                                                style={getTextStyle(r.authorConfig)}
                                            >
                                                {r.author || 'Tên khách hàng'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Điều hướng */}
                    {reviews && reviews.length > itemsPerPage && (
                        <>
                            <button
                                onClick={prevSlide}
                                disabled={currentIndex === 0}
                                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-md flex items-center justify-center text-yellow-500 z-10 transition-all ${currentIndex === 0 ? 'opacity-0 invisible' : 'opacity-100 hover:bg-yellow-500 hover:text-white cursor-pointer'}`}
                                aria-label="Previous"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={nextSlide}
                                disabled={currentIndex === maxIndex}
                                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-md flex items-center justify-center text-yellow-500 z-10 transition-all ${currentIndex === maxIndex ? 'opacity-0 invisible' : 'opacity-100 hover:bg-yellow-500 hover:text-white cursor-pointer'}`}
                                aria-label="Next"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6 pl-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AdminDanhGiaMetik;
