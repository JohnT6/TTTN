import React, { useState, useEffect } from 'react';
import { Package, FolderTree, ShoppingBag, Users } from 'lucide-react';
import { getAdminStatsAPI } from '../../services/api';
import { formatImageUrl } from '../../helpers/helper';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [realStats, setRealStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalUsers: 0,
    newArrivals: 0,
    bestSellers: 0,
    onSale: 0,
    recentProducts: [],
  });

  // Fetch dữ liệu thống kê trực tiếp từ Backend API
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await getAdminStatsAPI();
        if (res && res.success && res.data) {
          setRealStats(res.data);
        }
      } catch (err) {
        // Ignore
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // 4 Thống kê chính trên Bảng điều khiển
  const statsList = [
    {
      title: 'Tổng sản phẩm',
      value: realStats.totalProducts,
      icon: Package,
      note: 'Sản phẩm đang kinh doanh',
    },
    {
      title: 'Tổng danh mục',
      value: realStats.totalCategories,
      icon: FolderTree,
      note: 'Danh mục đang hiển thị',
    },
    {
      title: 'Tổng đơn hàng',
      value: realStats.totalOrders,
      icon: ShoppingBag,
      note: 'Tổng số đơn hàng đã tạo',
    },
    {
      title: 'Tổng người dùng',
      value: realStats.totalUsers,
      icon: Users,
      note: 'Tài khoản khách hàng đã đăng ký',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner Welcome Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Quản lý Bảng điều khiển (Dashboard)
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Cập nhật tự động thông tin hệ thống, số lượng sản phẩm, đơn hàng và khách hàng.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
            {loading ? 'Đang tải dữ liệu...' : 'Dữ liệu Thời gian thực'}
          </span>
        </div>
      </div>

      {/* Grid 4 Chỉ Số Thống Kê Bắt Buộc */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-gray-200 p-6 rounded-2xl flex flex-col justify-between hover:border-black transition-all duration-300 shadow-xs group"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{item.title}</p>
                <div className="p-3 rounded-xl bg-gray-100 text-gray-900 border border-gray-200">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-3xl font-black text-gray-900 group-hover:scale-105 transition-transform duration-300 origin-left">
                  {loading ? '...' : item.value}
                </h3>
                <p className="text-[11px] text-gray-400 font-medium mt-1">{item.note}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overview Analytics & Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-gray-200 p-6 rounded-2xl space-y-6 shadow-xs">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-black animate-pulse"></span>
            Tỷ Lệ Phân Loại Sản Phẩm Trong Kho
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-700">Sản phẩm Mới (New Arrival)</span>
                <span className="text-black font-bold">{realStats.newArrivals}</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-black h-full transition-all duration-500"
                  style={{
                    width: `${realStats.totalProducts ? (realStats.newArrivals / realStats.totalProducts) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-700">Sản phẩm Bán Chạy (Best Seller)</span>
                <span className="text-black font-bold">{realStats.bestSellers}</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gray-800 h-full transition-all duration-500"
                  style={{
                    width: `${realStats.totalProducts ? (realStats.bestSellers / realStats.totalProducts) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-700">Sản phẩm Khuyến Mãi (Sale)</span>
                <span className="text-red-600 font-bold">{realStats.onSale}</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-red-600 h-full transition-all duration-500"
                  style={{
                    width: `${realStats.totalProducts ? (realStats.onSale / realStats.totalProducts) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick List Sản phẩm Vừa Thêm Mới */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl space-y-4 shadow-xs">
          <h3 className="font-bold text-gray-900 text-lg">Sản Phẩm Vừa Thêm Mới</h3>
          <div className="space-y-3">
            {realStats.recentProducts && realStats.recentProducts.length > 0 ? (
              realStats.recentProducts.map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                  <img
                    src={formatImageUrl(p.image || '/assets/img/product-adidas-1.jpg')}
                    alt={p.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/img/product-adidas-1.jpg';
                    }}
                    className="w-10 h-10 object-cover rounded-lg bg-gray-200 border border-gray-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{p.name}</p>
                    <p className="text-[11px] text-[#003882] font-bold mt-0.5">
                      {p.price ? `${new Intl.NumberFormat('vi-VN').format(p.price)} đ` : ''}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 font-medium text-center py-4">Đang tải danh sách sản phẩm...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
