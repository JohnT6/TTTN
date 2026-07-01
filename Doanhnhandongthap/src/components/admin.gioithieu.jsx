import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePuck } from '@measured/puck';
import { flushSync } from 'react-dom';
import { getBackgroundStyle, getCustomRadius, getResponsiveFontSize } from './admin.styleUtils';
import { showImageModal } from './admin.inlineImageModal';
import { useInlineImage } from './admin.useInlineImage';

const PeopleBlock = ({ card, cardIndex, isEditing, getEditProps }) => {
    const [page, setPage] = useState(0);

    const members = (card.members || []).filter(m => m.val1 || m.val2 || m.val3 || m.val4 || m.avatar);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(members.length / itemsPerPage);

    // Khi edit, nếu thêm member mới làm tăng trang, ta vẫn ở trang cũ hoặc nhảy sang trang mới.
    // Tạm thời giới hạn page không vượt quá totalPages
    const safePage = Math.min(page, Math.max(0, totalPages - 1));
    const currentMembers = members.slice(safePage * itemsPerPage, safePage * itemsPerPage + itemsPerPage);

    const handleNext = () => setPage((p) => (p + 1) % totalPages);
    const handlePrev = () => setPage((p) => (p - 1 + totalPages) % totalPages);

    const lblConfig = card.memberLabels || {};

    return (
        <div className="flex flex-col h-full relative z-10 min-h-0">
            {card.introText?.text && (
                <p className="mb-4 shrink-0" style={{ color: card.introText.color, fontSize: getResponsiveFontSize(card.introText.size) }}>
                    {card.introText.text}
                </p>
            )}

            <div className="flex-1 flex flex-col gap-4 min-h-0">
                {currentMembers.map((member, mIdx) => {
                    const originalIndex = safePage * itemsPerPage + mIdx;
                    return (
                        <div key={originalIndex} className="flex items-center gap-5 bg-gray-50/50 p-3 rounded-xl border border-gray-100/50 hover:bg-gray-50 transition-colors shrink-0">
                            <div
                                className={`relative shrink-0 rounded-full`}
                                {...getEditProps(JSON.stringify({ cardIndex, type: 'avatar', memberIndex: originalIndex }))}
                            >
                                <img
                                    src={member.avatar?.trim() || 'https://i.pravatar.cc/150?u=1'}
                                    alt={member.val1 || 'avatar'}
                                    className="w-16 h-16 rounded-full object-cover shadow-sm border-2 border-white bg-white block pointer-events-none"
                                />
                            </div>

                            <div style={{ fontSize: getResponsiveFontSize(lblConfig.textSize || '13px'), lineHeight: '1.6' }}>
                                {lblConfig.lbl1 && member.val1 && <p><span className="font-bold" style={{ color: lblConfig.labelColor }}>{lblConfig.lbl1}</span> <span style={{ color: lblConfig.valueColor }}>{member.val1}</span></p>}
                                {lblConfig.lbl2 && member.val2 && <p><span className="font-bold" style={{ color: lblConfig.labelColor }}>{lblConfig.lbl2}</span> <span style={{ color: lblConfig.valueColor }}>{member.val2}</span></p>}
                                {lblConfig.lbl3 && member.val3 && <p><span className="font-bold" style={{ color: lblConfig.labelColor }}>{lblConfig.lbl3}</span> <span style={{ color: lblConfig.valueColor }}>{member.val3}</span></p>}
                                {lblConfig.lbl4 && member.val4 && <p><span className="font-bold" style={{ color: lblConfig.labelColor }}>{lblConfig.lbl4}</span> <span style={{ color: lblConfig.valueColor }}>{member.val4}</span></p>}
                            </div>
                        </div>
                    );
                })}
            </div>

            {totalPages > 1 && (
                <div className="shrink-0 flex items-center justify-center gap-3 mt-4 pt-2 mb-8">
                    <button onClick={handlePrev} type="button" className="w-10 h-10 flex items-center justify-center bg-[#e0f2fe] text-[#0369a1] hover:bg-[#bae6fd] transition-colors font-bold select-none cursor-pointer relative z-20 overflow-hidden" style={{ borderRadius: getCustomRadius(card.buttonRadius || { type: 'all', all: '9999px' }) }}>‹</button>
                    <div className="flex gap-1.5 items-center">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <span
                                key={i}
                                onClick={() => setPage(i)}
                                className={`h-1.5 rounded-full transition-all cursor-pointer relative z-20 ${i === safePage ? 'w-6 bg-[#1e3a8a]' : 'w-1.5 bg-gray-300 hover:bg-gray-400'}`}
                            ></span>
                        ))}
                    </div>
                    <button onClick={handleNext} type="button" className="w-10 h-10 flex items-center justify-center bg-[#e0f2fe] text-[#0369a1] hover:bg-[#bae6fd] transition-colors font-bold select-none cursor-pointer relative z-20 overflow-hidden" style={{ borderRadius: getCustomRadius(card.buttonRadius || { type: 'all', all: '9999px' }) }}>›</button>
                </div>
            )}
        </div>
    );
};

