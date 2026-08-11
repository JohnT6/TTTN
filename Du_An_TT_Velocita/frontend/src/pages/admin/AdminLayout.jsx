import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { getCookie } from '../../helpers/cookie';
import { formatImageUrl } from '../../helpers/helper';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Image,
  Newspaper,
  Users,
  ShoppingBag,
  LogOut,
  ExternalLink,
  Menu,
  Palette,
  ShieldAlert,
} from 'lucide-react';

export default function AdminLayout() {
  const { user, isAuthenticated } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Đảm bảo không bị dính inline style background từ Client
  React.useEffect(() => {
    document.body.style.backgroundColor = '';
  }, []);

  // 1. Kiểm tra Token đăng nhập từ Cookie
  const token = getCookie('access_token') || getCookie('token');

  // Chuẩn hóa role về chữ in hoa
  const userRole = (user?.role || '').toUpperCase();
  const allowedAdminRoles = ['SUPERADMIN', 'SUPER_ADMIN', 'ADMIN', 'EDITOR'];
  const hasAdminAccess = allowedAdminRoles.includes(userRole);

  // Nếu chưa đăng nhập -> Chuyển hướng sang trang Đăng nhập /sign-in
  if (!token || !isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  // YÊU CẦU NỔI BẬT: Nếu tài khoản là USER/CUSTOMER (Không phải Quản trị viên/Biên tập viên) mà cố truy cập bằng URL
  // -> Chuyển hướng NGAY LẬP TỨC về trang chủ "/"
  if (!hasAdminAccess) {
    return <Navigate to="/" replace />;
  }

  // 2. Danh sách Menu & Phân quyền trang Admin theo từng Role
  const allNavItems = [
    { label: 'Tổng quan', path: '/admin', icon: LayoutDashboard, roles: ['SUPERADMIN', 'SUPER_ADMIN', 'ADMIN'] },
    { label: 'Quản lý Đơn hàng', path: '/admin/orders', icon: ShoppingBag, roles: ['SUPERADMIN', 'SUPER_ADMIN', 'ADMIN'] },
    { label: 'Quản lý Giao diện', path: '/admin/site-settings', icon: Palette, roles: ['SUPERADMIN', 'SUPER_ADMIN', 'ADMIN'] },
    { label: 'Quản lý Sản phẩm', path: '/admin/products', icon: Package, roles: ['SUPERADMIN', 'SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
    { label: 'Quản lý Danh mục', path: '/admin/categories', icon: FolderTree, roles: ['SUPERADMIN', 'SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
    { label: 'Quản lý Banner', path: '/admin/banners', icon: Image, roles: ['SUPERADMIN', 'SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
    { label: 'Bài viết & Tin tức', path: '/admin/news', icon: Newspaper, roles: ['SUPERADMIN', 'SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
    { label: 'Quản lý Tài khoản', path: '/admin/users', icon: Users, roles: ['SUPERADMIN', 'SUPER_ADMIN'] },
  ];

  // Lọc danh sách Menu hiển thị ở Sidebar dựa theo Role của tài khoản hiện tại
  const navItems = allNavItems.filter((item) => item.roles.includes(userRole));

  // Kiểm tra nếu EDITOR cố gõ URL vào trang không được phép (Ví dụ: /admin/users hoặc /admin/site-settings)
  const currentNavItem = allNavItems.find((item) => item.path === location.pathname);
  if (currentNavItem && !currentNavItem.roles.includes(userRole)) {
    // Chuyển hướng về trang đầu tiên được phép truy cập (Ví dụ EDITOR sẽ về /admin/products)
    const fallbackPath = navItems[0]?.path || '/admin/products';
    return <Navigate to={fallbackPath} replace />;
  }

  // Trường hợp EDITOR vào /admin (Tổng quan) -> Chuyển hướng sang /admin/products
  if (userRole === 'EDITOR' && location.pathname === '/admin') {
    return <Navigate to="/admin/products" replace />;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/sign-in');
  };

  const getRoleDisplayName = (roleStr) => {
    switch (roleStr) {
      case 'SUPERADMIN':
      case 'SUPER_ADMIN':
        return 'SUPER ADMIN';
      case 'ADMIN':
        return 'QUẢN TRỊ VIÊN';
      case 'EDITOR':
        return 'BIÊN TẬP VIÊN';
      default:
        return 'QUẢN TRỊ';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] font-sans select-none text-gray-900">
      {/* Top Header Bar (Full Width) */}
      <header className="h-16 bg-white border-b border-gray-200 text-gray-900 flex items-center justify-between px-6 z-50 shadow-xs relative">
        {/* Góc Trái: Toggle Menu + Logo + Tên Hệ Thống */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-800 transition-colors cursor-pointer"
            title="Đóng/Mở Sidebar"
          >
            <Menu size={22} />
          </button>

          <Link to="/admin" className="flex items-center gap-3">
            <img src="/assets/icons/logo.svg" alt="VELOCITÀ" className="w-8 h-8 object-contain shrink-0" />
            <div>
              <h1 className="text-base font-black tracking-wide uppercase leading-tight text-black">
                VELOCITÀ STORE
              </h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                HỆ THỐNG QUẢN TRỊ NỘI BỘ
              </p>
            </div>
          </Link>
        </div>

        {/* Góc Phải: Nút Xem Client | Vạch Ngăn Cách | User Info | Nút Đăng Xuất Đỏ */}
        <div className="flex items-center gap-4">
          {/* Nút Xem Trang Client */}
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 border border-gray-200 transition-all cursor-pointer"
          >
            <ExternalLink size={15} />
            <span className="max-sm:hidden">Xem trang Client</span>
          </Link>

          {/* Vạch gạch đứng màu xám/đen ngăn cách */}
          <div className="h-6 w-[1.5px] bg-gray-300 max-sm:hidden"></div>

          {/* User Info */}
          <div className="flex items-center gap-3 bg-transparent border-none p-0">
            <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 overflow-hidden shrink-0 shadow-2xs">
              <img
                src={formatImageUrl(user?.avatar || '/assets/imgs/user_default.jpg')}
                alt={user?.fullName || user?.name || 'User'}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/imgs/user_default.jpg';
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="max-sm:hidden leading-tight text-left">
              <p className="text-sm font-bold text-gray-900 max-w-[150px] truncate">
                {user?.fullName || user?.full_name || user?.name || 'User'}
              </p>
              <span className={`inline-block text-[10px] font-black px-2.5 py-0.5 rounded-full mt-0.5 tracking-wider uppercase ${
                userRole === 'SUPERADMIN' || userRole === 'SUPER_ADMIN'
                  ? 'bg-rose-900 text-white border border-rose-900'
                  : userRole === 'ADMIN'
                  ? 'bg-black text-white border border-black'
                  : userRole === 'EDITOR'
                  ? 'bg-purple-100 text-purple-900 border border-purple-300'
                  : 'bg-gray-100 text-gray-800 border border-gray-300'
              }`}>
                {user?.role || userRole}
              </span>
            </div>
          </div>

          {/* Nút Đăng Xuất Đỏ Bo Tròn */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[#e11d48] hover:bg-red-700 text-white font-bold text-xs rounded-full transition-all shadow-sm cursor-pointer ml-1"
            title="Đăng xuất khỏi hệ thống"
          >
            <LogOut size={15} />
            <span className="max-sm:hidden">Đăng xuất</span>
          </button>
        </div>
      </header>

      {/* Body Container: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Nền Trắng Tinh Tế với Transition trượt mượt 300ms */}
        <aside
          className={`w-64 bg-white border-r border-gray-200 text-gray-900 flex flex-col justify-between p-4 flex-shrink-0 transition-all duration-300 ease-in-out shadow-xs z-40 ${
            isSidebarOpen
              ? 'translate-x-0 opacity-100'
              : '-ml-64 opacity-0 pointer-events-none'
          }`}
        >
          <div className="space-y-4">
            {/* Header Danh mục */}
            <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase px-3 mt-1">
              DANH MỤC QUẢN LÝ ({getRoleDisplayName(userRole)})
            </p>

            {/* Navigation Menu */}
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-black text-white font-bold shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-black font-semibold'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer Sidebar */}
          <div className="pt-4 border-t border-gray-100 text-center space-y-1">
            <p className="text-[11px] text-gray-400 font-medium">VELOCITÀ Admin RBAC v2.0</p>
            <p className="text-[10px] text-gray-400 font-bold">Role: {userRole}</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#f8f9fa] transition-all duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
