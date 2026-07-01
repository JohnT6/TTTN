import React from 'react';
import { getBackgroundStyle, getTitleStyle, getTextStyle } from './admin.styleUtils';
import { usePuck } from '@puckeditor/core';

const AdminFooter = ({ 
    background = {}, 
    logo = {}, 
    contact = {}, 
    columns = [], 
    bottomBar = {} 
}) => {
    let isEditing = false;
    try {
        const puckContext = usePuck();
        if (puckContext?.appState?.ui?.isEditing) {
            isEditing = true;
        }
    } catch (e) {
        // Not in Puck context
    }

    return (
        <footer className="relative w-full overflow-hidden text-sm" style={{ ...getBackgroundStyle(background), minHeight: '400px' }}>
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 py-10 md:py-16">
                <div className="flex flex-col md:flex-row flex-wrap gap-8 md:gap-12 w-full justify-between">
                    
                    {/* Left Column: Logo & Contact */}
                    <div className="flex-1 min-w-[280px] flex flex-col gap-10">
                        {/* Logo */}
                        {logo && (
                            <a 
                                href={logo.url || '/'} 
                                onClick={(e) => { if (isEditing) e.preventDefault(); }}
                                className="flex items-center gap-4 hover:opacity-90 transition-opacity"
                            >
                                {logo.imageUrl && (
                                    <img src={logo.imageUrl} alt="Footer Logo" className="w-[80px] object-contain" />
                                )}
                                {logo.type === 'logo_text' && (
                                    <div className="flex flex-col">
                                        <span className="uppercase" style={logo.textConfig ? getTextStyle(logo.textConfig) : { color: logo.textColor, fontWeight: 'bold', fontSize: '16px' }}>
                                            {logo.text1}
                                        </span>
                                        <span className="mt-1" style={logo.textConfig ? getTextStyle(logo.textConfig) : { color: logo.textColor, fontWeight: '600', fontSize: '12px' }}>
                                            {logo.text2}
                                        </span>
                                    </div>
                                )}
                            </a>
                        )}

                        {/* Contact Info */}
                        {contact && (
                            <div className="flex flex-col gap-4 text-[#0368B0]" style={{ color: contact.textColor }}>
                                {contact.title && (
                                    <h3 className="uppercase mb-2" style={contact.titleConfig ? getTextStyle(contact.titleConfig) : { fontWeight: 'bold' }}>{contact.title}</h3>
                                )}
                                
                                {contact.address && (
                                    <div className="flex items-start gap-3" style={contact.textConfig ? getTextStyle(contact.textConfig) : {}}>
                                        <div className="mt-1 flex-shrink-0 flex items-center justify-center w-5 h-5 bg-white rounded-full text-[#0368B0]">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                                <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="leading-relaxed">{contact.address}</span>
                                    </div>
                                )}

                                {contact.email && (
                                    <div className="flex items-center gap-3" style={contact.textConfig ? getTextStyle(contact.textConfig) : {}}>
                                        <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 bg-white rounded-full text-[#0368B0]">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                                <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                                                <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                                            </svg>
                                        </div>
                                        <span>Email: <a href={`mailto:${contact.email}`} onClick={(e) => { if (isEditing) e.preventDefault(); }} className="hover:text-[#e91e8c] hover:underline transition-colors">{contact.email}</a></span>
                                    </div>
                                )}

                                {contact.phone && (
                                    <div className="flex items-center gap-3" style={contact.textConfig ? getTextStyle(contact.textConfig) : {}}>
                                        <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 bg-white rounded-full text-[#0368B0]">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span>Hotline: <a href={`tel:${contact.phone}`} onClick={(e) => { if (isEditing) e.preventDefault(); }} className="hover:text-[#e91e8c] hover:underline transition-colors">{contact.phone}</a></span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Columns: Links */}
                    {columns && columns.map((col, idx) => (
                        <div key={idx} className="flex-1 min-w-[180px] flex flex-col">
                            {col.title && (
                                <h3 className="mb-4 lg:mb-6" style={col.titleConfig ? getTextStyle(col.titleConfig) : { fontWeight: 'bold' }}>{col.title}</h3>
                            )}
                            {col.links && col.links.length > 0 && (
                                    <ul className="flex flex-col gap-3 lg:gap-4">
                                        {col.links.map((link, linkIdx) => (
                                            <li key={linkIdx} style={col.linkConfig ? getTextStyle(col.linkConfig) : {}}>
                                                <a 
                                                    href={link.url || '#'} 
                                                    onClick={(e) => { if (isEditing) e.preventDefault(); }}
                                                    className="hover:text-[#e91e8c] transition-colors"
                                                >
                                                    {link.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                        </div>
                    ))}

                </div>

                {/* Bottom Bar */}
                {bottomBar && (
                    <div className="mt-16 pt-6 border-t border-white/40 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-white" style={bottomBar.copyrightConfig ? getTextStyle(bottomBar.copyrightConfig) : { fontSize: '14px', fontWeight: '500' }}>
                            {bottomBar.copyright}
                        </p>
                        
                        {bottomBar.socials && bottomBar.socials.length > 0 && (
                            <div className="flex items-center gap-3">
                                {bottomBar.socials.map((social, idx) => (
                                    <a 
                                        key={idx}
                                        href={social.url || '#'}
                                        onClick={(e) => { if (isEditing) e.preventDefault(); }}
                                        className="flex items-center justify-center hover:-translate-y-1 transition-transform"
                                        aria-label={social.alt || `social-${idx}`}
                                    >
                                        <img src={social.iconUrl} alt={social.alt || "social"} className="w-6 h-6 object-contain" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </footer>
    );
};

export default AdminFooter;