const AdminGioiThieu = ({ background = {}, cards = [], id, puck }) => {
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
        // Render mode
    }

    const updateCardImage = useCallback((cardIndex, fieldType, newValue, memberIndex = null) => {
        console.log('[DEBUG AdminGioiThieu] updateCardImage called.', { cardIndex, fieldType, newValue, memberIndex, id, appStateData: appState?.data });
        if (!dispatch || !appState || !id) {
            console.warn('[DEBUG AdminGioiThieu] updateCardImage aborted. Missing dispatch, appState, or id');
            return;
        }
        const newContent = appState.data.content.map(item => {
            if (item.props?.id === id) {
                const newCards = [...(item.props.cards || [])];
                if (newCards[cardIndex]) {
                    if (fieldType === 'bottom') {
                        newCards[cardIndex] = { ...newCards[cardIndex], bottomImage: newValue };
                    } else if (fieldType === 'bottom2') {
                        newCards[cardIndex] = { ...newCards[cardIndex], bottomImage2: newValue };
                    } else if (fieldType === 'avatar' && memberIndex !== null) {
                        const newMembers = [...(newCards[cardIndex].members || [])];
                        if (newMembers[memberIndex]) {
                            newMembers[memberIndex] = { ...newMembers[memberIndex], avatar: newValue };
                        }
                        newCards[cardIndex] = { ...newCards[cardIndex], members: newMembers };
                    }
                }
                return { ...item, props: { ...item.props, cards: newCards } };
            }
            return item;
        });

        console.log('[DEBUG AdminGioiThieu] Dispatching SET state...');
        if (appState.ui.itemSelector) {
            console.log('[DEBUG AdminGioiThieu] Dispatching SET UI to force remount...', appState.ui.itemSelector);
            const currentSelector = { ...appState.ui.itemSelector };
            dispatch({ type: "set", state: { data: { ...appState.data, content: newContent } } });
            dispatch({ type: "setUi", ui: { itemSelector: null } });
            setTimeout(() => {
                dispatch({ type: "setUi", ui: { itemSelector: currentSelector } });
                console.log('[DEBUG AdminGioiThieu] Sidebar UI restored.');
            }, 100);
        } else {
            console.log('[DEBUG AdminGioiThieu] No itemSelector found, skipping UI remount hack.');
            dispatch({ type: "set", state: { data: { ...appState.data, content: newContent } } });
        }
    }, [dispatch, appState, id]);

    const handleUpdate = useCallback((editId, newUrl) => {
        const config = JSON.parse(editId);
        updateCardImage(config.cardIndex, config.type, newUrl, config.memberIndex);
    }, [updateCardImage]);

    const { containerRef, getEditProps } = useInlineImage({
        isEditing,
        onUpdate: handleUpdate
    });

    return (
        <section className="py-10 md:py-20 px-4" style={getBackgroundStyle(background)} ref={containerRef}>
            <style dangerouslySetInnerHTML={{
                __html: `
                [data-inline-image-id] {
                    pointer-events: auto !important;
                }
            `}} />
            <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
                {cards && cards.length > 0 && cards.map((card, index) => {
                    if (!card) return null;

                    return (
                        <div
                            key={index}
                            className="relative w-full md:w-[calc(50%-1rem)] max-w-137.5 h-162.5 p-8 pb-0 lg:pb-0 lg:p-10 shadow-xl overflow-hidden flex flex-col"
                            style={{
                                ...getBackgroundStyle(card.background),
                                borderRadius: getCustomRadius(card.radius)
                            }}
                        >
                            {card.title?.text && (
                                <h3
                                    className="shrink-0 font-extrabold uppercase mb-6 z-10 relative"
                                    style={{ color: card.title.color, fontSize: getResponsiveFontSize(card.title.size) }}
                                >
                                    {card.title.text}
                                </h3>
                            )}

                            {card.cardType === 'text' && (
                                <>
                                    <div className="flex-1 overflow-y-auto min-h-0 pr-3 wrap-break-word flex flex-col gap-3 z-10 relative">
                                        {card.textContents?.map((txt, i) => (
                                            <p
                                                key={i}
                                                className="leading-relaxed whitespace-pre-line"
                                                style={{ color: txt.color, fontSize: getResponsiveFontSize(txt.size), fontWeight: txt.weight === 'bold' ? '700' : '400' }}
                                            >
                                                {txt.content}
                                            </p>
                                        ))}
                                    </div>
                                    {card.imageLayout === 'two_corners' ? (
                                        <div className="shrink-0 w-[calc(100%+4rem)] lg:w-[calc(100%+5rem)] h-55 -mx-8 lg:-mx-10 mt-auto overflow-hidden relative z-0 flex justify-between pointer-events-none">
                                            <div className="absolute inset-0 bg-linear-to-t from-transparent to-white/20 z-10 pointer-events-none"></div>
                                            {card.bottomImage ? (
                                                <div 
                                                    className="w-[calc(50%-1rem)] h-full flex-shrink-0 relative pointer-events-auto"
                                                    {...getEditProps(JSON.stringify({ cardIndex: index, type: 'bottom' }))}
                                                >
                                                    <img src={card.bottomImage} alt="decor left" className="w-full h-full object-cover object-left pointer-events-none" />
                                                </div>
                                            ) : <div className="w-[calc(50%-1rem)] h-full flex-shrink-0"></div>}
                                            {card.bottomImage2 ? (
                                                <div 
                                                    className="w-[calc(50%-1rem)] h-full flex-shrink-0 relative pointer-events-auto"
                                                    {...getEditProps(JSON.stringify({ cardIndex: index, type: 'bottom2' }))}
                                                >
                                                    <img src={card.bottomImage2} alt="decor right" className="w-full h-full object-cover object-right pointer-events-none" />
                                                </div>
                                            ) : <div className="w-[calc(50%-1rem)] h-full flex-shrink-0"></div>}
                                        </div>
                                    ) : (
                                        card.bottomImage && (
                                            <div
                                                className={`shrink-0 w-[calc(100%+4rem)] lg:w-[calc(100%+5rem)] h-55 -mx-8 lg:-mx-10 mt-auto overflow-hidden relative z-0`}
                                                {...getEditProps(JSON.stringify({ cardIndex: index, type: 'bottom' }))}
                                            >
                                                <div className="absolute inset-0 bg-linear-to-t from-transparent to-white/20 z-10 pointer-events-none"></div>
                                                <img
                                                    src={card.bottomImage}
                                                    alt="decor"
                                                    className="w-full h-full object-cover block pointer-events-none"
                                                />
                                            </div>
                                        )
                                    )}
                                </>
                            )}

                            {card.cardType === 'people' && (
                                <PeopleBlock card={card} cardIndex={index} isEditing={isEditing} getEditProps={getEditProps} />
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default AdminGioiThieu;