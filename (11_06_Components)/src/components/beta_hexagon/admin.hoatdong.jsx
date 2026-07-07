import React, { useCallback, useState, useEffect } from 'react';
import { usePuck } from "@puckeditor/core";
import { useInlineImage } from "../admin.useInlineImage";
import { getBackgroundStyle, getTextStyle, getTitleStyle } from './admin.styleUtils';

// Helper to determine line clamp class
const getLineClampStyle = (lines) => {
    if (!lines) return {};
    return {
        display: '-webkit-box',
        WebkitLineClamp: lines.toString(),
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
    };
};

const AdminHoatDongHexagon = ({ 
    sectionId = '',
    background, 
    title = 'Tin tức', 
    titleConfig,
    description = 'Tin tức mới nhất, cập nhật và thông tin từ Hexagon Corporation.',
    descConfig,
    lineColor = '#f59e0b',
    news = [],
    services = [],
    id,
    reverseLayout
}) => {
    let dispatch = null;
    let appState = null;
    try {
        const puckContext = usePuck();
        if (puckContext && puckContext.dispatch) {
            dispatch = puckContext.dispatch;
            appState = puckContext.appState;
        }
    } catch (e) {}

    // --- CAROUSEL STATE ---
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (!services || services.length === 0) return;
        setCurrentSlide((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        if (!services || services.length === 0) return;
        setCurrentSlide((prev) => (prev === 0 ? services.length - 1 : prev - 1));
    };

    const setSlide = (index) => {
        setCurrentSlide(index);
    };

    const baseId = id || 'hoatdong-section';
    const actualId = sectionId || baseId;
    return (
        <section id={actualId} className="py-12 md:py-20 relative w-full" style={getBackgroundStyle(background || { type: 'color', color: '#ffffff' })}>
            {/* INJECT DYNAMIC HOVER STYLES FOR NEWS CARDS */}
            <style dangerouslySetInnerHTML={{__html: 
                (news || []).map((item, idx) => {
                    const borderHoverColor = item.hoverBorderColor ? item.hoverBorderColor : 'transparent';
                    const titleHoverColor = item.hoverTitleColor ? item.hoverTitleColor : (item.titleConfig?.color || '#111827');
                    
                    return `
                        #${actualId} .news-card-${idx}:hover {
                            border-color: ${borderHoverColor} !important;
                        }
                        #${actualId} .news-card-${idx}:hover .news-title,
                        #${actualId} .news-card-${idx}:hover .news-title a {
                            color: ${titleHoverColor} !important;
                        }
                    `;
                }).join('\n')
            }} />

            <div className="container max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                
                {/* 7/3 Layout Container */}
                <div className={`flex flex-col ${reverseLayout ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 relative items-start`}>
                    
                    {/* LEFT COLUMN: 70% (News) */}
                    <div className="w-full lg:w-[70%]">
                        {/* Header */}
                        <div className="mb-8 md:mb-12">
                            {title && (
                                <h2 
                                    className="leading-tight"
                                    style={getTitleStyle(titleConfig || { color: '#f59e0b', size: '36px', weight: 'bold' })}
                                >
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <div 
                                    className="mt-4 leading-relaxed ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                                    style={getTextStyle(descConfig || { color: '#374151', size: '16px' })}
                                    children={description}
                                />
                            )}
                            <div className="w-16 h-1 mt-4" style={{ backgroundColor: lineColor || '#f59e0b' }}></div>
                        </div>

                        {/* News Grid */}
                        {news && news.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {news.map((item, idx) => (
                                    <div 
                                        key={idx}
                                        className={`news-card-${idx} rounded-xl shadow-md transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer border border-gray-100 hover:shadow-xl`}
                                        style={{
                                            backgroundColor: '#ffffff',
                                            borderWidth: item.hoverBorderColor ? '2px' : '1px'
                                        }}
                                    >
                                        {/* Thumbnail */}
                                        {item.imageUrl && (
                                            <div className="w-full h-48 md:h-56 overflow-hidden relative border-b border-gray-100">
                                                <img 
                                                    src={typeof item.imageUrl === 'string' ? item.imageUrl : (item.imageUrl?.url || item.imageUrl?.src || '')} 
                                                    alt={item.title || "News thumbnail"} 
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                {item.cardLogoText && (
                                                    <span className="absolute bottom-4 left-4 text-white text-sm font-semibold opacity-80 shadow-md">
                                                        {item.cardLogoText}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        
                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            {item.category && (
                                                <span 
                                                    className="inline-block px-3 py-1 rounded-full shadow-sm mb-3 w-fit"
                                                    style={{ 
                                                        fontSize: item.categoryConfig?.size || '12px',
                                                        fontWeight: item.categoryConfig?.weight || '600',
                                                        color: item.categoryConfig?.color || '#d97706',
                                                        backgroundColor: item.categoryConfig?.backgroundColor || '#ffffff',
                                                        border: item.categoryConfig?.border || '1px solid #f59e0b'
                                                    }}
                                                >
                                                    {item.category}
                                                </span>
                                            )}
                                            <h3 
                                                className="news-title mb-3 transition-colors duration-300"
                                                style={{
                                                    ...getTitleStyle(item.titleConfig || { color: '#111827', size: '18px', weight: 'bold' }),
                                                    ...getLineClampStyle(item.titleLineClamp !== undefined ? item.titleLineClamp : 2)
                                                }}
                                            >
                                                <a href={item.linkUrl || '#'}>{item.title}</a>
                                            </h3>
                                            
                                            <div 
                                                className="leading-relaxed flex-grow mb-4 ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                                                style={{
                                                    ...getTextStyle(item.summaryConfig || { color: '#4b5563', size: '14px' }),
                                                    ...getLineClampStyle(item.summaryLineClamp !== undefined ? item.summaryLineClamp : 2)
                                                }}
                                                children={item.summary}
                                            />
                                            
                                            {/* Footer inside card */}
                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                                <div 
                                                    className="flex items-center gap-3"
                                                    style={getTextStyle(item.dateConfig || { color: '#9ca3af', size: '12px' })}
                                                >
                                                    {item.date && (
                                                        <div className="flex items-center gap-1.5">
                                                            {item.dateIconSvg && (
                                                                <span dangerouslySetInnerHTML={{ __html: item.dateIconSvg }} className="w-4 h-4 flex items-center justify-center"></span>
                                                            )}
                                                            <span>{item.date}</span>
                                                        </div>
                                                    )}
                                                    {item.time && (
                                                        <div className="flex items-center gap-1.5">
                                                            {item.timeIconSvg && (
                                                                <span dangerouslySetInnerHTML={{ __html: item.timeIconSvg }} className="w-4 h-4 flex items-center justify-center"></span>
                                                            )}
                                                            <span>{item.time}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {(item.linkLabel || item.linkUrl) && (
                                                    <a 
                                                        href={item.linkUrl || '#'}
                                                        className="inline-flex items-center gap-1 group-hover:underline whitespace-nowrap"
                                                        style={getTextStyle(item.linkConfig || { color: '#f59e0b', size: '14px', weight: 'bold' })}
                                                    >
                                                        {item.linkLabel || 'Xem thêm'} 
                                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-400 italic">Chưa có bài viết nào...</div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: 30% (Sticky Carousel) */}
                    <div className="w-full lg:w-[30%] lg:sticky lg:top-24 mt-12 lg:mt-0 self-start">
                        <div id={`${id || 'hoatdong'}-services-card`} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100 group">
                            
                            {/* Header Sidebar */}
                            <div className="bg-[#155e3a] text-white text-center py-4 font-bold text-lg uppercase tracking-wide">
                                Dịch vụ của chúng tôi
                            </div>

                            {/* Carousel Area */}
                            {services && services.length > 0 ? (
                                <div className="relative w-full group">
                                    <div className="overflow-hidden relative w-full h-[320px]">
                                        <div 
                                            className="flex transition-transform duration-500 ease-in-out h-full"
                                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                        >
                                            {services.map((srv, idx) => {
                                                const bgStyle = getBackgroundStyle(srv.background || { type: 'color', color: '#155e3a' });
                                                // Handle image backgrounds for the service
                                                const hasImageUrl = srv.background && srv.background.type === 'image' && srv.background.imageUrl;
                                                return (
                                                    <div key={idx} className="min-w-full w-full h-full relative">
                                                        <div className="absolute inset-0 bg-cover bg-center" style={bgStyle}></div>
                                                        {hasImageUrl && (
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Prev/Next Arrows */}
                                    {services.length > 1 && (
                                        <>
                                            <button 
                                                onClick={prevSlide}
                                                className="absolute top-1/2 left-3 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white text-gray-800 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
                                                aria-label="Previous service"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                            </button>
                                            <button 
                                                onClick={nextSlide}
                                                className="absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white text-gray-800 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
                                                aria-label="Next service"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </button>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400 italic">
                                    Chưa có hình dịch vụ
                                </div>
                            )}

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
                                            href="/dich-vu"
                                            className="inline-flex items-center gap-1 transition-colors hover:gap-2 text-yellow-500 font-bold text-sm uppercase tracking-wide"
                                        >
                                            Xem tất cả dịch vụ
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
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

export default AdminHoatDongHexagon;
