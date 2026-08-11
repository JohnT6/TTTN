import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ShoppingBag,
  RefreshCw,
  X,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  XCircle,
  CreditCard,
  Building2,
} from 'lucide-react';
import { getOrdersAPI, updateOrderStatusAPI } from '../../services/api';
import ToastNotification from '../../components/common/ToastNotification';
import { formatCurrencyVND, formatImageUrl } from '../../helpers/helper';

// SVG Icon Kính lúp tìm kiếm đồng bộ với các trang Quản lý khác
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 fill-current">
    <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
  </svg>
);

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal Chi Tiết Đơn Hàng
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Toast Notifications
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  // Nạp danh sách đơn hàng thực tế từ Backend API CSDL MySQL
  const loadOrders = async () => {
    setLoading(true);
    try {
      let queryStr = '';
      const params = [];
      if (statusFilter !== 'all') params.push(`status=${statusFilter}`);
      if (searchTerm.trim()) params.push(`search=${encodeURIComponent(searchTerm.trim())}`);
      if (params.length > 0) queryStr = params.join('&');

      const res = await getOrdersAPI(queryStr);
      if (res && res.success && res.data) {
        const list = Array.isArray(res.data) ? res.data : res.data.items || [];
        setOrders(list);
      }
    } catch (err) {
      showToast('error', 'Lỗi nạp đơn hàng', err.message || 'Không thể tải danh sách đơn hàng từ CSDL.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  // Cập nhật trạng thái xử lý đơn hàng (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await updateOrderStatusAPI(orderId, newStatus);
      if (res && res.success) {
        showToast('success', 'Cập nhật trạng thái', `Đã chuyển đơn hàng sang trạng thái ${newStatus}.`);
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
        }
        await loadOrders();
      }
    } catch (err) {
      showToast('error', 'Lỗi cập nhật', err.message || 'Không thể thay đổi trạng thái đơn hàng.');
    }
  };

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

  // Helper render Badge Trạng Thái Đơn Hàng
  const renderOrderStatusBadge = (statusStr) => {
    switch (statusStr) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-bold">
            <Clock size={13} className="text-amber-600" />
            <span>Chờ xử lý</span>
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-bold">
            <RefreshCw size={13} className="text-blue-600 animate-spin" />
            <span>Đang chuẩn bị hàng</span>
          </span>
        );
      case 'SHIPPED':
        return (
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-800 border border-indigo-200 px-2.5 py-1 rounded-full text-xs font-bold">
            <Truck size={13} className="text-indigo-600" />
            <span>Đang giao hàng</span>
          </span>
        );
      case 'DELIVERED':
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-bold">
            <PackageCheck size={13} className="text-emerald-600" />
            <span>Đã giao thành công</span>
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 rounded-full text-xs font-bold">
            <XCircle size={13} className="text-red-600" />
            <span>Đã hủy đơn</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 border border-gray-200 px-2.5 py-1 rounded-full text-xs font-bold">
            <span>{statusStr}</span>
          </span>
        );
    }
  };

  // Helper render Badge Trạng Thái Thanh Toán
  const renderPaymentBadge = (paymentStatus, paymentMethod) => {
    const isPaid = paymentStatus === 'PAID';
    return (
      <div className="space-y-1">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black border ${
            isPaid
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}
        >
          {isPaid ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Clock size={12} className="text-amber-600" />}
          <span>{isPaid ? 'ĐÃ THANH TOÁN' : 'CHƯA THANH TOÁN'}</span>
        </span>
        <p className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
          <CreditCard size={11} />
          <span>{paymentMethod === 'BANK_TRANSFER' || paymentMethod === 'SePay' ? 'VietQR SePay' : 'Tiền mặt (COD)'}</span>
        </p>
      </div>
    );
  };

  // Tính toán thống kê nhanh
  const totalRevenue = orders.reduce((sum, o) => (o.paymentStatus === 'PAID' ? sum + (o.grandTotal || 0) : sum), 0);
  const pendingCount = orders.filter((o) => o.status === 'PENDING' || o.status === 'PROCESSING').length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản Lý Đơn Hàng VELOCITÀ</h1>
          <p className="text-xs text-gray-500 mt-1">
            Theo dõi, cập nhật trạng thái giao hàng và xác nhận thanh toán trực tiếp từ SePay Webhook CSDL.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadOrders}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 transition-all cursor-pointer flex items-center gap-2 text-xs font-bold"
            title="Làm mới danh sách đơn hàng"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Tải lại dữ liệu</span>
          </button>
        </div>
      </div>

      {/* Thẻ Thống Kê Nhanh */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tổng Đơn Hàng</p>
          <p className="text-2xl font-black text-gray-900">{orders.length} <span className="text-xs font-normal text-gray-400">đơn</span></p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Đơn Cần Xử Lý</p>
          <p className="text-2xl font-black text-amber-600">{pendingCount} <span className="text-xs font-normal text-gray-400">đơn chờ</span></p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Doanh Thu Đã Thu</p>
          <p className="text-2xl font-black text-emerald-600">{formatCurrencyVND(totalRevenue)}</p>
        </div>
      </div>

      {/* Thanh Tìm kiếm & Lọc Trạng thái */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loadOrders();
          }}
          className="relative max-w-md w-full"
        >
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo Mã đơn (VEL...), Tên khách hàng, SĐT, Email..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-9 py-2.5 text-xs text-gray-900 font-medium placeholder-gray-400 outline-none focus:border-black focus:bg-white transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                loadOrders();
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black cursor-pointer"
              title="Xóa từ khóa"
            >
              <X size={14} />
            </button>
          )}
        </form>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Trạng Thái:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-900 outline-none focus:border-black focus:bg-white transition-colors cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="PENDING">PENDING (Chờ xử lý)</option>
            <option value="PROCESSING">PROCESSING (Đang chuẩn bị)</option>
            <option value="SHIPPED">SHIPPED (Đang giao hàng)</option>
            <option value="DELIVERED">DELIVERED (Đã giao hàng)</option>
            <option value="CANCELLED">CANCELLED (Đã hủy)</option>
          </select>
        </div>
      </div>

      {/* Bảng Danh sách Đơn hàng */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-900 uppercase text-xs font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Mã Đơn Hàng</th>
                <th className="p-4">Khách Hàng & Giao Hàng</th>
                <th className="p-4">Thanh Toán (SePay/COD)</th>
                <th className="p-4">Trạng Thái Đơn Hàng</th>
                <th className="p-4">Tổng Tiền</th>
                <th className="p-4 text-right">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-xs text-gray-400 font-semibold">
                    Đang nạp danh sách đơn hàng từ CSDL MySQL...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-xs text-gray-500 font-semibold">
                    {searchTerm
                      ? `Không tìm thấy đơn hàng nào khớp với từ khóa "${searchTerm}".`
                      : 'Chưa có đơn hàng nào trong hệ thống.'}
                  </td>
                </tr>
              ) : (
                orders.map((o) => {
                  const itemsCount = o.orderItems?.length || 0;
                  const dateFormatted = o.createdAt
                    ? new Date(o.createdAt).toLocaleString('vi-VN')
                    : 'Mới tạo';

                  return (
                    <tr key={o.id} className="hover:bg-gray-50/80 transition-colors">
                      {/* Mã đơn */}
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <p className="font-mono font-black text-black text-sm">#{o.code}</p>
                          <p className="text-[11px] text-gray-400 font-medium">{dateFormatted}</p>
                        </div>
                      </td>

                      {/* Khách hàng */}
                      <td className="p-4">
                        <div className="space-y-0.5 max-w-[220px]">
                          <p className="font-bold text-gray-900 truncate">{o.fullName}</p>
                          <p className="text-xs font-mono text-gray-600">{o.phone}</p>
                          <p className="text-[11px] text-gray-400 truncate">{o.address}</p>
                        </div>
                      </td>

                      {/* Thanh toán */}
                      <td className="p-4">
                        {renderPaymentBadge(o.paymentStatus, o.paymentMethod)}
                      </td>

                      {/* Trạng thái đơn hàng Dropdown đổi trực tiếp */}
                      <td className="p-4">
                        <div className="space-y-1.5">
                          {renderOrderStatusBadge(o.status)}

                          <div>
                            <select
                              value={o.status}
                              onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                              className="text-[11px] font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg px-2 py-1 outline-none cursor-pointer transition-colors"
                            >
                              <option value="PENDING">Chuyển: PENDING</option>
                              <option value="PROCESSING">Chuyển: PROCESSING</option>
                              <option value="SHIPPED">Chuyển: SHIPPED</option>
                              <option value="DELIVERED">Chuyển: DELIVERED</option>
                              <option value="CANCELLED">Chuyển: CANCELLED</option>
                            </select>
                          </div>
                        </div>
                      </td>

                      {/* Tổng tiền */}
                      <td className="p-4 whitespace-nowrap">
                        <p className="font-black text-gray-900 text-sm">{formatCurrencyVND(o.grandTotal)}</p>
                        <p className="text-[11px] text-gray-400">{itemsCount} món sản phẩm</p>
                      </td>

                      {/* Thao tác Xem Chi Tiết */}
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(o)}
                          className="px-3 py-1.5 bg-black hover:bg-gray-800 text-white text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Eye size={14} />
                          <span>Xem chi tiết</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL CHI TIẾT ĐƠN HÀNG */}
      {selectedOrder &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl relative border border-gray-100 max-h-[85vh] flex flex-col overflow-hidden">
              {/* Header Modal (Cố định phía trên) */}
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
                {/* Thông tin Khách hàng & Giao hàng */}
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-200 pb-2">
                    Thông Tin Giao Hàng
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-gray-700 pt-1">
                    <p><strong>Người nhận:</strong> {selectedOrder.fullName}</p>
                    <p><strong>Số điện thoại:</strong> {selectedOrder.phone}</p>
                    <p className="col-span-2"><strong>Địa chỉ giao:</strong> {selectedOrder.address}</p>
                    {selectedOrder.email && <p className="col-span-2"><strong>Email:</strong> {selectedOrder.email}</p>}
                    {selectedOrder.note && <p className="col-span-2 text-amber-800"><strong>Ghi chú:</strong> {selectedOrder.note}</p>}
                  </div>
                </div>

                {/* Thông tin Thanh toán SePay / COD */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-2">
                    <Building2 size={16} className="text-blue-600" />
                    <span>Trạng Thái Thanh Toán (SePay / Bank)</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-gray-700 pt-1">
                    <p><strong>Hình thức:</strong> {selectedOrder.paymentMethod === 'BANK_TRANSFER' || selectedOrder.paymentMethod === 'SePay' ? 'Chuyển khoản SePay VietQR' : 'Thanh toán COD'}</p>
                    <p><strong>Trạng thái:</strong> <strong className={selectedOrder.paymentStatus === 'PAID' ? 'text-emerald-700' : 'text-amber-700'}>{selectedOrder.paymentStatus === 'PAID' ? 'ĐÃ THANH TOÁN (PAID)' : 'CHƯA THANH TOÁN'}</strong></p>
                    {selectedOrder.transactionNo && <p><strong>Mã GD Ngân Hàng:</strong> #{selectedOrder.transactionNo}</p>}
                    {selectedOrder.bankCode && <p><strong>Ngân Hàng:</strong> {selectedOrder.bankCode}</p>}
                    {selectedOrder.paidAt && <p className="col-span-2"><strong>Thời gian thanh toán:</strong> {new Date(selectedOrder.paidAt).toLocaleString('vi-VN')}</p>}
                  </div>
                </div>

                {/* Danh sách Sản phẩm trong đơn hàng */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                    Sản Phẩm Trong Đơn ({selectedOrder.orderItems?.length || 0})
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

                {/* Tổng cộng tiền */}
                <div className="bg-gray-100 p-4 rounded-2xl flex justify-between items-center text-sm font-black text-gray-900">
                  <span>TỔNG THÀNH TIỀN ĐƠN HÀNG:</span>
                  <span className="text-xl text-black">{formatCurrencyVND(selectedOrder.grandTotal)}</span>
                </div>
              </div>

              {/* Footer Modal (Cố định phía dưới) */}
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
