import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { useNavigate, Navigate } from 'react-router-dom';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  PackageCheck,
  XCircle,
  CreditCard,
  Eye,
  RefreshCw,
  Building2,
} from 'lucide-react';
import { getOrdersAPI } from '../../services/api';
import ToastNotification from '../../components/common/ToastNotification';
import { formatCurrencyVND, formatImageUrl } from '../../helpers/helper';

export default function OrderHistoryPage() {
  const { user, isAuthenticated } = useSelector((state) => state.auth || {});
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');

  // Modal Chi tiết đơn hàng
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Toast Notifications
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  // Nạp danh sách lịch sử đơn hàng của User đang đăng nhập
  const loadUserOrders = async () => {
    if (!user || !user.id) return;
    setLoading(true);
    try {
      const res = await getOrdersAPI(`userId=${user.id}`);
      if (res && res.success && res.data) {
        const list = Array.isArray(res.data) ? res.data : res.data.items || [];
        setOrders(list);
      }
    } catch (err) {
      showToast('error', 'Lỗi nạp đơn hàng', err.message || 'Không thể tải lịch sử đơn hàng.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserOrders();
  }, [user]);

  // Khóa cuộn trang khi mở Modal chi tiết đơn hàng
  useEffect(() => {
    if (selectedOrder) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedOrder]);

  // Nếu chưa đăng nhập -> Chuyển hướng sang /sign-in
  if (!isAuthenticated || !user) {
    return <Navigate to="/sign-in" replace />;
  }

  // Lọc đơn hàng theo Tab đang chọn
  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'ALL') return true;
    return o.status === activeTab;
  });

  // Helper render Badge Trạng Thái Đơn Hàng
  const renderOrderStatusBadge = (statusStr) => {
    switch (statusStr) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold">
            <Clock size={13} className="text-amber-600" />
            <span>Chờ xử lý</span>
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold">
            <RefreshCw size={13} className="text-blue-600 animate-spin" />
            <span>Đang chuẩn bị hàng</span>
          </span>
        );
      case 'SHIPPED':
        return (
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-800 border border-indigo-200 px-3 py-1 rounded-full text-xs font-bold">
            <Truck size={13} className="text-indigo-600" />
            <span>Đang giao hàng</span>
          </span>
        );
      case 'DELIVERED':
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
            <PackageCheck size={13} className="text-emerald-600" />
            <span>Đã giao thành công</span>
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full text-xs font-bold">
            <XCircle size={13} className="text-red-600" />
            <span>Đã hủy đơn</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 border border-gray-200 px-3 py-1 rounded-full text-xs font-bold">
            <span>{statusStr}</span>
          </span>
        );
    }
  };

  const tabs = [
    { key: 'ALL', label: 'Tất Cả Đơn Hàng' },
    { key: 'PENDING', label: 'Chờ Xử Lý' },
    { key: 'PROCESSING', label: 'Đang Chuẩn Bị' },
    { key: 'SHIPPED', label: 'Đang Giao' },
    { key: 'DELIVERED', label: 'Đã Giao Thành Công' },
    { key: 'CANCELLED', label: 'Đã Hủy' },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-28 md:pt-32 pb-16 px-4">
      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Breadcrumb */}
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Lịch Sử Giao Dịch Đơn Hàng</h1>
            <p className="text-xs text-gray-500 mt-1">
              Theo dõi tất cả đơn hàng đã mua và trạng thái thanh toán VietQR SePay của bạn.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 rounded-xl transition-all cursor-pointer"
          >
            ← Chỉnh Sửa Tài Khoản
          </button>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none bg-white p-2 rounded-2xl border border-gray-100 shadow-xs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-black text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List of Orders */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white p-12 rounded-3xl text-center text-xs text-gray-400 font-semibold border border-gray-100">
              Đang nạp lịch sử đơn hàng của bạn...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl text-center space-y-3 border border-gray-100">
              <ShoppingBag size={40} className="mx-auto text-gray-300" />
              <p className="text-sm font-bold text-gray-700">Chưa có đơn hàng nào trong mục này</p>
              <p className="text-xs text-gray-400">Khám phá các mẫu giày thể thao cao cấp và đặt mua ngay hôm nay!</p>
              <button
                type="button"
                onClick={() => navigate('/catalog')}
                className="mt-2 px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer inline-block"
              >
                Mua Sắm Ngay
              </button>
            </div>
          ) : (
            filteredOrders.map((o) => {
              const dateFormatted = o.createdAt
                ? new Date(o.createdAt).toLocaleString('vi-VN')
                : 'Mới tạo';

              return (
                <div key={o.id} className="bg-white rounded-3xl border border-gray-100 p-6 space-y-4 shadow-2xs hover:shadow-xs transition-all">
                  {/* Top Card Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-black text-base text-black">#{o.code}</span>
                      <span className="text-xs text-gray-400 font-medium">• {dateFormatted}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {renderOrderStatusBadge(o.status)}
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3">
                    {(o.orderItems || []).map((item, idx) => {
                      const itemImg = formatImageUrl(item.productImage || '/assets/img/product-adidas-1.jpg');
                      return (
                        <div key={idx} className="flex items-center gap-4 py-2 text-xs">
                          <img
                            src={itemImg}
                            alt={item.productName}
                            className="w-16 h-16 object-contain bg-gray-50 rounded-2xl border border-gray-100 shrink-0 p-1"
                          />
                          <div className="flex-1 space-y-1">
                            <h4 className="font-bold text-gray-900 text-sm">{item.productName}</h4>
                            <p className="text-gray-500 font-medium">Size: {item.productSize || 'Freesize'} | SL: x{item.quantity || 1}</p>
                          </div>
                          <div className="text-right font-black text-gray-900 text-sm">
                            {formatCurrencyVND((item.price || 0) * (item.quantity || 1))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer Card Bar */}
                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black border ${
                          o.paymentStatus === 'PAID'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {o.paymentStatus === 'PAID' ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Clock size={12} className="text-amber-600" />}
                        <span>{o.paymentStatus === 'PAID' ? 'ĐÃ THANH TOÁN' : 'CHƯA THANH TOÁN'}</span>
                      </span>
                      <span className="text-gray-400 font-medium">({o.paymentMethod === 'BANK_TRANSFER' || o.paymentMethod === 'SePay' ? 'VietQR SePay' : 'COD'})</span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="text-right">
                        <span className="text-xs text-gray-500">Tổng thanh toán:</span>
                        <p className="text-lg font-black text-black">{formatCurrencyVND(o.grandTotal)}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedOrder(o)}
                        className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Eye size={14} />
                        <span>Xem chi tiết</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* MODAL CHI TIẾT ĐƠN HÀNG DÀNH CHO USER CLIENT */}
      {selectedOrder &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl relative border border-gray-100 max-h-[85vh] flex flex-col overflow-hidden">
              {/* Header Modal */}
              <div className="p-6 pb-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-black text-gray-900">Chi Tiết Đơn Hàng #{selectedOrder.code}</h2>
                    {renderOrderStatusBadge(selectedOrder.status)}
                  </div>
                  <p className="text-xs text-gray-400 font-mono mt-1">
                    Ngày đặt: {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString('vi-VN') : 'Mới tạo'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-black hover:bg-gray-200 font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Body Content (Cuộn mượt giữa với thanh cuộn Slim 6px bo tròn siêu đẹp) */}
              <div className="p-6 space-y-6 overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                {/* Thông tin Giao Hàng */}
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-200 pb-2">
                    Thông Tin Nhận Hàng
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-gray-700 pt-1">
                    <p><strong>Người nhận:</strong> {selectedOrder.fullName}</p>
                    <p><strong>Số điện thoại:</strong> {selectedOrder.phone}</p>
                    <p className="col-span-2"><strong>Địa chỉ giao:</strong> {selectedOrder.address}</p>
                    {selectedOrder.email && <p className="col-span-2"><strong>Email:</strong> {selectedOrder.email}</p>}
                    {selectedOrder.note && <p className="col-span-2 text-amber-800"><strong>Ghi chú:</strong> {selectedOrder.note}</p>}
                  </div>
                </div>

                {/* Thông tin Thanh Toán */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-2">
                    <Building2 size={16} className="text-blue-600" />
                    <span>Chi Tiết Thanh Toán (VietQR SePay)</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-gray-700 pt-1">
                    <p><strong>Phương thức:</strong> {selectedOrder.paymentMethod === 'BANK_TRANSFER' || selectedOrder.paymentMethod === 'SePay' ? 'Chuyển khoản SePay VietQR' : 'Thanh toán COD'}</p>
                    <p><strong>Trạng thái:</strong> <strong className={selectedOrder.paymentStatus === 'PAID' ? 'text-emerald-700' : 'text-amber-700'}>{selectedOrder.paymentStatus === 'PAID' ? 'ĐÃ THANH TOÁN (PAID)' : 'CHƯA THANH TOÁN'}</strong></p>
                    {selectedOrder.transactionNo && <p><strong>Mã GD Ngân Hàng:</strong> #{selectedOrder.transactionNo}</p>}
                    {selectedOrder.bankCode && <p><strong>Ngân Hàng:</strong> {selectedOrder.bankCode}</p>}
                    {selectedOrder.paidAt && <p className="col-span-2"><strong>Thời gian thanh toán:</strong> {new Date(selectedOrder.paidAt).toLocaleString('vi-VN')}</p>}
                  </div>
                </div>

                {/* Danh sách Sản phẩm */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                    Sản Phẩm Đã Mua ({selectedOrder.orderItems?.length || 0})
                  </h3>

                  <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden bg-white">
                    {(selectedOrder.orderItems || []).map((item, idx) => {
                      const itemImg = formatImageUrl(item.productImage || '/assets/img/product-adidas-1.jpg');
                      return (
                        <div key={idx} className="flex items-center gap-4 p-3 text-xs">
                          <img
                            src={itemImg}
                            alt={item.productName}
                            className="w-14 h-14 object-contain bg-gray-50 rounded-xl border border-gray-200 shrink-0"
                          />
                          <div className="flex-1 space-y-0.5">
                            <h4 className="font-bold text-gray-900 text-sm">{item.productName}</h4>
                            <p className="text-gray-500">Size: {item.productSize || 'Freesize'} | SL: {item.quantity || 1}</p>
                          </div>
                          <div className="text-right font-bold text-gray-900 text-sm whitespace-nowrap">
                            {formatCurrencyVND((item.price || 0) * (item.quantity || 1))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tổng tiền */}
                <div className="bg-gray-100 p-4 rounded-2xl flex justify-between items-center text-sm font-black text-gray-900">
                  <span>TỔNG THÀNH TIỀN:</span>
                  <span className="text-xl text-black">{formatCurrencyVND(selectedOrder.grandTotal)}</span>
                </div>
              </div>

              {/* Footer Modal */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                  Đóng Hộp Thoại
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
