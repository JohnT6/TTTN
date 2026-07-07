import React from 'react';
import { getBackgroundStyle, getTextStyle } from './admin.styleUtils';

const AdminBreadcrumbHexagon = ({
    sectionId = '',
    background,
    separator = '/',
    separatorConfig,
    activeConfig,
    inactiveConfig,
    hoverColor = '#F59E0B',
    items = []
}) => {
    return (
        <section id={sectionId || undefined} className="py-4 md:py-6" style={getBackgroundStyle(background)}>
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <nav aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 md:space-x-3 flex-wrap">
                        {items && items.map((item, index) => {
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

export default AdminBreadcrumbHexagon;
