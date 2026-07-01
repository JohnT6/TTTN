import React, { useRef, useCallback, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { usePuck } from '@puckeditor/core';
import { getBackgroundStyle, getCustomRadius, getTitleStyle } from './admin.styleUtils';
import { showImageModal } from './admin.inlineImageModal';
import { useInlineImage } from './admin.useInlineImage';

const AdminHoiVien = ({
    background = {},
    title = {},
    logoRadius = {},
    logos = [],
    scroll = { direction: 'left', speed: '20s' },
    id,
    puck
}) => {
    // Nhân bản danh sách logo để tạo vòng lặp cuộn vô tận liền mạch
    const duplicatedLogos = logos && logos.length > 0 ? [...logos, ...logos, ...logos, ...logos] : [];

    // Lấy dispatch và appState từ Puck để cập nhật dữ liệu inline
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
    } catch (e) {
        // Không có Puck context (đang ở mode Render/Preview)
    }

    // Xác định thông số cuộn
    const scrollSpeed = scroll.speed || '25s';
    const scrollFrom = scroll.direction === 'right' ? '-50%' : '0';
    const scrollTo = scroll.direction === 'right' ? '0' : '-50%';

    // Hàm cập nhật URL ảnh trực tiếp vào state của Puck
    const updateLogoUrl = useCallback((logoIndex, newUrl) => {
        console.log('[DEBUG AdminHoiVien] updateLogoUrl called.', { logoIndex, newUrl, id, appStateData: appState?.data });
        if (!dispatch || !appState || !id) {
            console.warn('[DEBUG AdminHoiVien] updateLogoUrl aborted. Missing dispatch, appState, or id');
            return;
        }

        const newContent = appState.data.content.map(item => {
            if (item.props?.id === id) {
                const newLogos = [...(item.props.logos || [])];
                if (newLogos[logoIndex]) {
                    newLogos[logoIndex] = { ...newLogos[logoIndex], logoUrl: newUrl };
                }
                return { ...item, props: { ...item.props, logos: newLogos } };
            }
            return item;
        });

        console.log('[DEBUG AdminHoiVien] Dispatching SET state...');
        dispatch({
            type: "set",
            state: {
                data: {
                    ...appState.data,
                    content: newContent
                }
            }
        });

        if (appState.ui.itemSelector) {
            console.log('[DEBUG AdminHoiVien] Dispatching SET UI to force remount...', appState.ui.itemSelector);
            const currentSelector = { ...appState.ui.itemSelector };
            dispatch({ type: "setUi", ui: { itemSelector: null } });
            setTimeout(() => {
                dispatch({ type: "setUi", ui: { itemSelector: currentSelector } });
                console.log('[DEBUG AdminHoiVien] Sidebar UI restored.');
            }, 100);
        } else {
            console.log('[DEBUG AdminHoiVien] No itemSelector found, skipping UI remount hack.');
        }
    }, [dispatch, appState, id]);

    const { containerRef, getEditProps } = useInlineImage({
        isEditing,
        onUpdate: updateLogoUrl
    });

    return (
        <section className="py-10 md:py-14 px-4 w-full overflow-hidden" style={getBackgroundStyle(background)} ref={containerRef}>
            {/* Nhúng mã CSS cho keyframes cuộn ngang vô tận và sửa pointer-events để elementsFromPoint hoạt động */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scrollLogos {
                    0% { transform: translate3d(${scrollFrom}, 0, 0); }
                    100% { transform: translate3d(${scrollTo}, 0, 0); }
                }
                .logo-scroll-track {
                    display: flex;
                    width: max-content;
                    animation: scrollLogos ${scrollSpeed} linear infinite;
                }
                .logo-scroll-track:hover {
                    animation-play-state: paused;
                }
                [data-admin-logo-edit] {
                    pointer-events: auto !important;
                }
            `}} />

            <div className="max-w-7xl mx-auto">
                {title?.text && (
                    <h2 
                        className="text-center font-extrabold uppercase tracking-wide mb-10 md:mb-14 px-4 relative z-10"
                        style={getTitleStyle(title)}
                    >
                        {title.text}
                    </h2>
                )}

                {logos && logos.length > 0 ? (
                    <div className="relative w-full">
                    {/* Hai bóng mờ 2 bên tạo hiệu ứng fade */}
                    <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>

                    {/* Vùng cuộn */}
                    <div className="overflow-hidden w-full relative z-0 py-4">
                        <div className="logo-scroll-track gap-4 md:gap-8 px-4">
                            {duplicatedLogos.map((item, index) => {
                                const originalIndex = index % (logos.length || 1);
                                return (
                                    <a
                                        key={index}
                                        href={item.link || '#'}
                                        {...getEditProps(originalIndex)}
                                        className={`bg-white flex items-center justify-center p-5 w-44 sm:w-48 h-24 shadow-md border border-gray-100/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer shrink-0 relative`}
                                        style={{
                                            borderRadius: getCustomRadius(logoRadius)
                                        }}
                                    >
                                        {item.logoUrl ? (
                                            <img
                                                src={item.logoUrl}
                                                alt={item.alt || 'Logo'}
                                                className="max-w-full max-h-full object-contain mix-blend-multiply block pointer-events-none"
                                                loading="lazy"
                                                draggable={false}
                                            />
                                        ) : (
                                            <div className="text-gray-400 font-medium text-lg pointer-events-none">{item.alt || 'LOGO'}</div>
                                        )}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
                ) : (
                    <div className="text-center py-10 text-gray-400">
                        Chưa có logo hội viên nào được thêm. Hãy thêm trong mục cấu hình.
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdminHoiVien;