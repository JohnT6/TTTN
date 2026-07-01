import React, { useCallback } from 'react';
import { usePuck } from '@puckeditor/core';
import { useInlineImage } from './admin.useInlineImage';
import { getTextStyle, getCustomRadius, getBackgroundStyle } from './admin.styleUtils';

const AdminGioiThieuMetik = ({
    title,
    titleConfig,
    description,
    descriptionConfig,
    background,
    rows,
    id
}) => {
    // Inline Image logic
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

    const updateRowImage = useCallback((indexStr, newUrl) => {
        if (!dispatch || !appState || !id) return;
        const rowIndex = parseInt(indexStr, 10);
        
        const newContent = appState.data.content.map(item => {
            if (item.props?.id === id) {
                const newRows = [...(item.props.rows || [])];
                if (newRows[rowIndex]) {
                    newRows[rowIndex] = { ...newRows[rowIndex], imageUrl: newUrl };
                }
                return { ...item, props: { ...item.props, rows: newRows } };
            }
            return item;
        });

        dispatch({ type: "set", state: { data: { ...appState.data, content: newContent } } });
        
        // Remount UI hack for Image Modal (to update editor sidebar).
        if (appState.ui.itemSelector) {
            const currentSelector = { ...appState.ui.itemSelector };
            dispatch({ type: "setUi", ui: { itemSelector: null } });
            setTimeout(() => {
                dispatch({ type: "setUi", ui: { itemSelector: currentSelector } });
            }, 50);
        }
    }, [dispatch, appState, id]);

    const { containerRef, getEditProps } = useInlineImage({
        isEditing,
        onUpdate: (editId, newUrl) => updateRowImage(editId, newUrl)
    });

    return (
        <section className="py-8 md:py-12" style={getBackgroundStyle(background)} ref={containerRef}>
            {isEditing && (
                <style dangerouslySetInnerHTML={{
                    __html: `
                    [data-inline-image-id] {
                        pointer-events: auto !important;
                    }
                `}} />
            )}
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                
                {/* Header Section */}
                <div className="mb-8 md:mb-12">
                    <div className="relative inline-block mb-6">
                        <h2 
                            className="text-2xl md:text-3xl font-black text-[#2e7d32] uppercase tracking-wide relative z-10"
                            style={getTextStyle(titleConfig)}
                        >
                            {title}
                        </h2>
                        {/* Đường gạch dưới màu vàng */}
                        <div className="absolute bottom-1 left-0 w-[110%] h-3 z-0 -ml-2" style={{ backgroundColor: titleConfig?.bgColor || '#fbc02d' }}></div>
                    </div>
                    
                    <div 
                        className="text-gray-700 text-base md:text-lg leading-relaxed ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                        style={getTextStyle(descriptionConfig)}
                    >
                        {description}
                    </div>
                </div>

                {/* Rows Section */}
                <div className="space-y-12 md:space-y-16">
                    {(rows || []).map((row, index) => (
                        <div 
                            key={index} 
                            className={`flex flex-col gap-6 md:gap-10 lg:gap-16 ${row.layout === 'image_right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
                        >
                            {/* Cột ảnh */}
                            <div className="w-full md:w-1/2 relative group" {...getEditProps(index)}>
                                <div className={`relative ${isEditing ? 'cursor-pointer' : ''}`}>
                                    <img 
                                        src={row.imageUrl || 'https://via.placeholder.com/800x600?text=Ảnh+minh+họa'} 
                                        alt="Giới thiệu"
                                        className={`w-full h-[250px] md:h-[357px] object-cover shadow-sm ${isEditing ? 'pointer-events-none' : ''}`}
                                        style={{ borderRadius: getCustomRadius(row.imageRadius) }}
                                        draggable={false}
                                    />
                                </div>
                            </div>

                            {/* Cột chữ */}
                            <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
                                {row.textBlocks && row.textBlocks.map((block, j) => {
                                    return (
                                        <div 
                                            key={j} 
                                            className="text-gray-700 leading-relaxed text-base md:text-lg ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic" 
                                            style={getTextStyle(block.textConfig)}
                                        >
                                            {block.content}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default AdminGioiThieuMetik;
