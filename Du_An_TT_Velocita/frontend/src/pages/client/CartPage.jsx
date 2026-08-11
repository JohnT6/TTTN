import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCartAsync, updateQuantityAsync, addToCartAsync, removeFromCart, updateQuantity, updateSize, addToCart } from '../../store/cartSlice';
import { formatCurrencyVND, formatImageUrl } from '../../helpers/helper';
import { getCookie } from '../../helpers/cookie';
import EditSizeModal from '../../components/cart/EditSizeModal';

// SVG Icon Thùng Rác (Trash)
const TrashIcon = () => (
  <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

// SVG Icon Trái Tim Đã Nhấn
const HeartSolidIcon = () => (
  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

// SVG Icon Trái Tim Chưa Nhấn
const HeartOutlineIcon = () => (
  <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

// SVG Icon Minus
const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-3 h-3 fill-current">
    <path d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z"/>
  </svg>
);

// SVG Icon Plus
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-3 h-3 fill-current">
    <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
  </svg>
);

// SVG Icon Thông tin (Info)
const InfoIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current text-gray-700 cursor-pointer inline-block ml-1" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy các mặt hàng thực tế từ Redux store
  const cartItems = useSelector((state) => state.cart?.items || []);
  const [favorites, setFavorites] = useState({});

  // State quản lý Modal sửa kích cỡ
  const [editingItem, setEditingItem] = useState(null);

  // Hàm tính đơn giá từng sản phẩm
  const getItemPrice = (item) => {
    const prod = item.product || item;
    return prod.salePrice || prod.price || item.variant?.price || 0;
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const p = getItemPrice(item);
    return acc + p * (item.quantity || 1);
  }, 0);

  // Phí vận chuyển ước tính (Miễn phí toàn bộ)
  const shippingFee = 0;
  const grandTotal = subtotal;

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (item) => {
    if (item.id && !item.id.startsWith('temp_')) {
      dispatch(removeFromCartAsync(item.id));
    }
    dispatch(removeFromCart({ itemId: item.id, productId: item.product?.id, size: item.size }));
  };

  // Cập nhật số lượng
  const handleUpdateQty = (item, newQty) => {
    if (newQty < 1) return;
    if (item.id && !item.id.startsWith('temp_')) {
      dispatch(updateQuantityAsync({ itemId: item.id, quantity: newQty }));
    }
    dispatch(updateQuantity({ itemId: item.id, productId: item.product?.id, size: item.size, quantity: newQty }));
  };

  // Cập nhật Kích cỡ mới từ Modal
  const handleUpdateSize = async (item, newSize) => {
    if (!item || !newSize || item.size === newSize) return;

    const oldSize = item.size;

    // 1. Cập nhật Redux State & LocalStorage ngay lập tức
    dispatch(updateSize({
      itemId: item.id,
      productId: item.product?.id || item.productId,
      oldSize,
      newSize,
    }));

    // 2. Nếu đã đăng nhập / có CSDL, đồng bộ tuần tự với Backend
    if (item.id && !item.id.startsWith('temp_')) {
      const prodId = item.product?.id || item.productId;
      if (prodId) {
        try {
          await dispatch(removeFromCartAsync(item.id)).unwrap();
          await dispatch(addToCartAsync({
            productId: prodId,
            size: newSize,
            color: item.color || item.variant?.color,
            quantity: item.quantity || 1,
          })).unwrap();
        } catch (err) {
          // Ignore
        }
      }
    }
  };

  // Nút Thanh toán thành viên: Kiểm tra người dùng đã đăng nhập chưa từ Cookie
  const handleMemberCheckout = () => {
    const token = getCookie('access_token') || getCookie('token');
    if (token) {
      navigate('/checkout');
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <main className="bg-white text-gray-900 font-sans pt-[100px] pb-24 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 pt-4">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-12 gap-12 items-start max-lg:flex max-lg:flex-col">

            {/* ==================== CỘT TRÁI: GIỎ HÀNG ==================== */}
            <div className="col-span-7 w-full space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Giỏ Hàng ({cartItems.length})
              </h1>

              {cartItems.map((item, idx) => {
                const prod = item.product || item;
                const pName = prod.name || prod.title || 'Sản phẩm VELOCITÀ';
                const pDesc = prod.description || prod.desc || prod.category?.name || 'Sản phẩm chính hãng';
                const pColor = item.color || item.variant?.color || prod.color || 'Tiêu chuẩn';
                const pSize = item.size || item.variant?.size || 'Tiêu chuẩn';
                const pImg = formatImageUrl(prod.image || prod.img || item.variant?.image || '/assets/img/product-adidas-1.jpg');
                const pPrice = getItemPrice(item);
                const currentQty = item.quantity || 1;
                const itemId = item.id || prod.id || idx;
                const isFav = favorites[itemId];

                return (
                  <div key={itemId} className="space-y-6 pb-6 border-b border-gray-200">
                    <div className="flex gap-4 items-start">
                      
                      {/* Ảnh sản phẩm */}
                      <div className="w-36 h-36 bg-[#f6f6f6] shrink-0 overflow-hidden rounded-none">
                        <img
                          src={pImg}
                          alt={pName}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Thông tin sản phẩm & Giá */}
                      <div className="flex-1 space-y-1 text-sm text-gray-600">
                        <div className="flex justify-between items-start">
                          <h2 className="font-bold text-base text-gray-900 leading-snug">
                            {pName}
                          </h2>
                          <span className="font-bold text-base text-gray-900 ml-4 whitespace-nowrap">
                            {formatCurrencyVND(pPrice)}
                          </span>
                        </div>

                        <p className="text-gray-500 line-clamp-1">{pDesc}</p>
                        <p className="text-gray-500">Màu sắc: {pColor}</p>
                        
                        {/* Kích cỡ - Click để mở Modal sửa size */}
                        <p className="text-gray-900 font-medium">
                          Kích cỡ{' '}
                          <button
                            type="button"
                            onClick={() => setEditingItem(item)}
                            className="underline font-bold hover:text-gray-600 transition-colors cursor-pointer"
                            title="Nhấn để đổi kích cỡ"
                          >
                            {pSize}
                          </button>
                        </p>
                      </div>

                    </div>

                    {/* Thanh công cụ số lượng & Nút xóa / yêu thích */}
                    <div className="flex items-center gap-4 pl-1">
                      
                      {/* Nút Xóa Thùng Rác */}
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-black hover:text-black transition-colors cursor-pointer"
                        title="Xóa sản phẩm"
                      >
                        <TrashIcon />
                      </button>

                      {/* Bộ tăng giảm số lượng */}
                      <div className="flex items-center gap-3 px-3 py-1.5 border border-gray-300 rounded-full text-xs font-bold text-gray-900">
                        
                        {/* Nút Giảm */}
                        <button
                          disabled={currentQty <= 1}
                          onClick={() => handleUpdateQty(item, currentQty - 1)}
                          className={`transition-opacity ${
                            currentQty <= 1
                              ? 'opacity-30 cursor-not-allowed'
                              : 'hover:opacity-60 cursor-pointer'
                          }`}
                          title={currentQty <= 1 ? 'Tối thiểu 1 sản phẩm' : 'Giảm số lượng'}
                        >
                          <MinusIcon />
                        </button>

                        <span className="px-1 text-sm font-bold select-none">{currentQty}</span>

                        {/* Nút Tăng */}
                        <button
                          onClick={() => handleUpdateQty(item, currentQty + 1)}
                          className="hover:opacity-60 cursor-pointer transition-opacity"
                          title="Tăng số lượng"
                        >
                          <PlusIcon />
                        </button>

                      </div>

                      {/* Nút Yêu Thích */}
                      <button
                        onClick={() => toggleFavorite(itemId)}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          isFav
                            ? 'bg-black border-black text-white'
                            : 'border-gray-300 text-gray-700 hover:border-black'
                        }`}
                        title="Yêu thích"
                      >
                        {isFav ? <HeartSolidIcon /> : <HeartOutlineIcon />}
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* ==================== CỘT PHẢI: TÓM TẮT ĐƠN HÀNG ==================== */}
            <div className="col-span-5 w-full space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Tóm Tắt Đơn Hàng
              </h2>

              <div className="space-y-4 text-sm font-medium">
                
                {/* Tạm tính */}
                <div className="flex justify-between items-center text-gray-800">
                  <span className="flex items-center">
                    Tạm tính
                    <InfoIcon />
                  </span>
                  <span className="font-bold text-gray-900">{formatCurrencyVND(subtotal)}</span>
                </div>

                {/* Phí vận chuyển */}
                <div className="flex justify-between items-center text-gray-800">
                  <span>Phí vận chuyển ước tính</span>
                  <span className="font-bold text-gray-900">Miễn phí</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center text-base font-bold text-gray-900">
                    <span>Tổng cộng</span>
                    <span>{formatCurrencyVND(grandTotal)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 space-y-3">
                  
                  {/* Nút Thanh Toán Khách Vãng Lai */}
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full h-12 bg-black text-white border border-black text-xs font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer shadow-sm active:scale-98"
                  >
                    Thanh toán khách vãng lai
                  </button>

                  {/* Nút Thanh Toán Thành Viên - Kiểm tra Đăng nhập */}
                  <button
                    onClick={handleMemberCheckout}
                    className="w-full h-12 bg-black text-white border border-black text-xs font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer shadow-sm active:scale-98"
                  >
                    Thanh toán thành viên
                  </button>

                </div>

              </div>
            </div>

          </div>
        ) : (
          /* TRƯỜNG HỢP GIỎ HÀNG TRỐNG */
          <div className="text-center py-24 space-y-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-900">Giỏ Hàng Của Bạn Đang Trống</h1>
            <p className="text-sm text-gray-500">Chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá bộ sưu tập giày thể thao cao cấp của VELOCITÀ ngay hôm nay!</p>
            <button
              onClick={() => navigate('/product-catalog')}
              className="mt-4 px-8 py-3.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-800 transition-colors cursor-pointer shadow-md"
            >
              Khám phá sản phẩm
            </button>
          </div>
        )}
      </div>

      {/* Modal Chỉnh Sửa Kích Cỡ */}
      <EditSizeModal
        isOpen={Boolean(editingItem)}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onUpdateSize={handleUpdateSize}
      />
    </main>
  );
}
