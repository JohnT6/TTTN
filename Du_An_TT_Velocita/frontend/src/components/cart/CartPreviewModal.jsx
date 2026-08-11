import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrencyVND, formatImageUrl } from '../../helpers/helper';

const CartPreviewModal = ({ cartItems = [], totalItems = 0, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 top-full pt-2 w-[350px] z-50 transition-all animate-fade-in text-gray-900 select-none before:content-[''] before:absolute before:-top-3 before:left-0 before:w-full before:h-3">
      {/* Cầu nối vô hình giúp di chuột từ Icon xuống Modal không bao giờ bị mất */}
      <div className="bg-white rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-gray-100 space-y-4">

        {totalItems > 0 ? (
          <div className="space-y-4">
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="font-bold text-base text-gray-900">
                Giỏ hàng ({totalItems})
              </span>
            </div>

            {/* Danh sách sản phẩm xem trước */}
            <div className="space-y-3 max-h-[240px] overflow-y-auto scrollbar-none pr-1">
              {cartItems.map((item, idx) => {
                const prod = item.product || item;
                const pName = prod.name || prod.title || 'Sản phẩm';
                const pImg = formatImageUrl(prod.image || prod.img || item.variant?.image || '/assets/img/product-adidas-1.jpg');
                const pPrice = prod.salePrice || prod.price || item.variant?.price || 0;
                const pSize = item.size || item.variant?.size || 'Tiêu chuẩn';

                return (
                  <div key={item.id || idx} className="flex gap-3 items-start p-2 bg-gray-50/80 rounded-2xl hover:bg-gray-100/80 transition-colors">
                    <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-100">
                      <img
                        src={pImg}
                        alt={pName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-0.5 text-xs text-gray-600 flex-1">
                      <h4 className="font-bold text-sm text-gray-900 line-clamp-1">
                        {pName}
                      </h4>
                      <p className="font-semibold text-gray-700">Kích cỡ: {pSize}</p>
                      <div className="flex justify-between items-center pt-1">
                        <span className="font-extrabold text-black text-xs">
                          {formatCurrencyVND(pPrice)}
                        </span>
                        <span className="text-[11px] font-bold text-gray-500">
                          x{item.quantity || 1}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  onClose();
                  navigate('/cart');
                }}
                className="w-full h-11 border border-gray-300 rounded-full text-xs font-bold text-gray-900 hover:border-black hover:bg-gray-50 transition-colors cursor-pointer bg-white"
              >
                Xem giỏ hàng ({totalItems})
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
                className="w-full h-11 bg-black text-white rounded-full text-xs font-bold hover:bg-gray-800 transition-colors cursor-pointer shadow-sm"
              >
                Thanh toán
              </button>
            </div>
          </div>
        ) : (
          /* Trường hợp Giỏ hàng trống */
          <div className="text-center py-6 space-y-3">
            <p className="text-sm font-bold text-gray-900">Giỏ hàng của bạn đang trống</p>
            <p className="text-xs text-gray-500">Hãy thêm sản phẩm yêu thích vào giỏ hàng ngay nhé!</p>
            <button
              onClick={() => {
                onClose();
                navigate('/product-catalog');
              }}
              className="mt-2 px-6 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Khám phá sản phẩm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPreviewModal;
