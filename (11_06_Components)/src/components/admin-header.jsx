import { useState, useEffect } from 'react';

const AdminHeader = ({
    logoUrl = '/logo.png',
    showLogoText = true,
    logoTitle = 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP',
    logoDescription = 'Tại TP.Hồ Chí Minh',
    navItems = []
}) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedMobileItems, setExpandedMobileItems] = useState({});
    
    // Sử dụng lazy initializer để tránh lỗi "Calling setState synchronously within an effect"
    const [isEditing] = useState(() => {
        if (typeof document !== 'undefined') {
            return !!document.querySelector('.puck-app') || !!document.querySelector('[class*="Puck"]');
        }
        return false;
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
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

    return (
        <header
            className={`w-full h-20 transition-all duration-300 ${isEditing
                ? 'relative bg-[#1e3a8a] z-50'
                : `fixed top-0 left-0 z-9999 ${isScrolled || isMobileMenuOpen
                    ? 'bg-[#1e3a8a] shadow-lg'
                    : 'absolute bg-transparent'
                }`
                }`}
        >
            <div className="w-[90%] h-full mx-auto flex items-center justify-between relative">
                {/* Logo */}
                <a href="/" className="flex items-center gap-3 z-10001">
                    <img src={logoUrl} alt="Logo" className="h-12 w-auto object-contain" />
                    {showLogoText && (
                        <div className="text-white hidden sm:block">
                            <h1 className="font-bold text-xs md:text-sm tracking-wide leading-tight">{logoTitle}</h1>
                            <p className="text-[9px] opacity-80 leading-tight">{logoDescription}</p>
                        </div>
                    )}
                </a>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-6 h-full">
                    {navItems.map((item, index) => {
                        const hasMega = item.isMegaMenu && item.subLinks && item.subLinks.length > 0;
                        const groupedLinks = hasMega ? groupSubLinks(item.subLinks) : {};

                        return (
                            <li
                                key={index}
                                className={`h-full flex items-center relative ${hasMega ? 'group' : ''}`}
                            >
                                {hasMega ? (
                                    <>
                                        <button className="text-white font-medium hover:text-yellow-400 transition-colors text-sm uppercase flex items-center gap-1 cursor-pointer">
                                            {item.label}
                                            <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {/* Mega Menu Dropdown */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[80vw] max-w-250 bg-white text-gray-800 shadow-2xl rounded-b-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10000">
                                            {Object.keys(groupedLinks).map((columnTitle, colIdx) => (
                                                <div key={colIdx} className="space-y-4">
                                                    <h3 className="font-bold text-xs tracking-wider text-blue-900 border-b border-gray-100 pb-2 uppercase">
                                                        {columnTitle}
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {groupedLinks[columnTitle].map((sub, subIdx) => (
                                                            <li key={subIdx}>
                                                                <a
                                                                    href={sub.url || '#'}
                                                                    className="group/link block p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                                                >
                                                                    <div className="font-semibold text-sm text-gray-900 group-hover/link:text-blue-700 transition-colors">
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
                                        className="text-white font-medium hover:text-yellow-400 transition-colors text-sm uppercase"
                                    >
                                        {item.label}
                                    </a>
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* Right side Language / Contact button */}
                <div className="hidden lg:flex items-center gap-4">
                    <button className="bg-linear-to-r from-yellow-600 to-yellow-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-1 text-sm cursor-pointer">
                        <span className="opacity-80">VN</span> | <span>EN</span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden text-white hover:text-yellow-400 transition-colors z-10001 cursor-pointer"
                    aria-label="Toggle Menu"
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

            {/* Mobile Navigation Drawer */}
            {isMobileMenuOpen && (
                <div className="fixed inset-x-0 top-20 bottom-0 bg-[#1e3a8a] text-white z-9998 overflow-y-auto px-6 py-8 lg:hidden">
                    <div className="flex flex-col gap-6">
                        <ul className="flex flex-col divide-y divide-blue-800">
                            {navItems.map((item, index) => {
                                const hasMega = item.isMegaMenu && item.subLinks && item.subLinks.length > 0;
                                const isExpanded = !!expandedMobileItems[index];

                                return (
                                    <li key={index} className="py-4">
                                        {hasMega ? (
                                            <div>
                                                <button
                                                    onClick={() => toggleMobileItem(index)}
                                                    className="w-full flex items-center justify-between font-bold text-base uppercase hover:text-yellow-400 transition-colors text-left cursor-pointer"
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
                                                    <div className="mt-4 pl-4 border-l border-blue-700 space-y-6">
                                                        {Object.entries(groupSubLinks(item.subLinks)).map(([colTitle, links], colIdx) => (
                                                            <div key={colIdx} className="space-y-2">
                                                                <div className="text-xs font-semibold text-yellow-400 tracking-wider uppercase">
                                                                    {colTitle}
                                                                </div>
                                                                <ul className="space-y-3">
                                                                    {links.map((sub, subIdx) => (
                                                                        <li key={subIdx}>
                                                                            <a
                                                                                href={sub.url || '#'}
                                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                                className="block group"
                                                                            >
                                                                                <div className="font-medium text-sm hover:text-yellow-300 transition-colors">
                                                                                    {sub.label}
                                                                                </div>
                                                                                {sub.description && (
                                                                                    <div className="text-xs text-blue-200 mt-0.5 leading-normal">
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
                                                )}
                                            </div>
                                        ) : (
                                            <a
                                                href={item.url || '#'}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block font-bold text-base uppercase hover:text-yellow-400 transition-colors"
                                            >
                                                {item.label}
                                            </a>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="pt-6 border-t border-blue-800 flex justify-center">
                            <button className="bg-linear-to-r from-yellow-600 to-yellow-400 text-white px-6 py-2 rounded-full font-bold shadow-md w-full max-w-50 cursor-pointer">
                                VN | EN
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default AdminHeader;