import React from 'react';
import { getBackgroundStyle, getTextStyle, getTitleStyle } from './admin.styleUtils';

const AdminGiaiPhapNoiBat = ({
    sectionId = '',
    background,
    title = 'Giải pháp nổi bật',
    titleConfig,
    subtitle = '',
    subtitleConfig,
    items = []
}) => {
    return (
        <section id={sectionId || undefined} className="py-12 md:py-20 lg:py-24" style={getBackgroundStyle(background)}>
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <h2 
                        className="text-3xl lg:text-4xl font-bold mb-3"
                        style={getTitleStyle(titleConfig)}
                    >
                        {title}
                    </h2>
                    <div className="w-12 h-1 bg-[#f59e0b] mx-auto mt-2"></div>
                    {subtitle && (
                        <p 
                            className="mt-6 max-w-2xl mx-auto"
                            style={getTextStyle(subtitleConfig)}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items && items.map((item, index) => (
                        <div key={index} className="bg-white border border-gray-100 shadow-sm rounded-xl p-8 transition-all hover:shadow-md hover:border-[#f59e0b]/40 group">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-colors" style={getBackgroundStyle(item.iconBackground || { type: 'color', color: '#ecfdf5' })}>
                                {item.iconType === 'svg' && item.iconSvg ? (
                                    <div 
                                        className="w-6 h-6 flex items-center justify-center" 
                                        style={{ color: item.iconColor || '#059669' }}
                                        dangerouslySetInnerHTML={{ __html: item.iconSvg }} 
                                    />
                                ) : item.iconImage ? (
                                    <img src={item.iconImage} alt={item.title} className="w-6 h-6 object-contain" />
                                ) : (
                                    <svg className="w-6 h-6 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                )}
                            </div>
                            <h4 
                                className="text-xl font-bold mb-3"
                                style={getTextStyle(item.titleConfig)}
                            >
                                {item.title}
                            </h4>
                            <div 
                                className="text-[15px] leading-relaxed text-gray-600 ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                                style={getTextStyle(item.descConfig)}
                            >
                                {item.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdminGiaiPhapNoiBat;
