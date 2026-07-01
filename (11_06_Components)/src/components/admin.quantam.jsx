import React from 'react';
import { getBackgroundStyle, getTitleStyle, getTextStyle, getCustomRadius } from './admin.styleUtils';
import { usePuck } from '@puckeditor/core';

const AdminQuanTam = ({ 
    background = {}, 
    title = {}, 
    email = {}, 
    phone = {}, 
    button = {} 
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
        <section className="relative py-12 md:py-24 px-4 w-full overflow-hidden flex flex-col items-center justify-center text-center" style={{ ...getBackgroundStyle(background), minHeight: '500px' }}>
            <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-10">
                
                {/* Title */}
                {title?.text && (
                    <h2 
                        className="uppercase whitespace-pre-wrap max-w-3xl"
                        style={getTitleStyle(title)}
                    >
                        {title.text}
                    </h2>
                )}

                {/* Contact Pills */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full mt-4">
                    
                    {/* Email Pill */}
                    {(email?.text || email?.url) && (
                        <a 
                            href={email.url || `mailto:${email.text}`}
                            onClick={(e) => { if (isEditing) e.preventDefault(); }}
                            className="flex items-center bg-white h-14 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 min-w-[240px] group"
                            style={{ borderRadius: getCustomRadius(email.radius || { tl: '9999px', tr: '9999px', br: '9999px', bl: '9999px' }) }}
                        >
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 text-gray-400 group-hover:text-[#0368B0] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                            </span>
                            <div className="w-[1px] h-6 bg-gray-200 mx-4"></div>
                            <span className="font-semibold text-sm sm:text-base text-[#0368B0] whitespace-nowrap" style={email.textConfig ? getTextStyle(email.textConfig) : {}}>
                                {email.text}
                            </span>
                        </a>
                    )}

                    {/* Phone Pill */}
                    {(phone?.text || phone?.url) && (
                        <a 
                            href={phone.url || `tel:${phone.text}`}
                            onClick={(e) => { if (isEditing) e.preventDefault(); }}
                            className="flex items-center bg-white h-14 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 min-w-[240px] group"
                            style={{ borderRadius: getCustomRadius(phone.radius || { tl: '9999px', tr: '9999px', br: '9999px', bl: '9999px' }) }}
                        >
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 text-pink-500 group-hover:text-pink-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                            </span>
                            <div className="w-[1px] h-6 bg-gray-200 mx-4"></div>
                            <span className="font-semibold text-sm sm:text-base text-[#0368B0] whitespace-nowrap" style={phone.textConfig ? getTextStyle(phone.textConfig) : {}}>
                                {phone.text}
                            </span>
                        </a>
                    )}

                </div>

                {/* Button */}
                {button?.text && (
                    <a 
                        href={button.url || '#'}
                        onClick={(e) => { if (isEditing) e.preventDefault(); }}
                        className="mt-6 inline-flex items-center justify-center px-10 py-4 bg-[#0A4F82] text-white font-semibold hover:bg-[#083E66] hover:-translate-y-1 transition-all duration-300 shadow-lg text-sm sm:text-base"
                        style={{ ...getTextStyle(button.textConfig), borderRadius: getCustomRadius(button.radius || { tl: '9999px', tr: '9999px', br: '9999px', bl: '9999px' }) }}
                    >
                        {button.text}
                    </a>
                )}
            </div>
        </section>
    );
};

export default AdminQuanTam;
