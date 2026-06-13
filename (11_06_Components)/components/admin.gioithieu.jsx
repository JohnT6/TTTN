import { useState } from 'react';
import { getBackgroundStyle, getCustomRadius } from './admin.styleUtils';

const PeopleBlock = ({ card }) => {
    const [page, setPage] = useState(0);

    const members = (card.members || []).filter(m => m.val1 || m.val2 || m.val3 || m.val4 || m.avatar);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(members.length / itemsPerPage);

    const currentMembers = members.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);

    const handleNext = () => setPage((p) => (p + 1) % totalPages);
    const handlePrev = () => setPage((p) => (p - 1 + totalPages) % totalPages);

    const lblConfig = card.memberLabels || {};

    return (
        <div className="flex flex-col h-full relative z-10 min-h-0">
            {card.introText?.text && (
                <p className="mb-4 shrink-0" style={{ color: card.introText.color, fontSize: card.introText.size }}>
                    {card.introText.text}
                </p>
            )}

            <div className="flex-1 flex flex-col gap-4 min-h-0">
                {currentMembers.map((member, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-5 bg-gray-50/50 p-3 rounded-xl border border-gray-100/50 hover:bg-gray-50 transition-colors shrink-0">
                        <img
                            src={member.avatar?.trim() || 'https://i.pravatar.cc/150?u=1'}
                            alt={member.val1 || 'avatar'}
                            className="w-16 h-16 rounded-full object-cover shadow-sm shrink-0 border-2 border-white bg-white"
                        />
                        <div style={{ fontSize: lblConfig.textSize || '13px', lineHeight: '1.6' }}>
                            {lblConfig.lbl1 && member.val1 && <p><span className="font-bold" style={{ color: lblConfig.labelColor }}>{lblConfig.lbl1}</span> <span style={{ color: lblConfig.valueColor }}>{member.val1}</span></p>}
                            {lblConfig.lbl2 && member.val2 && <p><span className="font-bold" style={{ color: lblConfig.labelColor }}>{lblConfig.lbl2}</span> <span style={{ color: lblConfig.valueColor }}>{member.val2}</span></p>}
                            {lblConfig.lbl3 && member.val3 && <p><span className="font-bold" style={{ color: lblConfig.labelColor }}>{lblConfig.lbl3}</span> <span style={{ color: lblConfig.valueColor }}>{member.val3}</span></p>}
                            {lblConfig.lbl4 && member.val4 && <p><span className="font-bold" style={{ color: lblConfig.labelColor }}>{lblConfig.lbl4}</span> <span style={{ color: lblConfig.valueColor }}>{member.val4}</span></p>}
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="shrink-0 flex items-center justify-center gap-3 mt-4 pt-2">
                    <button onClick={handlePrev} type="button" className="w-8 h-8 flex items-center justify-center bg-[#e0f2fe] text-[#0369a1] rounded hover:bg-[#bae6fd] transition-colors font-bold select-none cursor-pointer">‹</button>
                    <div className="flex gap-1.5 items-center">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <span
                                key={i}
                                onClick={() => setPage(i)}
                                className={`h-1.5 rounded-full transition-all cursor-pointer ${i === page ? 'w-6 bg-[#1e3a8a]' : 'w-1.5 bg-gray-300 hover:bg-gray-400'}`}
                            ></span>
                        ))}
                    </div>
                    <button onClick={handleNext} type="button" className="w-8 h-8 flex items-center justify-center bg-[#e0f2fe] text-[#0369a1] rounded hover:bg-[#bae6fd] transition-colors font-bold select-none cursor-pointer">›</button>
                </div>
            )}
        </div>
    );
};

const AdminGioiThieu = ({ background = {}, cards = [] }) => {
    return (
        <section className="py-20 px-4" style={getBackgroundStyle(background)}>
            <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
                {cards && cards.length > 0 && cards.map((card, index) => {
                    if (!card) return null;

                    return (
                        <div
                            key={index}
                            className="relative w-full md:w-[calc(50%-1rem)] max-w-137.5 h-162.5 p-8 lg:p-10 shadow-xl overflow-hidden flex flex-col"
                            style={{
                                ...getBackgroundStyle(card.background),
                                borderRadius: getCustomRadius(card.radius)
                            }}
                        >
                            {card.title?.text && (
                                <h3
                                    className="shrink-0 font-extrabold uppercase mb-6 z-10 relative"
                                    style={{ color: card.title.color, fontSize: card.title.size }}
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
                                                style={{ color: txt.color, fontSize: txt.size, fontWeight: txt.weight === 'bold' ? '700' : '400' }}
                                            >
                                                {txt.content}
                                            </p>
                                        ))}
                                    </div>
                                    {card.bottomImage && (
                                        <div className="shrink-0 w-[calc(100%+4rem)] lg:w-[calc(100%+5rem)] h-55 -mx-8 lg:-mx-10 mt-6 overflow-hidden relative z-0">
                                            <div className="absolute inset-0 bg-linear-to-t from-transparent to-white/20 z-10"></div>
                                            <img
                                                src={card.bottomImage}
                                                alt="decor"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </>
                            )}

                            {card.cardType === 'people' && (
                                <PeopleBlock card={card} />
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default AdminGioiThieu;