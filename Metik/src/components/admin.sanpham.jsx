import React, { useState, useEffect, useCallback, useRef } from 'react';
import { usePuck } from '@puckeditor/core';
import { useInlineImage } from './admin.useInlineImage';
import { getTextStyle, getBackgroundStyle } from './admin.styleUtils';

const AdminSanPhamMetik = ({
    title,
    titleConfig,
    products,
    background,
    id,
    puck
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else setItemsPerPage(4);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Đảm bảo currentIndex không bị quá giới hạn khi resize
    const maxIndex = Math.max(0, products.length - itemsPerPage);
    useEffect(() => {
        if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
    }, [maxIndex, currentIndex]);

    const nextSlide = useCallback(() => {
        setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    }, [maxIndex]);

    const prevSlide = useCallback(() => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    }, []);

    // Inline Edit Logic
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
    } catch (e) {}

    const updateProductData = useCallback((indexStr, field, value) => {
        if (!dispatch || !appState || !id) return;
        const pIndex = parseInt(indexStr, 10);
        
        const newContent = appState.data.content.map(item => {
            if (item.props?.id === id) {
                const newProducts = [...(item.props.products || [])];
                if (newProducts[pIndex]) {
                    newProducts[pIndex] = { ...newProducts[pIndex], [field]: value };
                }
                return { ...item, props: { ...item.props, products: newProducts } };
            }
            return item;
        });

        dispatch({ type: "set", state: { data: { ...appState.data, content: newContent } } });
        
        // Remount UI hack for Image Modal (to update editor sidebar).
        // Bỏ qua nếu là sửa title (text) để tránh mất focus của contentEditable
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
        onUpdate: (editId, newUrl) => updateProductData(editId, 'imageUrl', newUrl)
    });

    return (
        <section className="py-12 md:py-16" style={getBackgroundStyle(background)} ref={containerRef}>
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
                <div className="mb-8 md:mb-12 relative inline-block">
                    <h2 
                        className="text-2xl md:text-3xl font-black text-[#2e7d32] uppercase tracking-wide relative z-10"
                        style={getTextStyle(titleConfig)}
                    >
                        {title}
                    </h2>
                    {/* Đường gạch dưới màu vàng như thiết kế */}
                    <div className="absolute bottom-1 left-0 w-[110%] h-3 z-0 -ml-2" style={{ backgroundColor: titleConfig?.bgColor || '#fbc02d' }}></div>
                </div>

                {/* Slider Sản phẩm */}
                <div className="relative w-full">
                    <div className="overflow-hidden px-2 py-4 -mx-2">
                        <div 
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
                        >
                            {(products || []).map((p, i) => (
                                <div key={i} className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-3">
                                    <div className="bg-white shadow-[0_1px_3px_-2px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_3px_6px_-4px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)] transition-all duration-300 flex flex-col h-full group">
                                        
                                        {/* Image Box */}
                                        <div 
                                            className="w-full aspect-square relative cursor-pointer overflow-hidden bg-white"
                                            {...getEditProps(i)}
                                        >
                                            <img 
                                                src={p.imageUrl || 'https://via.placeholder.com/400x400?text=Sản+phẩm'} 
                                                alt={p.title || `Sản phẩm ${i + 1}`} 
                                                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isEditing ? 'pointer-events-none' : ''}`}
                                                draggable={false}
                                            />
                                        </div>

                                        {/* Title Box */}
                                        <div className="p-4 md:p-6 text-center border-t border-gray-100/60 bg-white">
                                            <h3 
                                                className="text-base md:text-lg font-bold text-[#f97316]"
                                                style={getTextStyle(p.titleConfig)}
                                            >
                                                {p.title || 'Tên sản phẩm'}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Điều hướng (Chỉ hiện khi số SP > số SP trên 1 trang) */}
                    {products.length > itemsPerPage && (
                        <>
                            <button 
                                onClick={prevSlide}
                                disabled={currentIndex === 0}
                                className={`absolute left-0 top-[40%] -translate-y-1/2 -translate-x-3 md:-translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-md flex items-center justify-center text-orange-500 z-10 transition-all ${currentIndex === 0 ? 'opacity-0 invisible' : 'opacity-100 hover:bg-orange-500 hover:text-white cursor-pointer'}`}
                                aria-label="Previous"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            
                            <button 
                                onClick={nextSlide}
                                disabled={currentIndex === maxIndex}
                                className={`absolute right-0 top-[40%] -translate-y-1/2 translate-x-3 md:translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-md flex items-center justify-center text-orange-500 z-10 transition-all ${currentIndex === maxIndex ? 'opacity-0 invisible' : 'opacity-100 hover:bg-orange-500 hover:text-white cursor-pointer'}`}
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

export default AdminSanPhamMetik;
