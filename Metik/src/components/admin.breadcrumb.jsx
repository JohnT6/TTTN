import React from 'react';

const getBackgroundStyle = (bg) => {
    if (!bg) return {};
    if (bg.type === 'color') return { backgroundColor: bg.color || '#ffffff' };
    if (bg.type === 'gradient') return { background: `linear-gradient(${bg.gradientDirection || 'to right'}, ${bg.gradientFrom || '#ffffff'}, ${bg.gradientTo || '#000000'})` };
    if (bg.type === 'image') return { backgroundImage: `url(${bg.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    if (bg.type === 'image_gradient') return { background: `linear-gradient(${bg.gradientDirection || 'to right'}, ${bg.gradientFrom || 'rgba(0,0,0,0.5)'}, ${bg.gradientTo || 'rgba(0,0,0,0.5)'}), url(${bg.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    if (bg.type === 'image_color') return { background: `linear-gradient(to right, ${bg.color || 'rgba(255,255,255,0.8)'}, ${bg.color || 'rgba(255,255,255,0.8)'}), url(${bg.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    return {};
};

const getTextStyle = (config) => {
    if (!config) return {};
    return {
        color: config.color,
        fontSize: config.size,
        fontWeight: config.weight !== 'normal' ? config.weight : undefined,
        fontStyle: config.style === 'italic' ? 'italic' : 'normal',
        textDecoration: config.decoration !== 'none' ? config.decoration : undefined,
    };
};

const AdminBreadcrumbMetik = ({
    background,
    separator = '/',
    separatorConfig,
    activeConfig,
    inactiveConfig,
    hoverColor = '#2e7d32',
    items = []
}) => {
    return (
        <section className="py-4 md:py-6" style={getBackgroundStyle(background)}>
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <nav aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 md:space-x-3 flex-wrap">
                        {items.map((item, index) => {
                            const isLast = index === items.length - 1;
                            const isActive = item.isActive === 'true';
                            
                            const currentConfig = isActive ? activeConfig : inactiveConfig;

                            return (
                                <li key={index} className="flex items-center">
                                    {isActive ? (
                                        // Mục Active (không có link)
                                        <span 
                                            className="uppercase transition-colors duration-300 font-bold"
                                            style={getTextStyle(currentConfig)}
                                        >
                                            {item.label}
                                        </span>
                                    ) : (
                                        // Mục Inactive (có link)
                                        <a 
                                            href={item.url || '#'} 
                                            className="uppercase transition-colors duration-300 cursor-pointer"
                                            style={{
                                                ...getTextStyle(currentConfig)
                                            }}
                                            onMouseEnter={(e) => {
                                                if (hoverColor) e.target.style.color = hoverColor;
                                            }}
                                            onMouseLeave={(e) => {
                                                if (currentConfig?.color) e.target.style.color = currentConfig.color;
                                            }}
                                        >
                                            {item.label}
                                        </a>
                                    )}

                                    {/* Separator */}
                                    {!isLast && (
                                        <span 
                                            className="mx-2 md:mx-3"
                                            style={getTextStyle(separatorConfig)}
                                        >
                                            {separator}
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>
        </section>
    );
};

export default AdminBreadcrumbMetik;
