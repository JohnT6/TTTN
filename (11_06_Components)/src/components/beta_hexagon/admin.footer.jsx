import React from 'react';
import { getBackgroundStyle, getTextStyle } from '../admin.styleUtils';

const AdminFooterHexagon = ({
    
    sectionId = '',
    background,
    copyrightText,
    copyrightConfig
}) => {
    return (
        <footer id={sectionId || undefined} 
            className="py-6 w-full text-center border-t border-white/10"
            style={getBackgroundStyle(background || { type: 'color', color: '#1A6B49' })}
        >
            <div className="container max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
                <p 
                    className="leading-relaxed opacity-90"
                    style={getTextStyle(copyrightConfig || { color: '#ffffff', size: '14px', weight: 'normal' })}
                >
                    {copyrightText || 'Copyright 2026 © Hexagon Corporation. All rights reserved.'}
                </p>
            </div>
        </footer>
    );
};

export default AdminFooterHexagon;
