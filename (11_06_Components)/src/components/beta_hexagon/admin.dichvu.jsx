import React from 'react';

const AdminDichVuHexagon = ({ 
    
    sectionId = '',
    background, 
    title, 
    titleConfig,
    description,
    descriptionConfig,
    serviceTitleConfig,
    serviceDescConfig,
    serviceLinkConfig,
    services = [],
    id
}) => {
    
    // Helpers
    const getBackgroundStyle = (bgData) => {
        if (!bgData) return { backgroundColor: '#f8fafc' };
        if (bgData.type === 'color') {
            return { backgroundColor: bgData.color };
        }
        if (bgData.type === 'image' || bgData.type === 'image_color') {
            return { 
                backgroundImage: `url('${bgData.imageUrl}')`,
                backgroundSize: bgData.backgroundSize || 'cover',
                backgroundPosition: bgData.backgroundPosition || 'center',
                backgroundColor: bgData.type === 'image_color' ? bgData.color : 'transparent'
            };
        }
        if (bgData.type === 'gradient') {
            return { background: bgData.gradient };
        }
        return { backgroundColor: '#f8fafc' };
    };

    const getTitleStyle = (config) => {
        if (!config) return {};
        return {
            color: config.color || '#000000',
            fontSize: config.size || '36px',
            fontWeight: config.weight === 'normal' ? 'normal' : 'bold',
            fontStyle: config.style === 'italic' ? 'italic' : 'normal',
            textDecoration: config.decoration && config.decoration !== 'none' ? config.decoration : 'none',
        };
    };

    const getTextStyle = (config) => {
        if (!config) return {};
        return {
            color: config.color || '#374151',
            fontSize: config.size || '16px',
            fontWeight: config.weight === 'bold' ? 'bold' : 'normal',
            fontStyle: config.style === 'italic' ? 'italic' : 'normal',
            textDecoration: config.decoration && config.decoration !== 'none' ? config.decoration : 'none',
        };
    };

    return (
        <section id={sectionId || undefined} 
            className="py-16 lg:py-24"
            style={getBackgroundStyle(background || { type: 'color', color: '#f8fafc' })}
        >
            <div className="container max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                
                {/* Header */}
                <div className="text-center mb-10">
                    {title && (
                        <h2 
                            className="leading-tight mb-4"
                            style={getTitleStyle(titleConfig || { color: '#000000', size: '36px', weight: 'bold' })}
                        >
                            {title}
                        </h2>
                    )}
                    {description && (
                        <div 
                            className="leading-relaxed px-4 max-w-3xl mx-auto ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                            style={getTextStyle(descriptionConfig || { color: '#374151', size: '16px' })}
                        >
                            {description}
                        </div>
                    )}
                </div>

                {/* Services Grid */}
                {services && services.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {services.map((service, idx) => (
                            <div 
                                key={idx}
                                className="group relative rounded-xl shadow-md hover:shadow-xl min-h-[400px] w-full flex flex-col overflow-hidden cursor-pointer"
                            >
                                {/* Normal Background Layer */}
                                <div 
                                    className="absolute inset-0 z-0 transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                                    style={getBackgroundStyle(service.background || { type: 'color', color: '#ffffff' })}
                                ></div>

                                {/* Hover Background Layer */}
                                <div 
                                    className="absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                                    style={getBackgroundStyle(service.hoverBackground || service.background || { type: 'color', color: '#ffffff' })}
                                ></div>

                                {/* Content Area */}
                                <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full items-start text-left">
                                    <h3 
                                        className="mb-4"
                                        style={getTitleStyle(service.titleConfig || serviceTitleConfig || { color: '#ffffff', size: '18px', weight: 'bold' })}
                                    >
                                        {service.title}
                                    </h3>

                                    <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out flex-grow flex flex-col w-full">
                                        {service.description && (
                                            <div 
                                                className="leading-relaxed ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                                                style={getTextStyle(service.descriptionConfig || serviceDescConfig || { color: '#ffffff', size: '14px' })}
                                            >
                                                {service.description}
                                            </div>
                                        )}
                                        
                                        {(service.linkLabel || service.linkUrl) && (
                                            <div className="mt-4 w-full text-left">
                                                <a 
                                                    href={service.linkUrl || '#'}
                                                    className="inline-flex items-center gap-1 transition-colors hover:gap-2"
                                                    style={getTextStyle(service.linkConfig || serviceLinkConfig || { color: '#ffffff', size: '14px', weight: '600' })}
                                                >
                                                    {service.linkLabel || 'Xem chi tiết →'}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center py-16">
                        <span className="text-gray-400 italic">Chưa có dữ liệu dịch vụ...</span>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdminDichVuHexagon;
