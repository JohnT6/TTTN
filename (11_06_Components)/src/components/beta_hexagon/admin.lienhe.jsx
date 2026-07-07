import React from 'react';
import { getTextStyle, getBackgroundStyle } from '../metik/admin.styleUtils';

const getCustomRadius = (radiusObj) => {
    if (!radiusObj) return '0px';
    if (radiusObj.type === 'custom') {
        return `${radiusObj.tl || '0px'} ${radiusObj.tr || '0px'} ${radiusObj.br || '0px'} ${radiusObj.bl || '0px'}`;
    }
    return radiusObj.all || '0px';
};

const AdminLienHeHexagon = ({
    
    sectionId = '',
    layoutMode = 'text_map',
    mapLayout = 'text_left',
    background,
    iframeCode,
    mapRadius,
    title,
    titleConfig,
    description,
    descriptionConfig,
    contactItems = [],
    socialItems = []
}) => {
    
    // Hàm render bản đồ
    const renderMap = () => (
        <div 
            className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gray-100 flex items-center justify-center shadow-md overflow-hidden relative"
            style={{ borderRadius: getCustomRadius(mapRadius) }}
        >
            {iframeCode ? (
                <div 
                    className="absolute inset-0 w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                    dangerouslySetInnerHTML={{ __html: iframeCode }}
                />
            ) : (
                <span className="text-gray-500 font-medium px-4 text-center">Chưa cung cấp mã nhúng (Iframe) Bản đồ</span>
            )}
        </div>
    );

    if (layoutMode === 'full_map') {
        return (
            <section id={sectionId || undefined} className="w-full">
                <div className="w-full">
                    {renderMap()}
                </div>
            </section>
        );
    }

    // Chế độ Chữ + Bản đồ
    const isTextLeft = mapLayout === 'text_left';

    return (
        <section className="py-10 md:py-16" style={getBackgroundStyle(background)}>
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className={`flex flex-col ${isTextLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center`}>
                    
                    {/* Cột Chữ */}
                    <div className="w-full lg:w-5/12 space-y-8">
                        {/* Tiêu đề & Mô tả */}
                        <div>
                            <h2 
                                className="text-3xl md:text-4xl font-bold mb-4"
                                style={getTextStyle(titleConfig)}
                            >
                                {title}
                            </h2>
                            <div 
                                className="text-gray-600 leading-relaxed ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                                style={getTextStyle(descriptionConfig)}
                            >
                                {description}
                            </div>
                        </div>

                        {/* Thông tin liên hệ */}
                        {contactItems && contactItems.length > 0 && (
                            <div className="space-y-6">
                                {contactItems.map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div 
                                            className="flex-shrink-0 w-10 h-10 flex items-center justify-center border"
                                            style={{
                                                backgroundColor: item.iconStyle?.bgColor || '#e0f2f1',
                                                borderColor: item.iconStyle?.borderColor || 'transparent',
                                                borderRadius: getCustomRadius(item.iconStyle?.radius),
                                                color: item.iconStyle?.color || '#00695c',
                                                borderWidth: item.iconStyle?.borderWidth || '1px'
                                            }}
                                            dangerouslySetInnerHTML={{ __html: item.iconSvg || '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>' }}
                                        />
                                        <div>
                                            <h4 
                                                className="font-bold mb-1"
                                                style={getTextStyle(item.titleConfig)}
                                            >
                                                {item.title}
                                            </h4>
                                            <div 
                                                className="text-gray-600 text-sm md:text-base ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                                                style={getTextStyle(item.contentConfig)}
                                            >
                                                {item.content}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Mạng xã hội */}
                        {socialItems && socialItems.length > 0 && (
                            <div className="flex flex-wrap gap-3 pt-4">
                                {socialItems.map((soc, j) => (
                                    <a 
                                        key={j}
                                        href={soc.url || '#'}
                                        className="px-4 py-1.5 bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 font-bold rounded-lg transition-all duration-300 border border-teal-500/30 hover:border-teal-500/50 text-sm shadow-sm flex items-center gap-2"
                                        style={{
                                            borderRadius: getCustomRadius(soc.buttonStyle?.radius),
                                            borderWidth: soc.buttonStyle?.borderWidth || '1px'
                                        }}
                                    >
                                        {soc.iconSvg && (
                                            <span 
                                                className="w-4 h-4 flex items-center justify-center"
                                                dangerouslySetInnerHTML={{ __html: soc.iconSvg }}
                                            />
                                        )}
                                        {soc.label}
                                    </a>
                                ))}
                            </div>
                        )}

                    </div>

                    {/* Cột Bản đồ */}
                    <div className="w-full lg:w-7/12">
                        {renderMap()}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AdminLienHeHexagon;
