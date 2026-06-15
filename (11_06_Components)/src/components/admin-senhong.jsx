import { getBackgroundStyle, getButtonStyle, getCustomRadius, getTitleStyle } from './admin.styleUtils';

const AdminSenHong = ({ background = {}, align, blockRadius = {}, eyebrow = {}, title = {}, description = {}, button = {} }) => {
    const alignFlex = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';

    const btnJustify = button.align === 'left' ? 'justify-start' : button.align === 'right' ? 'justify-end' : 'justify-center';

    return (
        <section className="relative py-32 px-14 overflow-hidden" style={getBackgroundStyle(background)}>
            <div className={`relative w-full flex ${alignFlex}`}>
                <div
                    className="bg-white/10 backdrop-blur-none border border-white/10 p-6 md:p-8 shadow-2xl"
                    style={{ borderRadius: getCustomRadius(blockRadius) }}
                >
                    {eyebrow.text && <p
                        className="font-bold tracking-widest uppercase mb-3 opacity-90"
                        style={{ color: eyebrow.color, fontSize: eyebrow.size }}
                    >
                        {eyebrow.text}
                    </p>}

                    {title.text && <h2
                        className="font-extrabold mb-3 leading-tight drop-shadow-md"
                        style={getTitleStyle(title)}
                    >
                        {title.text}
                    </h2>}

                    {description.text && <p
                        className="mb-8 leading-relaxed opacity-95 w-118"
                        style={{ color: description.color, fontSize: description.size }}
                    >
                        {description.text}
                    </p>}

                    {button.text &&
                        <div className={`flex w-full ${btnJustify}`}>
                            <a
                                href="#"
                                className={`inline-flex items-center justify-center px-8 py-3.5 font-bold transition-all shadow-lg hover:[background:var(--btn-hover)]!`}
                                style={{
                                    ...getButtonStyle(button),
                                    '--btn-hover': button.background?.hoverColor || '#1e40af'
                                }}
                            >
                                {button.text}
                            </a>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default AdminSenHong;