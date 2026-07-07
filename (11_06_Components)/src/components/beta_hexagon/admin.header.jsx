import React, { useState, useEffect } from 'react';
import { getBackgroundStyle } from '../admin.styleUtils';

const AdminHeaderHexagon = ({
    
    sectionId = '',
    lang = 'vi',
    logoUrl,
    brandName,
    brandNameConfig,
    backgroundColor,
    hoverTextColor = '#F59E0B',
    menuItemsConfig = {},
    mobileMenuItemsConfig = {},
    menuItems = [],
    mobileMenuBgColor = '#ffffff',
    langOptions = []
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleSwitchLanguage = (e, langCode) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('switch-language', { detail: langCode }));
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        // Kiểm tra ngay khi mount để set state đúng (kể cả trong editor)
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Áp dụng màu nền từ cấu hình Puck, luôn hiển thị
    const currentBgStyle = getBackgroundStyle(backgroundColor || { type: 'color', color: '#1A6B49' });

    return (
        <header id={sectionId || undefined} 
            className="sticky top-0 left-0 right-0 z-50 transition-all duration-300"
            style={currentBgStyle}
        >
            <nav className="container max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
                
                {/* Logo & Brand */}
                <div className="flex items-center space-x-2">
                    {logoUrl && (
                        <div className="w-16 h-16">
                            <a href="#" className="block h-full">
                                <img src={typeof logoUrl === 'string' ? logoUrl : (logoUrl?.url || logoUrl?.src || '')} alt={brandName || "Logo"} className="w-full h-full object-contain" />
                            </a>
                        </div>
                    )}
                    {brandName && (
                        <span 
                            className="text-xl font-bold transition-colors duration-300"
                            style={{ 
                                color: brandNameConfig?.color || '#ffffff',
                                fontSize: brandNameConfig?.size || '1.25rem',
                                fontWeight: brandNameConfig?.weight || 'bold'
                            }}
                        >
                            {brandName}
                        </span>
                    )}
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {menuItems.map((item, idx) => (
                        <a 
                            key={idx} 
                            href={item.url || '#'} 
                            className="transition-colors duration-200"
                            style={{ 
                                color: menuItemsConfig.color || '#D1D5DB', // gray-300
                                fontSize: menuItemsConfig.size || '1rem',
                                fontWeight: menuItemsConfig.weight || 'normal'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.color = hoverTextColor || '#F59E0B'; // Vàng khi hover
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.color = menuItemsConfig.color || '#D1D5DB';
                            }}
                        >
                            {item.label}
                        </a>
                    ))}

                    {/* Dynamic Language Selector */}
                    {langOptions && langOptions.length > 0 && (
                        <div className="flex items-center space-x-2 ml-6">
                            {langOptions.map((opt, i) => {
                                const isActive = opt.langCode === lang;
                                return (
                                <a 
                                    key={i} 
                                    href="#" 
                                    onClick={(e) => handleSwitchLanguage(e, opt.langCode)}
                                    className={`transition-all duration-300 block text-white font-bold ${isActive ? 'opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] scale-110' : 'opacity-60 hover:opacity-100'}`} 
                                    title={`Chuyển sang ${(opt.langCode || '').toUpperCase()}`}
                                >
                                    {opt.flagUrl ? (
                                        <img src={opt.flagUrl} width="20" alt={opt.label || opt.langCode} />
                                    ) : (
                                        opt.label || opt.langCode
                                    )}
                                </a>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div 
                    className="md:hidden fixed top-[80px] left-0 w-full shadow-2xl border-t border-gray-100 z-40 transition-all pb-4 py-2"
                    style={{ backgroundColor: mobileMenuBgColor || '#ffffff' }}
                >
                    {menuItems.map((item, idx) => (
                        <a 
                            key={idx} 
                            href={item.url || '#'} 
                            className="block py-3 px-6 text-base font-medium transition-colors"
                            style={{ 
                                color: mobileMenuItemsConfig.color || '#1f2937', // gray-800
                                backgroundColor: 'transparent'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.color = hoverTextColor || '#F59E0B';
                                e.currentTarget.style.backgroundColor = '#f9fafb';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.color = mobileMenuItemsConfig.color || '#1f2937';
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                    
                    {/* Dynamic Language Selector for Mobile */}
                    {langOptions && langOptions.length > 0 && (
                        <div className="flex items-center space-x-4 px-6 py-4 border-t border-gray-100 mt-2 bg-gray-50/50">
                            {langOptions.map((opt, i) => {
                                const isActive = opt.langCode === lang;
                                return (
                                <a 
                                    key={i} 
                                    href="#" 
                                    onClick={(e) => handleSwitchLanguage(e, opt.langCode)}
                                    className={`transition-all duration-300 block text-gray-800 font-bold ${isActive ? 'opacity-100 drop-shadow-[0_0_4px_rgba(0,0,0,0.2)] scale-110' : 'opacity-60 hover:opacity-100'}`} 
                                    title={`Chuyển sang ${(opt.langCode || '').toUpperCase()}`}
                                >
                                    {opt.flagUrl ? (
                                        <img src={opt.flagUrl} width="24" className="rounded-sm" alt={opt.label || opt.langCode} />
                                    ) : (
                                        opt.label || opt.langCode
                                    )}
                                </a>
                            );
                            })}
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default AdminHeaderHexagon;
