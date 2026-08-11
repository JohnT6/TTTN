import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartSlice';
import { createOrderAPI, checkOrderStatusAPI } from '../../services/api';
import ToastNotification from '../../components/common/ToastNotification';
import { Loader2, Copy, CheckCircle2, Clock, ArrowLeft, RefreshCw, AlertTriangle, XCircle } from 'lucide-react';
import { formatImageUrl, toRelativePath } from '../../helpers/helper';

// SVG Icon Thông tin Info
const InfoIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current text-gray-700 cursor-pointer inline-block ml-1" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth || {});

  // State phương thức thanh toán
  const [paymentMethod, setPaymentMethod] = useState('BANK_TRANSFER'); // 'BANK_TRANSFER' (SePay) hoặc 'COD'

  // State thông tin khách hàng giao hàng
  const [formData, setFormData] = useState({
    fullName: user?.fullName || user?.full_name || user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || '',
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // State đơn hàng và Modal QR SePay
  const [createdOrder, setCreatedOrder] = useState(null);
  const [qrInfo, setQrInfo] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isPaymentPaid, setIsPaymentPaid] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  // State Đồng hồ đếm ngược 15 phút & Trạng thái Hết hạn/Thất bại
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 phút = 900 giây
  const [isExpired, setIsExpired] = useState(false);

  // Lấy các mặt hàng từ Redux store giỏ hàng
  const reduxCartItems = useSelector((state) => state.cart?.items || []);
  const cartItems = reduxCartItems.length > 0 ? reduxCartItems : [];

  const parsePrice = (priceStr, rawPrice) => {
    if (rawPrice !== undefined && rawPrice !== null) return rawPrice;
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    return parseInt(String(priceStr).replace(/[^0-9]/g, ''), 10) || 0;
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const p = parsePrice(item.product?.price || item.price, item.product?.rawPrice);
    return acc + p * (item.quantity || 1);
  }, 0);

  const shippingFee = 0; // Miễn phí vận chuyển cho tất cả đơn hàng
  const grandTotal = subtotal;

  const formatCurrency = (val) => {
    return (val || 0).toLocaleString('vi-VN') + 'đ';
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toast State
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  // Sao chép thông tin chuyển khoản (STK, Nội dung CK, Số tiền)
  const handleCopyText = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Gửi đơn hàng lên Backend
  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      showToast('warning', 'Thiếu thông tin', 'Vui lòng điền đầy đủ Họ và Tên, Số điện thoại và Địa chỉ giao hàng!');
      return;
    }

    if (cartItems.length === 0) {
      showToast('warning', 'Giỏ hàng trống', 'Bạn chưa có sản phẩm nào trong giỏ hàng.');
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      userId: user?.id || null,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || null,
      address: formData.address.trim(),
      note: formData.note.trim() || null,
      subtotal,
      shippingFee,
      grandTotal,
      paymentMethod,
      items: cartItems.map((item) => ({
        productId: item.product?.id || item.productId || null,
        productName: item.product?.name || item.product?.title || 'Sản phẩm VELOCITÀ',
        productImage: toRelativePath(item.product?.image || item.product?.img || (item.product?.images && item.product.images[0]?.url)) || null,
        productSize: item.size || 'Freesize',
        productColor: item.color || null,
        price: parsePrice(item.product?.price || item.price, item.product?.rawPrice),
        quantity: item.quantity || 1,
      })),
    };

    try {
      const res = await createOrderAPI(orderPayload);
      if (res && res.success && res.data) {
        const orderData = res.data.order;
        const qrData = res.data.qrInfo;

        setCreatedOrder(orderData);

        if (paymentMethod === 'BANK_TRANSFER' && qrData) {
          setQrInfo(qrData);
          setTimeLeft(15 * 60); // Đặt lại đồng hồ 15 phút
          setIsExpired(false);
          setIsPaymentPaid(false);
          setShowQrModal(true);
          showToast('success', 'Đã khởi tạo mã VietQR!', 'Vui lòng quét mã VietQR bên dưới để tự động thanh toán qua SePay.');
        } else {
          // Thanh toán COD
          dispatch(clearCart());
          showToast('success', 'Đặt hàng thành công!', 'Cảm ơn bạn đã mua hàng tại VELOCITÀ Store.');
          setTimeout(() => navigate('/'), 1500);
        }
      } else {
        showToast('error', 'Lỗi tạo đơn hàng', res?.message || 'Không thể khởi tạo đơn hàng.');
      }
    } catch (err) {
      showToast('error', 'Lỗi hệ thống', err.message || 'Lỗi khi kết nối với server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Đồng hồ đếm ngược 15 phút cho mã QR thanh toán SePay
  useEffect(() => {
    let timer = null;
    if (showQrModal && !isPaymentPaid && !isExpired) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsExpired(true);
            showToast('error', 'Hết hạn thời gian thanh toán', 'Mã QR thanh toán 15 phút đã hết hạn. Đơn hàng chưa được thanh toán.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showQrModal, isPaymentPaid, isExpired]);

  // Polling Tự Động Kiểm Tra Trạng Thái Gạch Nợ từ SePay Webhook
  useEffect(() => {
    let intervalId = null;

    if (showQrModal && createdOrder && !isPaymentPaid && !isExpired) {
      intervalId = setInterval(async () => {
        try {
          const res = await checkOrderStatusAPI(createdOrder.id);
          if (res && res.success && res.data) {
            if (res.data.isPaid || res.data.paymentStatus === 'PAID') {
              setIsPaymentPaid(true);
              clearInterval(intervalId);
              dispatch(clearCart());
              showToast(
                'success',
                'Thanh toán SePay thành công!',
                `Hệ thống đã tự động xác nhận thanh toán đơn hàng ${res.data.code}. Cảm ơn bạn!`
              );
              setTimeout(() => {
                setShowQrModal(false);
                navigate('/');
              }, 2500);
            }
          }
        } catch (err) {
          // Ignore
        }
      }, 3000); // Polling mỗi 3 giây
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [showQrModal, createdOrder, isPaymentPaid, isExpired, dispatch, navigate]);

  // Khóa cuộn trang khi bật Modal QR SePay
  useEffect(() => {
    if (showQrModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showQrModal]);

  return (
    <main className="bg-white text-gray-900 font-sans pt-[100px] pb-24 min-h-screen">
      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Breadcrumb quay lại Giỏ hàng */}
        <div className="mb-6">
          <Link to="/cart" className="text-xs font-bold text-gray-600 hover:text-black flex items-center gap-1.5">
            <ArrowLeft size={14} />
            <span className="underline">Quay lại giỏ hàng</span>
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-12 items-start max-lg:flex max-lg:flex-col">
          {/* ==================== CỘT TRÁI: FORM THÔNG TIN GIAO HÀNG & PHƯƠNG THỨC THANH TOÁN ==================== */}
          <div className="col-span-7 w-full space-y-10">
            {/* 1. THÔNG TIN GIAO HÀNG */}
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight border-b border-gray-200 pb-3">
                Thông Tin Giao Hàng
              </h1>

              <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-4">
                {/* Họ và Tên */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Họ và Tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Nhập họ và tên người nhận"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-black transition-colors font-medium"
                  />
                </div>

                {/* Số Điện Thoại & Email */}
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Số Điện Thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-black transition-colors font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Email (Tùy chọn)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="nhapemail@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-black transition-colors font-medium"
                    />
                  </div>
                </div>

                {/* Địa Chỉ Giao Hàng */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Địa Chỉ Giao Hàng (Số nhà, Tên đường, Phường/Xã, Quận/Huyện) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="Ví dụ: 123 Đường Nguyễn Trãi, Phường 2, Quận 5, TP.HCM"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-black transition-colors font-medium"
                  />
                </div>

                {/* Ghi Chú Đơn Hàng */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Ghi Chú Đơn Hàng (Tùy chọn)
                  </label>
                  <textarea
                    name="note"
                    rows="2"
                    placeholder="Lưu ý cho người giao hàng..."
                    value={formData.note}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-black transition-colors resize-none font-medium"
                  ></textarea>
                </div>
              </form>
            </div>

            {/* 2. PHƯƠNG THỨC THANH TOÁN (SEPAY QR & COD) */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                Phương Thức Thanh Toán
              </h2>

              <p className="text-xs text-gray-500">
                Chọn hình thức thanh toán thuận tiện nhất cho bạn.
              </p>

              <div className="space-y-3">
                {/* Lựa chọn 1: Chuyển khoản VietQR SePay Tự Động */}
                <label
                  onClick={() => setPaymentMethod('BANK_TRANSFER')}
                  className={`border-2 p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'BANK_TRANSFER'
                      ? 'border-black bg-gray-50/80 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-10 rounded-xl bg-white border border-gray-200 p-1 shrink-0 flex items-center justify-center overflow-hidden shadow-2xs">
                      <img
                        src={formatImageUrl('/assets/imgs/logo-sepay-color-in-white.jpg')}
                        alt="Logo SePay"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                        <span>Chuyển khoản Ngân hàng tự động (VietQR SePay)</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          Khuyên dùng
                        </span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Tự động xác nhận thanh toán ngay lập tức bằng ứng dụng Ngân hàng (VietinBank, MBBank, Vietcombank...)
                      </p>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    paymentMethod === 'BANK_TRANSFER' ? 'border-black bg-black' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'BANK_TRANSFER' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                </label>

                {/* Lựa chọn 2: Thanh toán khi nhận hàng COD */}
                <label
                  onClick={() => setPaymentMethod('COD')}
                  className={`border-2 p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-black bg-gray-50/80 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center font-bold text-xs shrink-0 border border-gray-200">
                      COD
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">
                        Thanh toán khi nhận hàng (COD)
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Thanh toán bằng tiền mặt trực tiếp cho shipper khi nhận hàng
                      </p>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    paymentMethod === 'COD' ? 'border-black bg-black' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'COD' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* ==================== CỘT PHẢI: TÓM TẮT ĐƠN HÀNG ==================== */}
          <div className="col-span-5 w-full sticky top-24 self-start space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight border-b border-gray-200 pb-3">
              Tóm Tắt Đơn Hàng
            </h2>

            {/* Chi tiết tính giá */}
            <div className="space-y-3 text-sm font-medium">
              {/* Tạm tính */}
              <div className="flex justify-between items-center text-gray-700">
                <span className="flex items-center">
                  Tạm tính
                  <InfoIcon />
                </span>
                <span className="font-bold text-gray-900">{formatCurrency(subtotal)}</span>
              </div>

              {/* Phí vận chuyển */}
              <div className="flex justify-between items-center text-gray-700">
                <span>Phí vận chuyển</span>
                <span className="font-bold text-gray-900">Miễn phí</span>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center text-base font-bold text-gray-900">
                  <span>Tổng cộng</span>
                  <span className="text-lg text-black">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>

            {/* Danh sách các sản phẩm thu nhỏ trong đơn hàng */}
            <div className="border-t border-gray-200 pt-4 space-y-3 max-h-[220px] overflow-y-auto pr-1">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                Sản phẩm trong đơn ({cartItems.length})
              </span>

              {cartItems.map((item, idx) => {
                const prod = item.product || {};
                const prodImg = prod.image || prod.img || (prod.images && prod.images[0]?.url) || '/assets/img/product-adidas-1.jpg';
                const prodName = prod.name || prod.title || 'Sản phẩm VELOCITÀ';
                const itemPrice = parsePrice(prod.price || item.price, prod.rawPrice);

                return (
                  <div key={idx} className="flex items-center gap-3 text-xs bg-white p-2.5 rounded-xl border border-gray-200">
                    <img
                      src={formatImageUrl(prodImg)}
                      alt={prodName}
                      className="w-12 h-12 object-contain bg-gray-100 rounded-lg shrink-0 border border-gray-200"
                    />
                    <div className="flex-1 space-y-0.5 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate">{prodName}</h4>
                      <p className="text-gray-500">Size: {item.size || 'Freesize'} | SL: {item.quantity || 1}</p>
                    </div>
                    <span className="font-bold text-gray-900 whitespace-nowrap">
                      {formatCurrency(itemPrice * (item.quantity || 1))}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Nút Đặt Hàng */}
            <div className="pt-2">
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full h-12 bg-black text-white border border-black text-xs font-bold rounded-full hover:bg-gray-800 transition-all duration-300 cursor-pointer shadow-md active:scale-98 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-white" />
                    <span>ĐANG KHỞI TẠO ĐƠN HÀNG...</span>
                  </>
                ) : paymentMethod === 'BANK_TRANSFER' ? (
                  'ĐẶT HÀNG & QUÉT MÃ SEPAY QR'
                ) : (
                  'ĐẶT HÀNG THANH TOÁN COD'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MODAL MÃ QR VIETQR SEPAY TỰ ĐỘNG ==================== */}
      {showQrModal && qrInfo &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 max-w-lg w-full text-center space-y-5 shadow-2xl relative border border-gray-100 max-h-[92vh] overflow-y-auto">
              {/* Header Modal */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 p-1 shrink-0 flex items-center justify-center overflow-hidden shadow-2xs">
                    <img
                      src={formatImageUrl('/assets/imgs/logo-sepay-color-in-white.jpg')}
                      alt="Logo SePay"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-black text-gray-900 leading-tight">Thanh Toán VietQR SePay</h3>
                    <p className="text-[11px] text-gray-400 font-mono">Mã đơn: #{qrInfo.orderCode}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowQrModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-black hover:bg-gray-200 font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Đồng hồ đếm ngược 15 phút */}
              {!isPaymentPaid && !isExpired && (
                <div className="flex items-center justify-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 py-2.5 px-4 rounded-2xl text-xs font-bold shadow-2xs">
                  <Clock size={16} className="animate-spin text-amber-600 shrink-0" />
                  <span>Thời gian còn lại để quét mã QR:</span>
                  <span className="font-mono text-sm text-red-600 font-black tracking-wider bg-white px-2 py-0.5 rounded-md border border-amber-200 shadow-2xs">
                    {formatTimer(timeLeft)}
                  </span>
                </div>
              )}

              {/* TRẠNG THÁI 1: THANH TOÁN THÀNH CÔNG */}
              {isPaymentPaid ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3 animate-fade-in text-center">
                  <CheckCircle2 size={48} className="text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-black text-emerald-900">THANH TOÁN THÀNH CÔNG!</h4>
                  <p className="text-xs text-emerald-700 font-medium">
                    Hệ thống đã nhận được tiền từ SePay và tự động xác nhận thanh toán thành công cho đơn hàng #{qrInfo.orderCode}.
                  </p>
                </div>
              ) : isExpired ? (
                /* TRẠNG THÁI 2: THANH TOÁN THẤT BẠI / HẾT HẠN THỜI GIAN */
                <div className="p-6 bg-red-50 border border-red-200 rounded-2xl space-y-4 animate-fade-in text-center">
                  <XCircle size={48} className="text-red-600 mx-auto" />
                  <h4 className="text-lg font-black text-red-900">THANH TOÁN THẤT BẠI / HẾT HẠN!</h4>
                  <p className="text-xs text-red-700 font-medium leading-relaxed">
                    Mã QR thanh toán đơn hàng <strong className="text-red-900">#{qrInfo.orderCode}</strong> đã vượt quá thời gian quy định (15 phút).
                    Giao dịch chuyển khoản qua mã này không còn được tự động xác nhận thanh toán.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowQrModal(false);
                      showToast('info', 'Tạo đơn mới', 'Vui lòng thực hiện đặt lại đơn hàng mới.');
                    }}
                    className="h-10 px-6 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Đặt Lại Đơn Hàng Mới
                  </button>
                </div>
              ) : (
                /* TRẠNG THÁI 3: CHỜ QUÉT MÃ QR */
                <>
                  <p className="text-xs text-gray-600">
                    Mở ứng dụng Ngân hàng (VietinBank, MBBank, Vietcombank...) quét mã QR để thanh toán tự động số tiền{' '}
                    <strong className="text-black font-extrabold text-sm">{formatCurrency(qrInfo.amount)}</strong>.
                  </p>

                  {/* Ảnh Mã QR VietQR SePay Sinh Tự Động */}
                  <div className="w-64 h-64 mx-auto bg-white p-3 rounded-2xl border-2 border-black/10 shadow-inner flex items-center justify-center relative group">
                    <img
                      src={qrInfo.qrUrl}
                      alt={`Mã VietQR ${qrInfo.orderCode}`}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>

                  {/* Chi Tiết Thông Tin Chuyển Khoản */}
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-left space-y-2.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Ngân hàng:</span>
                      <span className="font-bold text-gray-900">VietinBank (Công Thương Việt Nam)</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Số tài khoản:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-gray-900 text-sm">100871162176</span>
                        <button
                          type="button"
                          onClick={() => handleCopyText('100871162176', 'stk')}
                          className="p-1 text-gray-500 hover:text-black transition-colors cursor-pointer"
                          title="Sao chép STK"
                        >
                          {copiedField === 'stk' ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Chủ tài khoản:</span>
                      <span className="font-bold text-gray-900">TRAN PHUOC THANH</span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-gray-500">Nội dung CK (Bắt buộc):</span>
                      <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg">
                        <span className="font-mono font-black text-red-600 text-sm">SEVQR {qrInfo.orderCode}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(`SEVQR ${qrInfo.orderCode}`, 'code')}
                          className="p-1 text-gray-500 hover:text-black transition-colors cursor-pointer"
                          title="Sao chép nội dung CK"
                        >
                          {copiedField === 'code' ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Polling Lắng Nghe Trạng Thái Chờ SePay Webhook */}
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-600 bg-slate-50 py-2.5 px-4 rounded-xl border border-slate-200">
                    <RefreshCw size={14} className="animate-spin text-blue-600 shrink-0" />
                    <span>Đang chờ SePay xác nhận chuyển khoản tự động...</span>
                  </div>
                </>
              )}

              {/* Nút đóng */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowQrModal(false)}
                  className="w-full h-11 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Đóng Hộp Thoại
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}
