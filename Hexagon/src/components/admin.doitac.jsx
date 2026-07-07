import React, { useCallback } from 'react';
import { usePuck } from '@puckeditor/core';
import { getBackgroundStyle, getTitleStyle } from './admin.styleUtils';
import { useInlineImage } from './admin.useInlineImage';

const AdminDoiTacHexagon = ({
    
    sectionId = '',
    background,
    title,
    titleConfig,
    scroll = { direction: 'left', speed: '20s' },
    logos = [],
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

    const updateLogoImage = useCallback((indexStr, newUrl) => {
        if (!dispatch || !appState || !id) return;
        const sIndex = parseInt(indexStr, 10);
        
        const itemIndex = appState.data.content.findIndex(item => item.props.id === id);
        if (itemIndex > -1) {
            const currentItem = appState.data.content[itemIndex];
            const newLogos = [...(currentItem.props.logos || [])];
            if (newLogos[sIndex]) {
                newLogos[sIndex] = { ...newLogos[sIndex], imageUrl: newUrl };
            }
            dispatch({
                type: "replace",
                item: {
                    ...currentItem,
                    props: {
                        ...currentItem.props,
                        logos: newLogos
                    }
                },
                index: itemIndex
            });
        }
    }, [dispatch, appState, id]);

    const { containerRef, getEditProps } = useInlineImage({
        isEditing,
        onUpdate: updateLogoImage
    });

    // Để dải marquee chạy liên tục mượt mà, ta nhân đôi mảng logos lên
    const duplicatedLogos = [...logos, ...logos, ...logos];
    const bgStyle = getBackgroundStyle(background || { type: 'gradient', gradientDirection: 'to bottom', gradientFrom: '#0f826b', gradientTo: '#86efac' });
    const gradColor = background?.gradientFrom || '#0f826b';

    // Xác định thông số cuộn
    const scrollSpeed = scroll?.speed || '20s';
    const scrollFrom = scroll?.direction === 'right' ? '-50%' : '0';
    const scrollTo = scroll?.direction === 'right' ? '0' : '-50%';

    return (
        <section id={sectionId || undefined} 
            className="hexa-sponsor-bar py-12 md:py-16 text-center overflow-hidden relative z-10"
            style={bgStyle}
            ref={containerRef}
            id={id || 'doitac-section'}
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
            <style>
                {`
                @keyframes marquee-scroll-hexa-${id || 'default'} {
                    0% { transform: translate3d(${scrollFrom}, 0, 0); }
                    100% { transform: translate3d(${scrollTo}, 0, 0); }
                }
                #${id || 'doitac-section'} .hexa-marquee-track {
                    display: flex;
                    gap: 24px;
                    width: max-content;
                    animation: marquee-scroll-hexa-${id || 'default'} ${scrollSpeed} linear infinite;
                }
                #${id || 'doitac-section'} .hexa-logo-marquee:hover .hexa-marquee-track {
                    animation-play-state: paused;
                }
                #${id || 'doitac-section'} .hexa-logo-marquee::before, #${id || 'doitac-section'} .hexa-logo-marquee::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    width: 150px;
                    height: 100%;
                    z-index: 2;
                    pointer-events: none;
                }
                #${id || 'doitac-section'} .hexa-logo-marquee::before {
                    left: 0;
                    background: linear-gradient(90deg, ${gradColor}, transparent);
                }
                #${id || 'doitac-section'} .hexa-logo-marquee::after {
                    right: 0;
                    background: linear-gradient(270deg, ${gradColor}, transparent);
                }
                `}
            </style>

            <div className="container max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
                {title && (
                    <h2 
                        className="leading-tight mb-5"
                        style={getTitleStyle(titleConfig || { color: '#ffffff', size: '36px', weight: 'bold' })}
                    >
                        {title}
                    </h2>
                )}

                <div className="hexa-logo-marquee relative w-full overflow-hidden flex mt-8">
                    <div className="hexa-marquee-track">
                        {logos.length > 0 ? (
                            duplicatedLogos.map((item, idx) => (
                                <div 
                                    key={idx}
                                    className="rounded-2xl w-[180px] h-[108px] flex flex-col justify-center items-center p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex-shrink-0 hover:-translate-y-1"
                                    style={getBackgroundStyle(item.background || { type: 'color', color: '#ffffff' })}
                                >
                                    {item.imageUrl && (
                                        <img 
                                            src={typeof item.imageUrl === 'string' ? item.imageUrl : (item.imageUrl?.url || item.imageUrl?.src || '')} 
                                            alt={item.name || "Logo"}
                                            className="max-h-[64px] max-w-[140px] object-contain transition-transform duration-300"
                                            {...getEditProps(idx % logos.length)}
                                        />
                                    )}
                                    {item.type === 'svg' && item.svgCode ? (
                                        <div 
                                            className="custom-logo flex flex-col items-center justify-center w-full h-full"
                                            dangerouslySetInnerHTML={{ __html: item.svgCode }}
                                        />
                                    ) : !item.imageUrl && (
                                        <span className="text-gray-400 text-xs text-center">{item.name || 'Logo trống'}</span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center w-full py-10 text-white italic opacity-70">
                                Chưa có đối tác nào
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminDoiTacHexagon;
