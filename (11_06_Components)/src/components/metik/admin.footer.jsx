import React, { useCallback } from 'react';
import { usePuck } from '@puckeditor/core';
import { useInlineImage } from './admin.useInlineImage';
import { getTextStyle, getBackgroundStyle } from './admin.styleUtils';

// Helper component for Icons
const FooterIcon = ({ type, customSvg, className }) => {
    switch (type) {
        case 'phone':
            return (
                <svg className={className} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
            );
        case 'mail':
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            );
        case 'location':
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            );
        case 'custom':
            if (customSvg) {
                // Wrapper span để kế thừa class w- h- và màu
                return <span className={`${className} inline-flex items-center justify-center`} dangerouslySetInnerHTML={{ __html: customSvg }} />;
            }
            return null;
        default:
            return null;
    }
};

const AdminFooterMetik = ({
    background,
    bottomBackground,
    logoUrl,
    description,
    descriptionConfig,
    columns,
    copyrightText,
    copyrightConfig,
    id
}) => {
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
    } catch (e) { }

    // Cập nhật text đơn giản
    const updateFooterData = useCallback((field, value) => {
        if (!dispatch || !appState || !id) return;

        const newContent = appState.data.content.map(item => {
            if (item.props?.id === id) {
                return { ...item, props: { ...item.props, [field]: value } };
            }
            return item;
        });

        dispatch({ type: "set", state: { data: { ...appState.data, content: newContent } } });
    }, [dispatch, appState, id]);

    // Cập nhật text trong mảng Columns
    const updateColumnData = useCallback((colIndex, field, value, itemIndex = null) => {
        if (!dispatch || !appState || !id) return;

        const newContent = appState.data.content.map(item => {
            if (item.props?.id === id) {
                const newColumns = [...(item.props.columns || [])];
                if (newColumns[colIndex]) {
                    if (itemIndex !== null) {
                        // Sửa text trong một item của mảng con (items)
                        const newItems = [...(newColumns[colIndex].items || [])];
                        if (newItems[itemIndex]) {
                            newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
                        }
                        newColumns[colIndex] = { ...newColumns[colIndex], items: newItems };
                    } else {
                        // Sửa text của title cột
                        newColumns[colIndex] = { ...newColumns[colIndex], [field]: value };
                    }
                }
                return { ...item, props: { ...item.props, columns: newColumns } };
            }
            return item;
        });

        dispatch({ type: "set", state: { data: { ...appState.data, content: newContent } } });
    }, [dispatch, appState, id]);

    // Setup Inline Image cho Logo
    const { containerRef, getEditProps } = useInlineImage({
        isEditing,
        onUpdate: (editId, newUrl) => updateFooterData('logoUrl', newUrl)
    });

    return (
        <footer className="w-full flex flex-col font-sans" ref={containerRef}>
            {isEditing && (
                <style dangerouslySetInnerHTML={{
                    __html: `
                    [data-inline-image-id] {
                        pointer-events: auto !important;
                    }
                `}} />
            )}

            {/* PHẦN TRÊN */}
            <div className="py-12 md:py-16 px-4 md:px-8" style={getBackgroundStyle(background)}>
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-16">

                    {/* Cột trái: Logo & Mô tả */}
                    <div className="w-full md:w-6/12 flex flex-col items-center md:items-start text-center md:text-left">
                        {/* Logo 283x102 */}
                        <div
                            className="w-[283px] h-[102px] relative cursor-pointer mb-6 flex-shrink-0"
                            {...getEditProps('logo')} // Chỉ 1 logo nên truyền ID tĩnh
                        >
                            <img
                                src={logoUrl || 'https://via.placeholder.com/283x102?text=LOGO'}
                                alt="Logo"
                                className={`w-full h-full object-contain ${isEditing ? 'pointer-events-none' : ''}`}
                                draggable={false}
                            />
                        </div>
                        {/* Mô tả */}
                        <p
                            className="leading-relaxed"
                            style={getTextStyle(descriptionConfig)}
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onBlur={(e) => updateFooterData('description', e.currentTarget.textContent)}
                        >
                            {description || 'Nhập mô tả ở đây...'}
                        </p>
                    </div>

                    {/* Các cột phải: Danh sách mảng Cột (Columns) */}
                    <div className="w-full md:w-6/12 flex  flex-col md:flex-row gap-8 flex-wrap justify-start">
                        {(columns || []).map((col, colIndex) => (
                            <div key={colIndex} className="flex flex-col flex-1 min-w-[250px]">
                                {/* Tiêu đề Cột */}
                                <div className="mb-6 pb-2 border-b border-[#f97316]/20 relative">
                                    <h3
                                        className="font-bold uppercase tracking-wider relative z-10"
                                        style={getTextStyle(col.titleConfig)}
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning
                                        onBlur={(e) => updateColumnData(colIndex, 'title', e.currentTarget.textContent)}
                                    >
                                        {col.title || 'TIÊU ĐỀ CỘT'}
                                    </h3>
                                </div>

                                {/* Danh sách Item của Cột */}
                                <ul className="flex flex-col gap-4">
                                    {(col.items || []).map((item, itemIndex) => {
                                        // Xử lý Link Href
                                        let href = item.urlValue || '#';
                                        if (item.tagType === 'link') {
                                            if (item.linkAction === 'tel') href = `tel:${item.urlValue}`;
                                            else if (item.linkAction === 'mail') href = `mailto:${item.urlValue}`;
                                        }

                                        const ItemTag = item.tagType === 'link' ? 'a' : 'p';
                                        // Ép màu trắng khi hover bằng !important
                                        const hoverClass = item.tagType === 'link' ? 'hover:!text-white transition-colors duration-300 block w-fit' : '';

                                        return (
                                            <li key={itemIndex} className="flex items-start gap-3">
                                                {/* Icon */}
                                                {item.iconType !== 'none' && (
                                                    <div className="mt-1 flex-shrink-0" style={{ color: item.itemConfig?.color || '#333' }}>
                                                        <FooterIcon type={item.iconType} customSvg={item.customSvg} className="w-5 h-5" />
                                                    </div>
                                                )}

                                                {/* Nội dung chữ */}
                                                <ItemTag
                                                    href={item.tagType === 'link' ? href : undefined}
                                                    className={`leading-relaxed ${hoverClass}`}
                                                    style={getTextStyle(item.itemConfig)}
                                                    contentEditable={isEditing}
                                                    suppressContentEditableWarning
                                                    onBlur={(e) => updateColumnData(colIndex, 'text', e.currentTarget.textContent, itemIndex)}
                                                    onClick={(e) => {
                                                        if (isEditing) e.preventDefault();
                                                    }}
                                                >
                                                    {item.text || 'Nội dung...'}
                                                </ItemTag>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* PHẦN DƯỚI (Copyright) */}
            <div className="py-4 px-4 md:px-8 relative" style={getBackgroundStyle(bottomBackground)}>
                <div className="max-w-[1400px] mx-auto flex justify-center items-center">
                    <p
                        className="text-sm text-center"
                        style={getTextStyle(copyrightConfig)}
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={(e) => updateFooterData('copyrightText', e.currentTarget.textContent)}
                    >
                        {copyrightText || 'Copyright © 2026 METIK.'}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default AdminFooterMetik;
