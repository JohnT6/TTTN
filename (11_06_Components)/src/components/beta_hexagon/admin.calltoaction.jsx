import React from 'react';
import { getBackgroundStyle, getTextStyle, getTitleStyle, getButtonStyle } from './admin.styleUtils';

const AdminCallToActionGiaiPhap = ({
    sectionId = '',
    background,
    title = 'Sẵn sàng triển khai?',
    titleConfig,
    description = 'Đừng để công nghệ làm rào cản. Hãy biến nó thành lợi thế cạnh tranh của bạn cùng Hexagon.',
    descConfig,
    buttonsConfig,
    buttons = []
}) => {
    return (
        <section id={sectionId || undefined} className="py-12 md:py-20 lg:py-24 max-w-[1400px] mx-auto px-4 md:px-8">
            <div 
                className="rounded-2xl p-8 md:p-16 text-center border border-white/10 backdrop-blur-sm"
                style={getBackgroundStyle(background)}
            >
                <h2 
                    className="text-3xl md:text-4xl font-bold mb-6"
                    style={getTitleStyle(titleConfig)}
                >
                    {title}
                </h2>
                <p 
                    className="mb-10 max-w-2xl mx-auto text-lg leading-relaxed"
                    style={getTextStyle(descConfig)}
                >
                    {description}
                </p>
                
                {buttons && buttons.length > 0 && (
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        {buttons.map((btn, index) => {
                            const btnCfg = btn.btnConfig || buttonsConfig || {};
                            return (
                                <a 
                                    key={index} 
                                    href={btn.url || '#'}
                                    className={`inline-flex items-center justify-center px-10 py-3.5 font-medium transition-all duration-300 shadow-lg backdrop-blur-sm ${btnCfg.customClass || ''}`}
                                    style={getButtonStyle({
                                        textColor: '#ffffff',
                                        background: { color: '#eab308' },
                                        border: { width: '0px', style: 'none', color: 'transparent' },
                                        radius: { type: 'all', all: '8px' },
                                        ...btnCfg
                                    })}
                                    onMouseEnter={(e) => {
                                        if (btnCfg.hoverBackground) {
                                            if(btnCfg.hoverBackground.type === 'color') e.target.style.backgroundColor = btnCfg.hoverBackground.color;
                                        }
                                        if (btnCfg.hoverTextColor) {
                                            e.target.style.color = btnCfg.hoverTextColor;
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        const originalStyle = getButtonStyle({
                                            textColor: '#ffffff',
                                            background: { color: '#eab308' },
                                            border: { width: '0px', style: 'none', color: 'transparent' },
                                            radius: { type: 'all', all: '8px' },
                                            ...btnCfg
                                        });
                                        e.target.style.background = originalStyle.background || '';
                                        e.target.style.backgroundColor = originalStyle.backgroundColor || '';
                                        e.target.style.color = originalStyle.color || '';
                                    }}
                                >
                                    {btn.label}
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdminCallToActionGiaiPhap;
