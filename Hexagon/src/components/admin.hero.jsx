import React, { useState, useEffect } from 'react';
import { getBackgroundStyle, getTextStyle, getTitleStyle, getButtonStyle } from './admin.styleUtils';

const useTypewriter = (items, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);

    useEffect(() => {
        if (!items || items.length === 0) {
            setText('');
            return;
        }

        const currentString = items[loopNum % items.length]?.text || '';
        let timeout;

        if (isDeleting) {
            timeout = setTimeout(() => {
                setText(currentString.substring(0, text.length - 1));
                if (text.length === 0) {
                    setIsDeleting(false);
                    setLoopNum(loopNum + 1);
                }
            }, deletingSpeed);
        } else {
            timeout = setTimeout(() => {
                setText(currentString.substring(0, text.length + 1));
                if (text === currentString) {
                    timeout = setTimeout(() => setIsDeleting(true), pauseTime);
                }
            }, typingSpeed);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, loopNum, items, typingSpeed, deletingSpeed, pauseTime]);

    return text;
};

const AdminHeroHexagon = ({
    
    sectionId = '',
    background,
    tagText,
    tagConfig,
    title1Items = [],
    title1Config,
    title2,
    title2Config,
    description,
    descriptionConfig,
    buttonsConfig,
    buttons = [],
    imageUrl,
    imageAlt,
    scrollText,
    typingSpeed,
    deletingSpeed,
    pauseTime
}) => {
    const typewriterText = useTypewriter(
        title1Items,
        parseInt(typingSpeed, 10) || 100,
        parseInt(deletingSpeed, 10) || 50,
        parseInt(pauseTime, 10) || 2000
    );
    const imgUrlString = typeof imageUrl === 'string' ? imageUrl : (imageUrl?.url || imageUrl?.src || '');

    return (
        <section id={sectionId || undefined}
            className="fullscreen-section relative flex items-center pb-12 overflow-hidden"
            style={getBackgroundStyle(background || { type: 'color', color: '#196849' })}
        >
            <div className="container max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Content Left */}
                    <div className="flex flex-col items-start text-left space-y-6 lg:pr-8">
                        {/* Tag */}
                        {tagText && (
                            <div
                                className="inline-block px-4 py-1.5 backdrop-blur-sm"
                                style={getButtonStyle(tagConfig || { background: { color: 'rgba(234, 179, 8, 0.1)' }, border: { style: 'solid', width: '1px', color: 'rgba(234, 179, 8, 0.5)' }, textColor: '#eab308', radius: { type: 'all', all: '9999px' } })}
                            >
                                <span className="tracking-wider uppercase">{tagText}</span>
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.15] tracking-tight flex flex-col gap-2 min-h-[140px] justify-end">
                            {title1Items && title1Items.length > 0 && (
                                <span style={getTitleStyle(title1Config || { color: '#ffffff' })}>
                                    {typewriterText}
                                    <span aria-hidden="true" className="inline-block w-[3px] h-[0.85em] ml-1 bg-current align-middle animate-pulse"></span>
                                </span>
                            )}
                            {title2 && (
                                <span style={getTitleStyle(title2Config || { background: { type: 'gradient', gradientDirection: '135deg', gradientFrom: '#ffffff', gradientTo: '#F7931E' } })}>
                                    {title2}
                                </span>
                            )}
                        </h1>

                        {/* Description */}
                        {description && (
                            <div
                                className="text-base sm:text-lg leading-relaxed max-w-xl ck-content [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:font-bold [&_em]:italic"
                                style={getTextStyle(descriptionConfig || { color: '#e5e7eb' })}
                            >
                                {description}
                            </div>
                        )}

                        {/* Buttons */}
                        {buttons && buttons.length > 0 && (
                            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                                {buttons.map((btn, index) => {
                                    const btnCfg = btn.btnConfig || buttonsConfig || {};
                                    return (
                                        <a
                                            key={index}
                                            href={btn.url || '#'}
                                            className={`px-8 py-3.5 transition-all shadow-lg text-center backdrop-blur-sm block ${btnCfg.customClass || ''}`}
                                            style={getButtonStyle({
                                                textColor: '#ffffff',
                                                background: { color: '#eab308' },
                                                border: { width: '0px', style: 'none', color: 'transparent' },
                                                radius: { type: 'all', all: '8px' },
                                                ...btnCfg
                                            })}
                                        >
                                            {btn.label}
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Content Right (Image) */}
                    <div className="relative w-full flex justify-center">
                        <div className="relative w-full max-w-none aspect-square">
                            {imgUrlString ? (
                                <img
                                    src={imgUrlString}
                                    alt={imageAlt || 'Hero Image'}
                                    className="w-full h-full object-contain"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200/20 flex items-center justify-center rounded-full">
                                    <span className="text-gray-400">Chưa có hình ảnh</span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Scroll Indicator */}
            {scrollText && (
                <div className="absolute inset-x-0 bottom-8 flex justify-center animate-bounce z-20">
                    <a href="#gioi-thieu" className="text-gray-300 hover:text-white flex flex-col items-center gap-1 transition-colors">
                        <span className="text-sm font-medium tracking-wide">{scrollText}</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                </div>
            )}
        </section>
    );
};

export default AdminHeroHexagon;
