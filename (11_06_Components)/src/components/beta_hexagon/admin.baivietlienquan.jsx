import React, { useState, useCallback } from 'react';
import { usePuck } from '@puckeditor/core';
import { useInlineImage } from '../admin.useInlineImage';
import { getBackgroundStyle, getTextStyle, getTitleStyle } from './admin.styleUtils';

const AdminBaiVietLienQuanHexagon = ({
    sectionId = '',
    background,
    lineColor = '#f59e0b',
    title = 'Bài viết liên quan',
    titleConfig,
    cards = [],
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
            const currentItem = appState.data.content[itemIndex];
            const newProps = { ...currentItem.props };

            if (editId.includes('.')) {
                const parts = editId.split('.');
                const arrayName = parts[0];
                const index = parseInt(parts[1], 10);
                const fieldName = parts[2];
                
                if (newProps[arrayName] && newProps[arrayName][index]) {
                    const newArray = [...newProps[arrayName]];
                    newArray[index] = {
                        ...newArray[index],
                        [fieldName]: newUrl
                    };
                    newProps[arrayName] = newArray;
                }
            } else {
                newProps[editId] = newUrl;
            }

            dispatch({
                type: "replace",
                item: { ...currentItem, props: newProps },
                index: itemIndex
            });
        }
    }, [dispatch, appState, id]);

    const { containerRef, getEditProps } = useInlineImage({
        isEditing,
        onUpdate: updateImageUrl
    });

    return (
        <section id={sectionId || undefined} ref={containerRef} className="py-12 md:py-20 relative w-full" style={getBackgroundStyle(background || { type: 'color', color: '#ffffff' })}>
            {isEditing && (
                <style dangerouslySetInnerHTML={{
                    __html: `
                    [data-inline-image-id] { cursor: pointer; transition: outline 0.2s; }
                    [data-inline-image-id]:hover { outline: 2px dashed #3b82f6; outline-offset: -2px; }
                `}} />
            )}
            <div className="container max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-1.5 h-8 md:h-10 rounded-full" style={{ backgroundColor: lineColor || '#f59e0b' }}></div>
                    <h2 
                        className="leading-tight m-0"
                        style={getTitleStyle(titleConfig || { color: '#111827', size: '28px', weight: 'bold' })}
                    >
                        {title}
                    </h2>
                </div>

                {/* Cards Grid */}
                {cards && cards.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {cards.map((card, idx) => {
                            const titleStyle = getTitleStyle(card.titleConfig || { color: '#111827', size: '18px', weight: 'bold' });
                            const baseTitleColor = titleStyle.color || '#111827';
                            const { color: _, ...restTitleStyle } = titleStyle;

                            return (
                                <a 
                                    key={idx}
                                    href={card.linkUrl || '#'}
                                    className="group block bg-white rounded-xl shadow-sm border-2 border-transparent overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[var(--hover-border-color)]"
                                    style={{
                                        '--hover-border-color': card.cardHoverBorderColor || '#f59e0b'
                                    }}
                                >
                                    <div className="w-full h-56 relative overflow-hidden">
                                        {card.imageUrl && (
                                            <img 
                                                src={typeof card.imageUrl === 'string' ? card.imageUrl : (card.imageUrl?.url || card.imageUrl?.src || '')}
                                                alt={card.title || "Related article"}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                style={{
                                                    borderRadius: (card.imageRadius?.type === 'custom') 
                                                        ? `${card.imageRadius.tl || '0px'} ${card.imageRadius.tr || '0px'} ${card.imageRadius.br || '0px'} ${card.imageRadius.bl || '0px'}`
                                                        : (card.imageRadius?.all || '8px')
                                                }}
                                                {...getEditProps(`cards.${idx}.imageUrl`)}
                                            />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 
                                            className="mb-3 leading-snug transition-colors duration-300 text-[var(--base-title-color)] group-hover:!text-[var(--hover-title-color)]"
                                            style={{
                                                ...restTitleStyle,
                                                '--base-title-color': baseTitleColor,
                                                '--hover-title-color': card.cardTitleHoverColor || '#f59e0b'
                                            }}
                                        >
                                            {card.title || 'Tiêu đề bài viết'}
                                        </h3>
                                        <div 
                                            style={getTextStyle(card.dateConfig || { color: '#6b7280', size: '14px' })}
                                        >
                                            {card.date}
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdminBaiVietLienQuanHexagon;
