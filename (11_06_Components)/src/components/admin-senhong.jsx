import { getBackgroundStyle, getButtonStyle, getCustomRadius, getTitleStyle, getTextStyle } from './admin.styleUtils';

const AdminSenHong = ({ background = {}, align, blockRadius = {}, eyebrow = {}, title = {}, description = {}, button = {} }) => {
    const alignFlex = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';

    const btnJustify = button.align === 'left' ? 'justify-start' : button.align === 'right' ? 'justify-end' : 'justify-center';

    return (
        <section 
            className="relative w-full overflow-hidden flex items-center min-h-[500px] md:min-h-[700px] py-12 md:py-20 px-4 md:px-14" 
            style={getBackgroundStyle(background)}
        >
            <div className={`relative w-full flex ${alignFlex} max-w-7xl mx-auto z-10`}>
                <div
                    className="inline-flex flex-col justify-start items-center gap-5 sm:gap-8 w-full max-w-[620px] p-6 sm:p-8 md:p-12"
                    style={{ 
                        borderRadius: getCustomRadius(blockRadius),
                        background: 'rgba(255, 255, 255, 0.19)',
                        outline: '1px solid rgba(255, 255, 255, 0.32)',
                        outlineOffset: '-1px',
                        backdropFilter: 'blur(9px)',
                        WebkitBackdropFilter: 'blur(9px)',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)'
                    }}
                >
                    {eyebrow.text && <p
                        className="font-medium tracking-[0.12em] uppercase mb-0 w-full text-left"
                        style={getTextStyle(eyebrow)}
                    >
                        {eyebrow.text}
                    </p>}

                    {title.text && <h2
                        className="font-extrabold mb-0 leading-[1.1] w-full text-left"
                        style={getTitleStyle(title)}
                    >
                        {title.text}
                    </h2>}

                    {description.text && <p
                        className="mb-0 leading-[1.7] opacity-80 w-full text-left"
                        style={getTextStyle(description)}
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