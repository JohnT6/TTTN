import React, { useCallback, useState } from 'react';
import { usePuck } from "@puckeditor/core";
import { useInlineImage } from "../admin.useInlineImage";

const AdminTinTucHexagon = ({ 
    
    sectionId = '',
    background, 
    title, 
    titleConfig,
    description,
    descriptionConfig,
    buttons = [],
    news = [],
    id
}) => {
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

    const updateNewsImage = useCallback((indexStr, newUrl) => {
        if (!dispatch || !appState || !id) return;
        const sIndex = parseInt(indexStr, 10);
        
        const itemIndex = appState.data.content.findIndex(item => item.props.id === id);
        if (itemIndex > -1) {
            const currentItem = appState.data.content[itemIndex];
            const newNews = [...(currentItem.props.news || [])];
            if (newNews[sIndex]) {
                newNews[sIndex] = { ...newNews[sIndex], imageUrl: newUrl };
            }
            dispatch({
                type: "replace",
                item: {
                    ...currentItem,
                    props: {
                        ...currentItem.props,
                        news: newNews
                    }
                },
                index: itemIndex
            });
        }
    }, [dispatch, appState, id]);

    const { containerRef, getEditProps } = useInlineImage({
        isEditing,
        onUpdate: updateNewsImage
    });
    
    const getBackgroundStyle = (bgData) => {
        if (!bgData) return { backgroundColor: '#ffffff' };
        if (bgData.type === 'color') {
            return { backgroundColor: bgData.color };
        }
        if (bgData.type === 'image' || bgData.type === 'image_color') {
            return { 
                backgroundImage: `url('${bgData.imageUrl}')`,
                backgroundSize: bgData.backgroundSize || 'cover',
                backgroundPosition: bgData.backgroundPosition || 'center',
                backgroundColor: bgData.type === 'image_color' ? bgData.color : 'transparent'
            };
        }
        if (bgData.type === 'gradient') {
            return { background: bgData.gradient };
        }
        return { backgroundColor: '#ffffff' };
    };

    const getTitleStyle = (config) => {
        if (!config) return {};
        const style = {
            color: config.color || '#111827',
            fontSize: config.size || '18px',
            fontWeight: config.weight === 'normal' ? 'normal' : 'bold',
            fontStyle: config.style === 'italic' ? 'italic' : 'normal',
        };
        if (config.decoration && config.decoration !== 'none') {
            style.textDecoration = config.decoration;
        }
        return style;
    };

    const getTextStyle = (config) => {
        if (!config) return {};
        const style = {
            color: config.color || '#4b5563',
            fontSize: config.size || '14px',
            fontWeight: config.weight === 'bold' ? 'bold' : 'normal',
            fontStyle: config.style === 'italic' ? 'italic' : 'normal',
        };
        if (config.decoration && config.decoration !== 'none') {
            style.textDecoration = config.decoration;
        }
        return style;
    };

    const getCardWidthClass = (widthSetting, idx) => {
        switch (widthSetting) {
            case '100': return 'lg:col-span-6';
            case '50': return 'lg:col-span-3 md:col-span-3';
            case '33': return 'lg:col-span-2 md:col-span-2';
            case 'auto': 
            default:
                return idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
        }
    };

    const getLineClampStyle = (lines) => {
        if (!lines || lines <= 0) return {};
        return {
            display: '-webkit-box',
            WebkitLineClamp: lines,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
        };
    };

    return (
        <section id={sectionId || undefined} 
            className="py-10 md:py-16"
            style={getBackgroundStyle(background || { type: 'color', color: '#ffffff' })}
            ref={containerRef}
            id={id || 'tintuc-section'}
        >
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
            <style dangerouslySetInnerHTML={{
                __html: `
                ${news.map((item, idx) => {
                    const borderHoverColor = item.hoverBorderColor ? item.hoverBorderColor : 'transparent';
                    const titleHoverColor = item.hoverTitleColor ? item.hoverTitleColor : (item.titleConfig?.color || '#111827');
                    
                    return `
                        #${id || 'tintuc-section'} .news-card-${idx}:hover {
                            border-color: ${borderHoverColor} !important;
                        }
                        #${id || 'tintuc-section'} .news-card-${idx}:hover .news-title {
                            color: ${titleHoverColor} !important;
                        }
                    `;
                }).join('\n')}

                ${(buttons || []).map((btn, idx) => {
                    if (btn.hoverBackground?.type === 'color') {
                        return `
                            #${id || 'tintuc-section'} .view-all-btn-${idx}:hover {
                                background-color: ${btn.hoverBackground.color} !important;
                                background-image: none !important;
                            }
                        `;
                    }
                    if (btn.hoverBackground?.type === 'gradient') {
                        return `
                            #${id || 'tintuc-section'} .view-all-btn-${idx}:hover {
                                background: ${btn.hoverBackground.gradient} !important;
                            }
                        `;
                    }
                    return '';
                }).join('\n')}
            `}} />
            <div className="container max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    {title && (
                        <h2 
                            className="leading-tight"
                            style={getTitleStyle(titleConfig || { color: '#000000', size: '36px', weight: 'bold' })}
                        >
                            {title}
                        </h2>
                    )}
                    {description && (
                        <div 
                            className="mt-2 leading-relaxed px-4 max-w-3xl mx-auto ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                            style={getTextStyle(descriptionConfig || { color: '#374151', size: '16px' })}
                        >
                            {description}
                        </div>
                    )}
                    <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* News Grid */}
                {news && news.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-6 md:gap-8">
                        {news.map((item, idx) => (
                            <div 
                                key={idx}
                                className={`news-card-${idx} rounded-xl shadow-md transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer border border-gray-100 md:col-span-6 ${getCardWidthClass(item.cardWidth, idx)}`}
                                style={{
                                    ...getBackgroundStyle(item.background || { type: 'color', color: '#ffffff' }),
                                    borderWidth: item.hoverBorderColor ? '2px' : '1px' // Ensure border width is ready for hover if set
                                }}
                            >
                                {/* Thumbnail */}
                                {item.imageUrl && (
                                    <div className="w-full h-56 overflow-hidden relative border-b border-gray-100">
                                        <img 
                                            src={typeof item.imageUrl === 'string' ? item.imageUrl : (item.imageUrl?.url || item.imageUrl?.src || '')} 
                                            alt={item.title || "News thumbnail"} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            {...getEditProps(idx)}
                                        />
                                        {item.category && (
                                            <span 
                                                className="absolute top-4 left-4 px-3 py-1 uppercase tracking-wider rounded-md text-white shadow-sm"
                                                style={{ backgroundColor: 'rgba(0,0,0,0.5)', fontSize: '12px', fontWeight: 'bold' }}
                                            >
                                                {item.category}
                                            </span>
                                        )}
                                    </div>
                                )}
                                
                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
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
                                    >
                                        {item.summary}
                                    </div>
                                    
                                    {/* Footer */}
                                    <div className="mt-auto pt-4 flex justify-between items-center" style={{ borderTop: `1px solid ${item.hoverBorderColor ? 'transparent' : '#f3f4f6'}` }}>
                                        <div className="flex-1">
                                            {item.date && (
                                                <p 
                                                    className="flex items-center gap-1.5"
                                                    style={getTextStyle(item.dateConfig || { color: '#9ca3af', size: '12px', weight: '500' })}
                                                >
                                                    {item.dateIconSvg ? (
                                                        <span dangerouslySetInnerHTML={{ __html: item.dateIconSvg }} className="w-4 h-4 flex items-center justify-center"></span>
                                                    ) : (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    )}
                                                    {item.date}
                                                </p>
                                            )}
                                        </div>

                                        {(item.linkLabel || item.linkUrl) && (
                                            <a 
                                                href={item.linkUrl || '#'}
                                                className="inline-flex items-center gap-1.5 transition-colors group-hover:underline"
                                                style={getTextStyle(item.linkConfig || { color: '#f59e0b', size: '14px', weight: 'bold' })}
                                            >
                                                {item.linkLabel || 'Xem chi tiết'}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center py-16">
                        <span className="text-gray-400 italic">Chưa có bản tin nào...</span>
                    </div>
                )}

                {/* View All Buttons */}
                {buttons && buttons.length > 0 && (
                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        {buttons.map((btn, idx) => (
                            <a 
                                key={idx}
                                href={btn.url || '#'}
                                className={`view-all-btn-${idx} inline-flex items-center px-8 py-3 text-white font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg`}
                                style={{
                                    ...getBackgroundStyle(btn.background || { type: 'color', color: '#10b981' }),
                                    background: btn.background?.type === 'gradient' ? btn.background.gradient : undefined
                                }}
                            >
                                {btn.label || 'Xem chi tiết'}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdminTinTucHexagon;
