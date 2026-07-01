import React, { useState, useEffect, useRef } from 'react';

const AdminHeaderMetik = ({
    logoUrl = '/logo.png',
    navItems = [],
    socials = [],
    stickyScrollThreshold = 300
}) => {
    const [scrollY, setScrollY] = useState(0);
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const lastScrollY = useRef(0);
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedMobileItems, setExpandedMobileItems] = useState({});
    
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            setIsEditing(!!document.querySelector('.puck-app') || !!document.querySelector('[class*="Puck"]'));
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY !== lastScrollY.current) {
                setIsScrollingUp(currentScrollY < lastScrollY.current);
            }
            setScrollY(currentScrollY);
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileItem = (index) => {
        setExpandedMobileItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Helper to group subLinks by columnTitle
    const groupSubLinks = (subLinks) => {
        if (!subLinks || !Array.isArray(subLinks)) return {};
        const groups = {};
        subLinks.forEach(link => {
            const key = link.columnTitle || 'Thông tin thêm';
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(link);
        });
        return groups;
    };

    // Xác định trạng thái của Header
    // State A: Header lớn, nằm yên (absolute) trên cùng, cuộn theo trang.
    // State B: Header nhỏ, fixed nhưng ẩn trên cùng (-translate-y-full) - dùng để chuẩn bị.
    // State C: Header nhỏ, fixed và trượt xuống hiện ra (translate-y-0).
    
    // Ngưỡng để ẩn hẳn Header lớn (chiều cao header khoảng 112px, nên 150px là an toàn để nó trôi qua hẳn)
    const transitionPoint = 150; 

    let headerState = 'A';
    if (!isEditing) {
        if (scrollY <= 0) {
            headerState = 'A'; // Ở trên cùng thì luôn là A
        } else {
            if (scrollY >= stickyScrollThreshold) {
                headerState = 'C'; // Qua ngưỡng thì hiện C
            } else if (isScrollingUp) {
                headerState = 'C'; // Kéo lên trước ngưỡng vẫn giữ C để từ từ gom vào A
            } else {
                // Kéo xuống nhưng chưa qua ngưỡng
                if (scrollY < transitionPoint) {
                    headerState = 'A'; // Để nó tự trôi đi một cách tự nhiên
                } else {
                    headerState = 'B'; // Ẩn lên trên chuẩn bị cho C
                }
            }
        }
    }

    let headerClasses = "";
    let logoClasses = "";
    let navClasses = "";
    let socialClasses = "";
    let positionClass = "";
    let transitionClass = "transition-all duration-500 ease-in-out";

    if (headerState === 'A' || isEditing) {
        positionClass = "absolute top-0 left-0";
        headerClasses = "translate-y-0 bg-white py-4 shadow-sm opacity-100";
        logoClasses = "h-16 md:h-20";
        navClasses = "text-[15px]";
        socialClasses = "w-9 h-9";
    } else if (headerState === 'B') {
        positionClass = "fixed top-0 left-0";
        // Khi ở B, ta ẩn hẳn lên trên và KHÔNG DÙNG TRANSITION để tránh lỗi giật lúc chuyển từ Absolute sang Fixed
        headerClasses = "-translate-y-full bg-white/95 backdrop-blur-sm py-4 shadow-md opacity-0"; 
        logoClasses = "h-10 md:h-12";
        navClasses = "text-sm";
        socialClasses = "w-8 h-8";
        transitionClass = "transition-none"; 
    } else if (headerState === 'C') {
        positionClass = "fixed top-0 left-0";
        headerClasses = "translate-y-0 bg-white/95 backdrop-blur-sm py-4 shadow-md opacity-100"; 
        logoClasses = "h-10 md:h-12";
        navClasses = "text-sm";
        socialClasses = "w-8 h-8";
    }

    const renderNav = () => (
        <ul className="flex items-center gap-6 lg:gap-10 h-full">
            {navItems.map((item, index) => {
                const hasMega = item.isMegaMenu && item.subLinks && item.subLinks.length > 0;
                const groupedLinks = hasMega ? groupSubLinks(item.subLinks) : {};

                return (
                    <li key={index} className={`h-full flex items-center relative group`}>
                        {hasMega ? (
                            <>
                                <button className={`font-bold transition-all duration-300 text-gray-700 ${navClasses} hover:text-orange-500 uppercase flex items-center gap-1 cursor-pointer`}>
                                    {item.label}
                                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                
                                {/* Mega Menu Dropdown */}
                                <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[900px] bg-white text-gray-800 shadow-2xl rounded-b-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-[10000]">
                                    {Object.keys(groupedLinks).map((columnTitle, colIdx) => (
                                        <div key={colIdx} className="space-y-4 text-left">
                                            <h3 className="font-bold text-xs tracking-wider text-orange-500 border-b border-gray-100 pb-2 uppercase">
                                                {columnTitle}
                                            </h3>
                                            <ul className="space-y-3">
                                                {groupedLinks[columnTitle].map((sub, subIdx) => (
                                                    <li key={subIdx}>
                                                        <a
                                                            href={sub.url || '#'}
                                                            onClick={(e) => { if (isEditing) e.preventDefault(); }}
                                                            className="group/link block p-2 rounded-lg hover:bg-orange-50 transition-colors"
                                                        >
                                                            <div className="font-semibold text-sm text-gray-900 group-hover/link:text-orange-600 transition-colors">
                                                                {sub.label}
                                                            </div>
                                                            {sub.description && (
                                                                <div className="text-xs text-gray-500 mt-0.5 leading-normal">
                                                                    {sub.description}
                                                                </div>
                                                            )}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <a
                                href={item.url || '#'}
                                onClick={(e) => { if (isEditing) e.preventDefault(); }}
                                className={`font-bold transition-all duration-300 text-gray-700 ${navClasses} hover:text-orange-500 uppercase`}
                            >
                                {item.label}
                            </a>
                        )}
                        {/* Underline Effect */}
                        <div
                            className={`absolute -bottom-2 left-0 h-[3px] bg-orange-500 transition-all duration-300 ${
                                item.isActive ? 'w-full' : 'w-0 group-hover:w-full'
                            }`}
                        ></div>
                    </li>
                );
            })}
        </ul>
    );

    const renderSocials = () => (
        <div className="flex items-center gap-3">
            {socials && socials.map((social, index) => (
                <a
                    key={index}
                    href={social.url || '#'}
                    onClick={(e) => { if (isEditing) e.preventDefault(); }}
                    className={`flex items-center justify-center rounded-full text-white overflow-hidden transition-all duration-300 shadow-sm ${socialClasses} hover:opacity-80 hover:-translate-y-1`}
                    title={social.alt || `social-${index}`}
                >
                    {social.iconUrl ? (
                        <img src={social.iconUrl} alt={social.alt || "social"} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-xs font-bold bg-gray-400 w-full h-full flex items-center justify-center">S</span>
                    )}
                </a>
            ))}
        </div>
    );

    return (
        <>
            {/* Placeholder để giữ layout không bị nhảy khi header nhảy qua chế độ Fixed */}
            {!isEditing && (
                <div className="w-full h-[96px] md:h-[112px]"></div>
            )}
            
            <header
                className={`w-full border-b border-gray-100 z-[9999] ${
                    isEditing ? 'relative' : positionClass
                } ${headerClasses} ${transitionClass}`}
            >
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" onClick={(e) => { if (isEditing) e.preventDefault(); }} className="flex-shrink-0 z-[10001]">
                        {logoUrl ? (
                            <img 
                                src={logoUrl} 
                                alt="Logo" 
                                className={`w-auto object-contain ${transitionClass} ${logoClasses}`}
                            />
                        ) : (
                            <div className={`font-black text-orange-500 tracking-tighter drop-shadow-md ${transitionClass} ${
                                headerState === 'A' ? 'text-3xl' : 'text-2xl'
                            }`}>
                                METIK
                            </div>
                        )}
                    </a>

                    {/* Navigation Desktop */}
                    <nav className="hidden lg:flex flex-1 justify-center px-4 h-full">
                        {renderNav()}
                    </nav>

                    {/* Social Icons Desktop */}
                    <div className="hidden lg:flex flex-shrink-0 items-center justify-end min-w-[120px]">
                        {renderSocials()}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="lg:hidden text-gray-800 p-2 z-[10001] cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Drawer */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-x-0 top-[100%] bottom-[-100vh] bg-white text-gray-800 z-[9998] overflow-y-auto px-6 py-8 lg:hidden shadow-xl border-t border-gray-100 transition-all">
                        <div className="flex flex-col gap-6">
                            <ul className="flex flex-col divide-y divide-gray-100">
                                {navItems.map((item, index) => {
                                    const hasMega = item.isMegaMenu && item.subLinks && item.subLinks.length > 0;
                                    const isExpanded = !!expandedMobileItems[index];

                                    return (
                                        <li key={index} className="py-4">
                                            {hasMega ? (
                                                <div>
                                                    <button
                                                        onClick={() => toggleMobileItem(index)}
                                                        className="w-full flex items-center justify-between font-bold text-base uppercase hover:text-orange-500 transition-colors text-left cursor-pointer"
                                                    >
                                                        <span>{item.label}</span>
                                                        <svg
                                                            className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>
                                                    {isExpanded && (
                                                        <div className="mt-4 pl-4 border-l-2 border-orange-200 space-y-6">
                                                            {Object.entries(groupSubLinks(item.subLinks)).map(([colTitle, links], colIdx) => (
                                                                <div key={colIdx} className="space-y-2">
                                                                    <div className="text-xs font-semibold text-gray-500 tracking-wider uppercase">
                                                                        {colTitle}
                                                                    </div>
                                                                    <ul className="space-y-3">
                                                                        {links.map((sub, subIdx) => (
                                                                            <li key={subIdx}>
                                                                                <a
                                                                                    href={sub.url || '#'}
                                                                                    onClick={(e) => { 
                                                                                        if (isEditing) e.preventDefault(); 
                                                                                        else setIsMobileMenuOpen(false); 
                                                                                    }}
                                                                                    className="block group"
                                                                                >
                                                                                    <div className="font-medium text-sm hover:text-orange-500 transition-colors">
                                                                                        {sub.label}
                                                                                    </div>
                                                                                </a>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <a
                                                    href={item.url || '#'}
                                                    onClick={(e) => { 
                                                        if (isEditing) e.preventDefault(); 
                                                        else setIsMobileMenuOpen(false); 
                                                    }}
                                                    className={`block font-bold text-base uppercase hover:text-orange-500 transition-colors ${item.isActive ? 'text-orange-500' : ''}`}
                                                >
                                                    {item.label}
                                                </a>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center gap-4">
                                {socials && socials.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url || '#'}
                                        onClick={(e) => { if (isEditing) e.preventDefault(); }}
                                        className="flex items-center justify-center rounded-full text-white w-10 h-10 shadow-sm hover:-translate-y-1 transition-transform"
                                        title={social.alt || `social-${index}`}
                                    >
                                        {social.iconUrl ? (
                                            <img src={social.iconUrl} alt={social.alt || "social"} className="w-full h-full object-cover rounded-full" />
                                        ) : (
                                            <span className="text-xs font-bold bg-gray-400 w-full h-full flex items-center justify-center rounded-full">S</span>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default AdminHeaderMetik;
