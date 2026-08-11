import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrencyVND, formatImageUrl } from '../../helpers/helper';
import { getProductByIdApi } from '../../services/api';

export default function EditSizeModal({ item, isOpen, onClose, onUpdateSize }) {
  const navigate = useNavigate();

  const [fullProduct, setFullProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialProd = item?.product || item || {};
  const productId = initialProd.id || item?.productId;

  // Tải chi tiết đầy đủ sản phẩm (bao gồm mảng variants) từ DB khi mở modal
  useEffect(() => {
    if (!isOpen || !productId) return;

    let isMounted = true;
    setLoading(true);

    getProductByIdApi(productId)
      .then((res) => {
        if (isMounted && res && res.success && res.data) {
          setFullProduct(res.data);
        }
      })
      .catch(() => {
        // Ignore
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, productId]);

  const prod = fullProduct || initialProd;
  const pName = prod.name || prod.title || 'Sản phẩm VELOCITÀ';
  const pDesc = prod.description || prod.desc || prod.category?.name || 'Giày thể thao cao cấp';
  const pImg = formatImageUrl(prod.image || prod.img || item?.variant?.image || '/assets/img/product-adidas-1.jpg');
  const pPrice = prod.salePrice || prod.price || item?.variant?.price || 0;
  const currentSize = String(item?.size || item?.variant?.size || '');

  const [selectedSize, setSelectedSize] = useState(currentSize);

  useEffect(() => {
    if (currentSize) {
      setSelectedSize(currentSize);
    }
  }, [currentSize, isOpen]);

  const currentColor = item?.color || item?.variant?.color;

  // Map tồn kho thật 100% từ bảng product_variants trong DB theo màu sắc
  const sizeStockMap = useMemo(() => {
    const map = {};
    const variants = prod.variants || [];

    variants.forEach((v) => {
      if (v.size) {
        const s = String(v.size);
        const matchesColor = !currentColor || !v.color || v.color.toLowerCase() === currentColor.toLowerCase();
        if (matchesColor) {
          const stockNum = Number(v.stock);
          map[s] = (map[s] || 0) + (isNaN(stockNum) ? 0 : stockNum);
        }
      }
    });
    return map;
  }, [prod, currentColor]);

  // Danh sách kích cỡ thật 100% lấy từ product_variants trong DB theo màu sắc
  const availableSizeList = useMemo(() => {
    const variants = prod.variants || [];
    const filtered = currentColor
      ? variants.filter((v) => v.color && v.color.toLowerCase() === currentColor.toLowerCase())
      : variants;
    const targetVariants = filtered.length > 0 ? filtered : variants;
    const prodSizes = targetVariants.map((v) => String(v.size)).filter(Boolean);
    const uniqueList = Array.from(new Set(prodSizes));
    return uniqueList.sort((a, b) => parseFloat(a) - parseFloat(b));
  }, [prod, currentColor]);

  // Nếu modal chưa mở hoặc chưa có item thì render rỗng
  if (!isOpen || !item) return null;

  const handleSave = () => {
    if (selectedSize && selectedSize !== currentSize) {
      onUpdateSize(item, selectedSize);
    }
    onClose();
  };

  const handleViewProduct = () => {
    onClose();
    const targetId = prod.slug || prod.id;
    navigate(`/product/${targetId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in select-none">
      <div
        className="bg-white rounded-[32px] w-full max-w-[850px] overflow-hidden shadow-2xl relative flex max-md:flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng X ở góc trên bên phải */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors z-10 cursor-pointer"
          title="Đóng modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* CỘT BÊN TRÁI: Ảnh sản phẩm */}
        <div className="w-1/2 max-md:w-full bg-[#f6f6f6] p-8 flex items-center justify-center min-h-[360px]">
          <img
            src={pImg}
            alt={pName}
            className="w-full h-auto max-h-[300px] object-contain drop-shadow-md"
          />
        </div>

        {/* CỘT BÊN PHẢI: Thông tin & Lưới kích cỡ */}
        <div className="w-1/2 max-md:w-full p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header thông tin sản phẩm */}
            <div className="space-y-1 pr-8">
              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                {pName}
              </h3>
              <p className="text-sm text-gray-500">
                {pDesc}
              </p>
              <p className="text-lg font-bold text-gray-900 pt-1">
                {formatCurrencyVND(pPrice)}
              </p>
            </div>

            {/* Trạng thái đang tải dữ liệu biến thể từ DB */}
            {loading ? (
              <div className="py-8 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Đang tải dữ liệu kích cỡ...
              </div>
            ) : availableSizeList.length > 0 ? (
              /* Lưới hiển thị các ô Kích cỡ từ DB */
              <div className="grid grid-cols-6 gap-2 pt-2 max-h-[220px] overflow-y-auto scrollbar-thin pr-1">
                {availableSizeList.map((sz) => {
                  const stockVal = sizeStockMap[sz] || 0;
                  const isOutOfStock = stockVal <= 0;
                  const isSelected = selectedSize === sz;

                  return (
                    <button
                      key={sz}
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-11 rounded-lg text-xs font-semibold transition-all relative flex items-center justify-center ${
                        isOutOfStock
                          ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed line-through decoration-gray-400'
                          : isSelected
                          ? 'bg-white text-black border-2 border-black font-bold shadow-sm'
                          : 'bg-white text-gray-800 border border-gray-200 hover:border-black cursor-pointer'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="py-6 text-center text-sm text-gray-400 border border-dashed border-gray-200 rounded-2xl">
                Sản phẩm chưa có dữ liệu biến thể kích cỡ trong cơ sở dữ liệu.
              </div>
            )}
          </div>

          {/* Hàng nút bên dưới - Tiếng Việt */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={handleViewProduct}
              className="text-xs font-bold text-gray-900 underline hover:text-gray-600 transition-colors cursor-pointer"
            >
              Xem chi tiết sản phẩm
            </button>

            <button
              disabled={!selectedSize || selectedSize === currentSize}
              onClick={handleSave}
              className={`px-6 py-3 rounded-full text-xs font-bold transition-all ${
                !selectedSize || selectedSize === currentSize
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800 cursor-pointer shadow-md active:scale-95'
              }`}
            >
              Cập nhật sản phẩm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
