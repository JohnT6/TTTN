import React from 'react';
import { getBackgroundStyle, getTextStyle, getTitleStyle, getButtonStyle } from './admin.styleUtils';

const AdminGiaiPhapCongNghe = ({
    sectionId = '',
    background,
    
    // Layout
    layoutOptions = 'textLeft',
    
    // Content
    title = 'Giải pháp công nghệ',
    titleConfig,
    descriptions = [
        { text: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.' }
    ],
    descConfig,
    
    // Buttons
    buttons = [],
    
    // Image
    imageUrl = 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg'
}) => {
    return (
        <section id={sectionId || undefined} className="py-12 md:py-20 lg:py-24" style={getBackgroundStyle(background)}>
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className={`grid md:grid-cols-2 gap-12 items-center`}>
                    <div className={`text-left ${layoutOptions === 'imageLeft' ? 'md:order-2' : 'md:order-1'}`}>
                        <h1 
                            className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                            style={getTitleStyle(titleConfig)}
                        >
                            {title}
                        </h1>
                        <div className="mb-10 space-y-4">
                            {descriptions && descriptions.map((desc, index) => (
                                <div 
                                    key={index}
                                    className="max-w-xl text-base leading-relaxed text-gray-600 ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                                    style={getTextStyle(descConfig)}
                                >
                                    {desc.text}
                                </div>
                            ))}
                        </div>
                        
                        {buttons && buttons.length > 0 && (
                            <div className="flex flex-col sm:flex-row gap-4">
                                {buttons.map((btn, index) => (
                                    <a 
                                        key={index}
                                        href={btn.url || '#'}
                                        className="px-8 py-3.5 transition-all text-center inline-block"
                                        style={getButtonStyle(btn.config)}
                                        onMouseEnter={(e) => {
                                            if (btn.config?.hoverBackground?.color) {
                                                e.target.style.backgroundColor = btn.config.hoverBackground.color;
                                            }
                                            if (btn.config?.hoverTextColor) {
                                                e.target.style.color = btn.config.hoverTextColor;
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.background = getButtonStyle(btn.config).background;
                                            e.target.style.backgroundColor = getButtonStyle(btn.config).backgroundColor;
                                            e.target.style.color = getButtonStyle(btn.config).color;
                                        }}
                                    >
                                        {btn.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div className={`relative max-w-[600px] mx-auto w-full ${layoutOptions === 'imageLeft' ? 'md:order-1' : 'md:order-2'}`}>
                        {imageUrl && (
                            <div className="rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-500 aspect-[16/9]">
                                <img src={imageUrl} alt={title} className="w-full h-full object-cover"/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminGiaiPhapCongNghe;
