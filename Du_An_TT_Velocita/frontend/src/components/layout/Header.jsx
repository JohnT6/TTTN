import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CartPreviewModal from '../cart/CartPreviewModal';
import SearchModal from '../common/SearchModal';
import { logout } from '../../store/authSlice';
import { getSiteSettingsAPI } from '../../services/api';
import { formatImageUrl } from '../../helpers/helper';

// SVG Icon User ở Header (Do người dùng cung cấp)
const UserHeaderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-6 h-6 fill-current text-gray-900 group-hover:text-black transition-colors">
    <path d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z"/>
  </svg>
);

// SVG Icon Chỉnh sửa tài khoản (Do người dùng cung cấp)
const EditAccountIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 fill-current">
    <path d="M470.5 463.6C451.4 416.9 405.5 384 352 384L288 384C234.5 384 188.6 416.9 169.5 463.6C133.9 426.3 112 375.7 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320C528 375.7 506.1 426.2 470.5 463.6zM430.4 496.3C398.4 516.4 360.6 528 320 528C279.4 528 241.6 516.4 209.5 496.3C216.8 459.6 249.2 432 288 432L352 432C390.8 432 423.2 459.6 430.5 496.3zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 304C297.9 304 280 286.1 280 264C280 241.9 297.9 224 320 224C342.1 224 360 241.9 360 264C360 286.1 342.1 304 320 304zM232 264C232 312.6 271.4 352 320 352C368.6 352 408 312.6 408 264C408 215.4 368.6 176 320 176C271.4 176 232 215.4 232 264z"/>
  </svg>
);

// SVG Icon Xem lịch sử (Do người dùng cung cấp)
const HistoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 fill-current">
    <path d="M320 128C426 128 512 214 512 320C512 426 426 512 320 512C254.8 512 197.1 479.5 162.4 429.7C152.3 415.2 132.3 411.7 117.8 421.8C103.3 431.9 99.8 451.9 109.9 466.4C156.1 532.6 233 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C234.3 64 158.5 106.1 112 170.7L112 144C112 126.3 97.7 112 80 112C62.3 112 48 126.3 48 144L48 256C48 273.7 62.3 288 80 288L104.6 288C105.1 288 105.6 288 106.1 288L192.1 288C209.8 288 224.1 273.7 224.1 256C224.1 238.3 209.8 224 192.1 224L153.8 224C186.9 166.6 249 128 320 128zM344 216C344 202.7 333.3 192 320 192C306.7 192 296 202.7 296 216L296 320C296 326.4 298.5 332.5 303 337L375 409C384.4 418.4 399.6 418.4 408.9 409C418.2 399.6 418.3 384.4 408.9 375.1L343.9 310.1L343.9 216z"/>
  </svg>
);

// SVG Icon Đăng xuất (Do người dùng cung cấp)
const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 fill-current">
    <path d="M569 337C578.4 327.6 578.4 312.4 569 303.1L425 159C418.1 152.1 407.8 150.1 398.8 153.8C389.8 157.5 384 166.3 384 176L384 256L272 256C245.5 256 224 277.5 224 304L224 336C224 362.5 245.5 384 272 384L384 384L384 464C384 473.7 389.8 482.5 398.8 486.2C407.8 489.9 418.1 487.9 425 481L569 337zM224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160z"/>
  </svg>
);

// SVG Icon Trang Quản Lý Admin (Dành cho Quản lý website)
const AdminManagerIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8s0 0 0 0z" />
  </svg>
);

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [siteLogo, setSiteLogo] = useState('/assets/icons/logo.svg');

    useEffect(() => {
        getSiteSettingsAPI()
            .then((res) => {
                if (res && res.data && res.data.logo) {
                    setSiteLogo(formatImageUrl(res.data.logo));
                }
            })
            .catch(() => {});
    }, []);

    const isHomePage = location.pathname === '/';
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isCartHovered, setIsCartHovered] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isAnimateCart, setIsAnimateCart] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // Lấy trạng thái đăng nhập từ Redux store (Cookie)
    const { user, isAuthenticated } = useSelector((state) => state.auth || {});

    // Lấy danh sách sản phẩm thực tế từ Redux store giỏ hàng
    const cartItems = useSelector((state) => state.cart?.items || []);

    // Tính tổng số lượng hàng thực tế trong giỏ hàng
    const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

    // Kích hoạt hiệu ứng nảy icon giỏ hàng khi tổng số lượng thay đổi
    useEffect(() => {
        if (totalItems > 0) {
            setIsAnimateCart(true);
            const timer = setTimeout(() => setIsAnimateCart(false), 800);
            return () => clearTimeout(timer);
        }
    }, [totalItems]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        setIsUserMenuOpen(false);
        dispatch(logout());
        navigate('/sign-in');
    };

    const headerBgClass = isHomePage && !isScrolled
        ? 'py-5 bg-white/10 backdrop-blur-node'
        : 'bg-white py-[15px] shadow-[0_4px_12px_rgba(0,0,0,0.1)]';

    return (
        <>
            <header className={`header fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out ${headerBgClass}`}>
                <div className="container max-w-[1440px] w-full mx-auto px-5">
                    <div className="top-bar flex items-center">
                        <button
                            className="top-bar__more block lg:hidden"
                            onClick={() => setIsNavbarOpen(true)}
                        >
                            <img src="/assets/icons/more.svg" alt="" className="top-bar__more-icon" />
                        </button>

                        <nav
                            id="navbar"
                            className={`navbar w-[275px] max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:right-1/2 max-lg:bg-white max-lg:z-40 max-lg:py-5 max-lg:rounded-r-[20px] max-lg:transition-transform max-lg:duration-[400ms] ${isNavbarOpen ? 'max-lg:translate-x-0 max-lg:shadow-[0px_40px_90px_20px_rgba(0,0,0,0.2)]' : 'max-lg:-translate-x-full'
                                }`}
                        >
                            <button
                                className="navbar__close-btn hidden max-lg:block max-lg:px-10 max-lg:py-2.5"
                                onClick={() => setIsNavbarOpen(false)}
                            >
                                <img src="/assets/icons/arrow-left.svg" alt="Close" />
                            </button>
                            <ul className="navbar__list flex items-center max-lg:flex-col max-lg:items-start">
                                <li className="navbar__item px-[15px] text-[15px] font-medium leading-[1.47] hover:underline hover:decoration-[3px] hover:underline-offset-[7px] max-lg:px-10 max-lg:py-2.5">
                                    <Link to="/product-catalog?gender=MEN" onClick={() => setIsNavbarOpen(false)}>Nam</Link>
                                </li>
                                <li className="navbar__item px-[15px] text-[15px] font-medium leading-[1.47] hover:underline hover:decoration-[3px] hover:underline-offset-[7px] max-lg:px-10 max-lg:py-2.5">
                                    <Link to="/product-catalog?gender=WOMEN" onClick={() => setIsNavbarOpen(false)}>Nữ</Link>
                                </li>
                                <li className="navbar__item px-[15px] text-[15px] font-medium leading-[1.47] hover:underline hover:decoration-[3px] hover:underline-offset-[7px] max-lg:px-10 max-lg:py-2.5">
                                    <Link to="/news" onClick={() => setIsNavbarOpen(false)}>Tin tức</Link>
                                </li>
                            </ul>
                        </nav>

                        <div
                            className={`navbar__overlay invisible opacity-0 transition-all duration-[400ms] max-lg:fixed max-lg:inset-0 max-lg:z-30 max-lg:bg-black/40 ${isNavbarOpen ? '!visible !opacity-100' : ''}`}
                            onClick={() => setIsNavbarOpen(false)}
                        ></div>

                        <Link to="/" className="logo top-bar__logo inline-block w-[50px] h-[50px] ml-auto max-lg:absolute max-lg:top-1/2 max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 max-lg:ml-0">
                            <img
                                src={siteLogo}
                                alt="VELOCITÀ"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/assets/icons/logo.svg';
                                }}
                                className="logo__img w-full h-full object-contain"
                            />
                        </Link>

                        <div className="top-act flex items-center gap-5 ml-auto">
                            
                            {/* Nút Tìm kiếm */}
                            <button
                                type="button"
                                onClick={() => setIsSearchOpen(true)}
                                className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors cursor-pointer bg-gray-100/80 hover:bg-gray-200/80 px-3.5 py-2 rounded-full max-lg:p-2"
                                title="Tìm kiếm sản phẩm"
                            >
                                <img src="/assets/icons/search.svg" alt="Search" className="w-4 h-4" />
                                <span className="text-xs font-medium max-lg:hidden">Tìm kiếm</span>
                            </button>

                            {/* Icon Giỏ Hàng Shopping Bag + Hiệu ứng Nảy Animation */}
                            <div
                                className="relative py-2 flex items-center"
                                onMouseEnter={() => setIsCartHovered(true)}
                                onMouseLeave={() => setIsCartHovered(false)}
                            >
                                <Link
                                    to="/cart"
                                    className={`relative inline-flex items-center justify-center p-1 text-gray-900 hover:opacity-80 transition-all duration-300 cursor-pointer ${
                                        isAnimateCart ? 'scale-125 animate-bounce' : 'scale-100'
                                    }`}
                                    aria-label="Giỏ hàng"
                                >
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        role="img"
                                        width="24px"
                                        height="24px"
                                        fill="none"
                                        className="text-black stroke-current"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            d="M8.25 8.25V6a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 110 4.5H3.75v8.25a3.75 3.75 0 003.75 3.75h9a3.75 3.75 0 003.75-3.75V8.25H17.5"
                                        ></path>
                                    </svg>

                                    {totalItems > 0 && (
                                        <p className="absolute text-[10px] font-bold text-black pointer-events-none mt-[3px] select-none leading-none">
                                            {totalItems}
                                        </p>
                                    )}
                                </Link>

                                {isCartHovered && (
                                    <CartPreviewModal
                                        cartItems={cartItems}
                                        totalItems={totalItems}
                                        onClose={() => setIsCartHovered(false)}
                                    />
                                )}
                            </div>

                            {/* Trạng thái Đăng nhập: Hiển thị Icon User + Dropdown Menu khi Hover/Click */}
                            {isAuthenticated && user ? (
                                <div
                                    className="relative group py-2"
                                    onMouseEnter={() => setIsUserMenuOpen(true)}
                                    onMouseLeave={() => setIsUserMenuOpen(false)}
                                >
                                    {/* Icon User chuẩn do người dùng cung cấp */}
                                    <button
                                        type="button"
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                                        title="Tài khoản cá nhân"
                                    >
                                        <UserHeaderIcon />
                                    </button>

                                    {/* Dropdown Menu Modal khi Hover vào Icon User */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 top-full pt-2 w-64 z-50 animate-fade-in select-none before:content-[''] before:absolute before:-top-3 before:left-0 before:w-full before:h-3">
                                            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden text-gray-900">
                                                {/* Header Menu */}
                                                <div className="p-4 bg-gray-50 border-b border-gray-100 space-y-0.5">
                                                    <p className="text-sm font-bold text-gray-900 truncate">
                                                        {user.fullName || user.name || 'Người dùng VELOCITÀ'}
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {user.email}
                                                    </p>
                                                </div>

                                                {/* Menu Items */}
                                                <div className="p-2 space-y-1">
                                                    {/* Mục 1: Chỉnh sửa tài khoản */}
                                                    <Link
                                                        to="/profile"
                                                        onClick={() => setIsUserMenuOpen(false)}
                                                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:text-black hover:bg-gray-100 transition-all"
                                                    >
                                                        <EditAccountIcon />
                                                        <span>Chỉnh sửa tài khoản</span>
                                                    </Link>

                                                    {/* Mục 2: Xem lịch sử */}
                                                    <Link
                                                        to="/order-history"
                                                        onClick={() => setIsUserMenuOpen(false)}
                                                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:text-black hover:bg-gray-100 transition-all"
                                                    >
                                                        <HistoryIcon />
                                                        <span>Xem lịch sử</span>
                                                    </Link>

                                                    {/* Nút dành riêng cho các nhà quản lý website (SUPERADMIN, ADMIN, EDITOR) */}
                                                    {['SUPERADMIN', 'SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes((user?.role || '').toUpperCase()) && (
                                                        <Link
                                                            to="/admin"
                                                            onClick={() => setIsUserMenuOpen(false)}
                                                            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-black hover:bg-gray-800 transition-all shadow-xs"
                                                        >
                                                            <AdminManagerIcon />
                                                            <span>Trang Quản Lý Admin</span>
                                                        </Link>
                                                    )}

                                                    {/* Mục 3: Đăng xuất */}
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-all text-left cursor-pointer"
                                                    >
                                                        <LogoutIcon />
                                                        <span>Đăng xuất</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/sign-in" className="btn btn--no-margin btn-4 top-act__sign-in">
                                    <span className="top-act__sign-in-text">Đăng nhập</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Modal Tìm kiếm Fullscreen */}
            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </>
    );
};

export default Header;
