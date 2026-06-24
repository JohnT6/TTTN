import { getBackgroundStyle, getButtonStyle, getCustomRadius, getTitleStyle } from './admin.styleUtils';

const AdminCacBan = ({ background = {}, title = {}, subtitle = {}, cards = [] }) => {
    return (
        <section className="py-10 md:py-14 px-4" style={getBackgroundStyle(background)}>
            <div className="max-w-7xl mx-auto text-center mb-10 md:mb-14">
                {title.text && (
                    <h2 className="font-bold mb-3 uppercase tracking-wide" style={getTitleStyle(title)}>
                        {title.text}
                    </h2>
                )}
                {subtitle.text && (
                    <p className="font-semibold uppercase tracking-wider opacity-90" style={{ color: subtitle.color, fontSize: subtitle.size }}>
                        {subtitle.text}
                    </p>
                )}
            </div>

            {cards && cards.length > 0 && (
                <div className="flex flex-wrap justify-center gap-6 max-w-275 mx-auto">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center p-8 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[320px] shadow-lg"
                            style={{
                                ...getBackgroundStyle(card.background),
                                borderRadius: getCustomRadius(card.radius)
                            }}
                        >
                            {card.iconType === 'svg' ? (
                                card.iconSvg && (
                                    <div
                                        className="w-14 h-14 mb-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                                        dangerouslySetInnerHTML={{ __html: card.iconSvg }}
                                    />
                                )
                            ) : (
                                card.iconUrl && (
                                    <img
                                        src={card.iconUrl}
                                        alt={card.title}
                                        className="w-14 h-14 object-contain mb-5"
                                        style={{ filter: 'brightness(0) invert(1)' }}
                                    />
                                )
                            )}
                            {card.title && (
                                <h3
                                    className="font-bold text-center mb-6 leading-tight"
                                    style={{ color: card.titleColor, fontSize: card.titleSize }}
                                >
                                    {card.title}
                                </h3>
                            )}
                            {card.button?.text && (
                                <button
                                    className="px-5 py-2 transition-opacity hover:opacity-80 flex items-center justify-center cursor-pointer"
                                    style={getButtonStyle(card.button)}
                                >
                                    {card.button.text}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

        </section>
    );
};

export default AdminCacBan;