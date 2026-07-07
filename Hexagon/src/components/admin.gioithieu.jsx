import React, { useCallback } from 'react';
import { usePuck } from '@puckeditor/core';
import { getBackgroundStyle, getTextStyle, getTitleStyle } from './admin.styleUtils';
import { useInlineImage } from './admin.useInlineImage';

const AdminGioiThieuHexagon = ({
    
    sectionId = '',
    background,
    imageUrl,
    imageAlt,
    quoteText,
    quoteAuthor,
    quoteConfig,
    quoteAuthorConfig,
    cardTitleConfig,
    cardDescConfig,
    title,
    titleConfig,
    description,
    descriptionConfig,
    layout = 'imageLeft',
    imageBackground,
    features = [],
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

    return (
        <section id={sectionId || undefined} 
            className="py-16 lg:py-24"
            style={getBackgroundStyle(background || { type: 'color', color: '#ffffff' })}
            ref={containerRef}
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
            <div className="container max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
                    
                    {/* Image & Quote */}
                    <div className={`w-full flex items-center justify-center relative ${layout === 'imageRight' ? 'order-2 md:order-2' : 'order-2 md:order-1'}`}>
                        <div className="relative p-3 sm:p-5 w-full">
                            <div 
                                className="absolute -inset-2 sm:-inset-4 rounded-2xl transform rotate-2 z-0"
                                style={getBackgroundStyle(imageBackground || { type: 'color', color: '#e3f7ed' })}
                            ></div>
                            {imageUrl && (
                                <img 
                                    src={typeof imageUrl === 'string' ? imageUrl : (imageUrl?.url || imageUrl?.src || '')} 
                                    alt={imageAlt || "About Image"} 
                                    className="relative z-10 rounded-xl shadow-xl object-cover max-h-[300px] sm:max-h-[400px] md:max-h-[500px] w-full" 
                                    {...getEditProps('imageUrl')}
                                />
                            )}
                        </div>
                        
                        {(quoteText || quoteAuthor) && (
                            <div className="absolute -bottom-6 right-4 md:-bottom-8 md:-right-4 bg-white p-6 rounded-xl shadow-xl max-w-[320px] z-20 transition-transform hover:-translate-y-2 duration-300">
                                {quoteText && (
                                    <p 
                                        className="italic leading-relaxed"
                                        style={getTextStyle(quoteConfig || { color: '#111827', size: '16px', weight: 'normal' })}
                                    >
                                        "{quoteText}"
                                    </p>
                                )}
                                {quoteAuthor && (
                                    <p 
                                        className="mt-3 uppercase tracking-wider text-right font-bold"
                                        style={getTextStyle(quoteAuthorConfig || { color: '#eab308', size: '14px', weight: 'bold' })}
                                    >
                                        — {quoteAuthor}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className={`flex flex-col justify-center ${layout === 'imageRight' ? 'order-1 md:order-1' : 'order-1 md:order-2'}`}>
                        {title && (
                            <h2 
                                className="mb-4 leading-tight"
                                style={getTitleStyle(titleConfig || { color: '#111827', size: '36px', weight: 'bold' })}
                            >
                                {title}
                            </h2>
                        )}
                        
                        {description && (
                            <div 
                                className="mb-6 leading-relaxed ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                                style={getTextStyle(descriptionConfig || { color: '#374151', size: '16px' })}
                            >
                                {description}
                            </div>
                        )}

                        {/* Cards Grid */}
                        {features && features.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 mt-8">
                                {features.map((card, idx) => (
                                    <div 
                                        key={idx} 
                                        className="rounded-xl p-6"
                                        style={getBackgroundStyle(card.background || { type: 'color', color: '#f8fafc' })}
                                    >
                                        <h3 
                                            className="mb-3"
                                            style={getTitleStyle(card.titleConfig || cardTitleConfig || { color: '#1D6A49', size: '18px', weight: 'bold' })}
                                        >
                                            {card.title}
                                        </h3>
                                        <div 
                                            className="leading-relaxed ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                                            style={getTextStyle(card.descriptionConfig || cardDescConfig || { color: '#4b5563', size: '14px', weight: 'normal' })}
                                        >
                                            {card.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AdminGioiThieuHexagon;
