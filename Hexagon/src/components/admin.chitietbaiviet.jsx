import React, { useState, useEffect, useCallback } from 'react';
import { usePuck } from '@puckeditor/core';
import { useInlineImage } from './admin.useInlineImage';

const AdminChiTietBaiVietHexagon = ({
    id,
    sectionId,
    background,
    // Left Column Fields
    articleTitle,
    articleTitleConfig,
    dateIconSvg,
    date,
    timeIconSvg,
    time,
    lang,
    langIconSvg,
    dateConfig,
    contentBeforeImage,
    mainImage,
    mainImageRadius,
    contentAfterImage,
    showContactFooter,
    contactFooterContent,
    // Right Column Fields (Services)
    services,
    reverseLayout
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);

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

    const updateImageUrl = useCallback((editId, newUrl) => {
        if (!dispatch || !appState || !id) return;
        const itemIndex = appState.data.content.findIndex(item => item.props.id === id);
        if (itemIndex > -1) {
            dispatch({
                type: "replace",
                item: {
                    ...appState.data.content[itemIndex],
                    props: {
                        ...appState.data.content[itemIndex].props,
                        [editId]: newUrl
                    }
                },
                index: itemIndex
            });
        }
    }, [dispatch, appState, id]);

    const { containerRef, getEditProps } = useInlineImage({
        isEditing,
        onUpdate: updateImageUrl
    });

    // Auto-slide for the right column carousel
    useEffect(() => {
        if (!services || services.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === services.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [services]);

    const getBackgroundStyle = (bg) => {
        if (!bg) return { backgroundColor: '#ffffff' };
        if (bg.type === 'color') return { backgroundColor: bg.color };
        if (bg.type === 'image' && bg.imageUrl) {
            const url = typeof bg.imageUrl === 'string' ? bg.imageUrl : (bg.imageUrl.url || bg.imageUrl.src || '');
            return {
                backgroundImage: `url('${url}')`,
                backgroundSize: bg.backgroundSize || 'cover',
                backgroundPosition: bg.backgroundPosition || 'center',
                backgroundRepeat: bg.backgroundRepeat || 'no-repeat',
                backgroundAttachment: bg.fixed ? 'fixed' : 'scroll'
            };
        }
        return { backgroundColor: '#ffffff' };
    };

    const getTitleStyle = (config) => {
        if (!config) return {};
        return {
            color: config.color || '#f59e0b',
            fontSize: config.size || '36px',
            fontWeight: config.weight === 'normal' ? '400' : '700',
            fontStyle: config.style === 'italic' ? 'italic' : 'normal',
            textDecoration: config.decoration !== 'none' ? config.decoration : 'none'
        };
    };

    const getTextStyle = (config) => {
        if (!config) return {};
        return {
            color: config.color || '#374151',
            fontSize: config.size || '16px'
        };
    };

    const setSlide = (index) => {
        setCurrentSlide(index);
    };

    const actualId = sectionId || id || 'chitietbaiviet-section';

    return (
        <section id={actualId} ref={containerRef} className="py-12 md:py-20 relative w-full" style={getBackgroundStyle(background || { type: 'color', color: '#ffffff' })}>
            {isEditing && (
                <style dangerouslySetInnerHTML={{
                    __html: `
                    [data-inline-image-id] {
                        cursor: pointer;
                        transition: outline 0.2s;
                    }
                    [data-inline-image-id]:hover {
                        outline: 2px dashed #3b82f6;
                        outline-offset: -2px;
                    }
                `}} />
            )}
            <div className="container max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                
                {/* 7/3 Layout Container */}
                <div className={`flex flex-col ${reverseLayout ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 relative items-start`}>
                    
                    {/* LEFT COLUMN: 70% (Article Details) */}
                    <div className="w-full lg:w-[70%] bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10">
                        {/* Article Header (Title, Date, Time) */}
                        <div className="mb-8 border-b border-gray-100 pb-6">
                            <h1 
                                className="leading-tight mb-6"
                                style={getTitleStyle(articleTitleConfig || { color: '#111827', size: '36px', weight: 'bold' })}
                            >
                                {articleTitle || 'Tiêu đề bài viết'}
                            </h1>
                            
                            {/* Date and Time */}
                            <div 
                                className="flex flex-wrap items-center gap-4"
                                style={getTextStyle(dateConfig || { color: '#6b7280', size: '14px' })}
                            >
                                {date && (
                                    <div className="flex items-center gap-2">
                                        {dateIconSvg && (
                                            <span dangerouslySetInnerHTML={{ __html: dateIconSvg }} className="w-5 h-5 flex items-center justify-center"></span>
                                        )}
                                        <span>{date}</span>
                                    </div>
                                )}
                                {time && (
                                    <div className="flex items-center gap-2">
                                        {timeIconSvg && (
                                            <span dangerouslySetInnerHTML={{ __html: timeIconSvg }} className="w-5 h-5 flex items-center justify-center"></span>
                                        )}
                                        <span>{time}</span>
                                    </div>
                                )}
                                {lang && (
                                    <div className="flex items-center gap-2">
                                        {langIconSvg && (
                                            <span dangerouslySetInnerHTML={{ __html: langIconSvg }} className="w-5 h-5 flex items-center justify-center text-yellow-500"></span>
                                        )}
                                        <span>{lang === 'vi' ? 'Tiếng Việt' : lang === 'en' ? 'English' : lang.toUpperCase()}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content Before Image */}
                        {contentBeforeImage && contentBeforeImage.length > 0 && (
                            <div className="mb-8 space-y-4">
                                {contentBeforeImage.map((item, idx) => {
                                    const text = typeof item === 'string' ? item : (item.text || '');
                                    const config = item.textConfig || {};
                                    return (
                                        <div 
                                            key={idx}
                                            className="leading-relaxed ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                                            style={getTextStyle(config || { color: '#374151', size: '18px' })}
                                            children={text}
                                        />
                                    );
                                })}
                            </div>
                        )}

                        {/* Main Image */}
                        {mainImage && (
                            <div className="w-full mb-8 overflow-hidden shadow-sm flex items-center justify-center">
                                <img 
                                    src={typeof mainImage === 'string' ? mainImage : (mainImage?.url || mainImage?.src || '')} 
                                    alt={articleTitle || "Main article image"} 
                                    className="w-full h-auto max-h-[600px] object-cover"
                                    style={{
                                        borderRadius: (mainImageRadius?.type === 'custom') 
                                            ? `${mainImageRadius.tl || '0px'} ${mainImageRadius.tr || '0px'} ${mainImageRadius.br || '0px'} ${mainImageRadius.bl || '0px'}`
                                            : (mainImageRadius?.all || '8px')
                                    }}
                                    {...getEditProps('mainImage')}
                                />
                            </div>
                        )}

                        {/* Content After Image */}
                        {contentAfterImage && contentAfterImage.length > 0 && (
                            <div className="mb-8 space-y-4">
                                {contentAfterImage.map((item, idx) => {
                                    const text = typeof item === 'string' ? item : (item.text || '');
                                    const config = item.textConfig || {};
                                    return (
                                        <div 
                                            key={idx}
                                            className="leading-relaxed ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                                            style={getTextStyle(config || { color: '#374151', size: '18px' })}
                                            children={text}
                                        />
                                    );
                                })}
                            </div>
                        )}

                        {/* Contact Footer */}
                        {showContactFooter && (
                            <div className="mt-12">
                                <hr className="border-t-2 border-gray-300 w-1/3 mb-8" />
                                <div 
                                    className="leading-relaxed ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic text-gray-800"
                                    children={contactFooterContent || ''}
                                />
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: 30% (Sticky Carousel) - Copied from AdminHoatDong */}
                    <div className="w-full lg:w-[30%] lg:sticky lg:top-24 mt-12 lg:mt-0 self-start">
                        <div id={`${id || 'chitiet'}-services-card`} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100 group">
                            
                            {/* Header Sidebar */}
                            <div className="bg-[#155e3a] text-white text-center py-4 font-bold text-lg uppercase tracking-wide">
                                Dịch vụ của chúng tôi
                            </div>

                            {/* Slider Background */}
                            <div className="relative w-full h-56 md:h-64 overflow-hidden border-b-4 border-yellow-500">
                                {services && services.length > 0 && services.map((svc, idx) => {
                                    const isActive = idx === currentSlide;
                                    const bgObj = svc.background;
                                    let bgUrl = '';
                                    if (bgObj && bgObj.type === 'image' && bgObj.imageUrl) {
                                        bgUrl = typeof bgObj.imageUrl === 'string' ? bgObj.imageUrl : (bgObj.imageUrl.url || bgObj.imageUrl.src || '');
                                    }
                                    return (
                                        <div 
                                            key={idx}
                                            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                            style={{
                                                backgroundColor: bgObj?.type === 'color' ? bgObj.color : '#155e3a',
                                                backgroundImage: bgUrl ? `url('${bgUrl}')` : 'none',
                                                backgroundSize: bgObj?.backgroundSize || 'cover',
                                                backgroundPosition: bgObj?.backgroundPosition || 'center'
                                            }}
                                        ></div>
                                    );
                                })}
                                
                                {/* Navigation Arrows */}
                                {services && services.length > 1 && (
                                    <>
                                        <button 
                                            onClick={() => setCurrentSlide(prev => prev === 0 ? services.length - 1 : prev - 1)}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-all opacity-80 hover:opacity-100"
                                            aria-label="Previous slide"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                                        </button>
                                        <button 
                                            onClick={() => setCurrentSlide(prev => prev === services.length - 1 ? 0 : prev + 1)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-all opacity-80 hover:opacity-100"
                                            aria-label="Next slide"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Content of Current Slide */}
                            {services && services.length > 0 && (
                                <div className="p-6 md:p-8 flex-grow flex flex-col bg-white transition-all duration-300">
                                    <h3 
                                        className="mb-3 transition-colors duration-300 group-hover:[&>a]:!text-[#f59e0b]"
                                        style={getTitleStyle(services[currentSlide]?.titleConfig || { color: '#f59e0b', size: '20px', weight: 'bold' })}
                                    >
                                        <a href={services[currentSlide]?.linkUrl || '#'}>
                                            {services[currentSlide]?.title || 'Tiêu đề dịch vụ'}
                                        </a>
                                    </h3>
                                    
                                    <div 
                                        className="leading-relaxed mb-6 ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                                        style={getTextStyle(services[currentSlide]?.descriptionConfig || { color: '#4b5563', size: '14px' })}
                                        children={services[currentSlide]?.description || "Mô tả dịch vụ"}
                                    />
                                    
                                    <a 
                                        href={services[currentSlide]?.linkUrl || '#'}
                                        className="inline-flex items-center gap-1 transition-all group-hover:underline hover:gap-2 mt-auto"
                                        style={getTextStyle(services[currentSlide]?.linkConfig || { color: '#f59e0b', size: '14px', weight: 'bold' })}
                                    >
                                        {services[currentSlide]?.linkLabel || 'Tìm hiểu thêm'} 
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                    </a>

                                    {/* Dots */}
                                    {services.length > 1 && (
                                        <div className="flex items-center justify-center gap-2 mt-8">
                                            {services.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setSlide(idx)}
                                                    className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-6 bg-yellow-500' : 'w-2 bg-gray-300'}`}
                                                    aria-label={`Go to slide ${idx + 1}`}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* "Xem tất cả dịch vụ" link at bottom */}
                                    <div className="mt-6 pt-4 border-t border-gray-100 text-center w-full">
                                        <a 
                                            href="#" 
                                            className="inline-flex items-center gap-1 text-yellow-500 hover:text-yellow-600 font-bold transition-colors"
                                        >
                                            Xem tất cả dịch vụ <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AdminChiTietBaiVietHexagon;
