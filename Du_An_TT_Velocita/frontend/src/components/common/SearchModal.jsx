import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatCurrencyVND, formatImageUrl } from '../../helpers/helper';

// SVG Icon Close FontAwesome
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 fill-current">
    <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
  </svg>
);

export default function SearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Lấy dữ liệu sản phẩm thực từ Redux Store
  const storeProducts = useSelector((state) => state.products?.items || []);

  // Quản lý hiệu ứng trượt xuống khi mở và trượt ngược lên khi đóng
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = 'unset';
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 350);
  };

  // Xử lý khi bấm phím ENTER: Nhảy sang trang Catalog và trả về kết quả lọc theo từ khóa
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      e.preventDefault();
      handleClose();
      navigate(`/product-catalog?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Lọc sản phẩm thực tế
  const { defaultWomen, defaultMen, searchResults } = useMemo(() => {
    if (!storeProducts || storeProducts.length === 0) {
      return { defaultWomen: [], defaultMen: [], searchResults: [] };
    }

    const term = searchTerm.trim().toLowerCase();

    // Chuẩn hóa mảng sản phẩm
    const formatted = storeProducts.map((p) => {
      const pName = p.name || p.title || '';
      const pBrand = p.brand || p.category?.name || '';
      const pGender = (p.gender || 'UNISEX').toUpperCase();
      const pPrice = p.numericPrice || p.rawPrice || p.price || 0;
      const pImg = formatImageUrl(p.image || p.img || '/assets/img/product-adidas-1.jpg');
      const pTag = p.isBest ? 'Bán chạy' : p.isNew ? 'Mới' : p.isSale ? 'Khuyến mãi' : (pBrand || 'Sản phẩm');

      return {
        id: p.id,
        name: pName,
        tag: pTag,
        gender: pGender,
        price: formatCurrencyVND(pPrice),
        img: pImg,
        rawProduct: p,
      };
    });

    if (!term) {
      // Khi chưa gõ từ khóa: Hiển thị 2 danh sách gợi ý tham khảo Nữ & Nam
      return {
        defaultWomen: formatted.filter((p) => p.gender === 'WOMEN').slice(0, 6),
        defaultMen: formatted.filter((p) => p.gender === 'MEN' || p.gender === 'UNISEX').slice(0, 6),
        searchResults: [],
      };
    }

    // Khi CÓ từ khóa gõ vào: Lọc khớp Tên Sản Phẩm HOẶC Tên Thương Hiệu/Nhãn Hàng (Adidas, Nike, Puma, Asics...)
    const matched = formatted.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(term);
      const tagMatch = p.tag.toLowerCase().includes(term);
      const brandMatch = (p.rawProduct.brand || p.rawProduct.category?.name || '').toLowerCase().includes(term);
      return nameMatch || tagMatch || brandMatch;
    });

    return {
      defaultWomen: [],
      defaultMen: [],
      searchResults: matched.slice(0, 12),
    };
  }, [storeProducts, searchTerm]);

  if (!shouldRender) return null;

  const hasSearchKeyword = Boolean(searchTerm.trim());

  return (
    <div
      className={`fixed inset-0 z-[60] bg-white overflow-y-auto p-6 md:p-10 text-gray-900 select-none transition-all duration-350 ease-in-out transform ${
        isAnimating
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0'
      }`}
    >
      
      {/* 1. Header Top: Logo chính giữa & Nút Đóng Close (SVG FontAwesome) */}
      <div className="relative max-w-[1400px] mx-auto flex items-center justify-between pb-6 mb-4 border-b border-gray-100">
        <div className="w-10"></div>

        {/* Logo thương hiệu */}
        <Link to="/" onClick={handleClose} className="inline-block">
          <img src="/assets/icons/logo.svg" alt="VELOCITÀ" className="h-10 object-contain mx-auto" />
        </Link>

        {/* Nút Đóng Close */}
        <button
          onClick={handleClose}
          className="w-10 h-10 flex items-center justify-center text-gray-800 hover:opacity-60 cursor-pointer transition-opacity"
          title="Đóng tìm kiếm"
        >
          <CloseIcon />
        </button>
      </div>

      {/* 2. Thanh Ô Tìm Kiếm Capsule Trung Tâm */}
      <div className="max-w-2xl mx-auto my-8">
        <div className="relative">
          <input
            type="text"
            autoFocus
            placeholder="Tìm kiếm sản phẩm, giày, quần áo... (Nhấn Enter để xem tất cả)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-13 pl-12 pr-6 border border-gray-300 rounded-full text-sm text-gray-900 outline-none focus:border-black transition-all shadow-sm"
          />
          <svg className="w-5 h-5 fill-current text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
      </div>

      {/* 3. Hiển Thị Sản Phẩm Gợi Ý / Kết Quả Tìm Kiếm */}
      <div className="max-w-[1400px] mx-auto space-y-12 pt-6">

        {/* TH1: KHI CHƯA GÕ TỪ KHÓA -> HIỂN THỊ 2 KHỐI THAM KHẢO DÀNH CHO NỮ & NAM */}
        {!hasSearchKeyword && (
          <>
            {defaultWomen.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-gray-900 tracking-tight">
                  Sản phẩm đắt hàng dành cho nữ
                </h2>
                <div className="grid grid-cols-6 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4">
                  {defaultWomen.map((item) => (
                    <Link
                      key={item.id}
                      to={`/product-detail/${item.id}`}
                      onClick={handleClose}
                      className="group space-y-2 block"
                    >
                      <div className="aspect-square bg-[#f6f6f6] overflow-hidden relative">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-0.5 text-xs">
                        <span className="text-[11px] font-medium text-gray-400 block">{item.tag}</span>
                        <h3 className="font-bold text-gray-900 group-hover:underline line-clamp-1">{item.name}</h3>
                        <span className="font-semibold text-gray-800 block">{item.price}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {defaultMen.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-gray-900 tracking-tight">
                  Sản phẩm đắt hàng dành cho nam
                </h2>
                <div className="grid grid-cols-6 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4">
                  {defaultMen.map((item) => (
                    <Link
                      key={item.id}
                      to={`/product-detail/${item.id}`}
                      onClick={handleClose}
                      className="group space-y-2 block"
                    >
                      <div className="aspect-square bg-[#f6f6f6] overflow-hidden relative">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-0.5 text-xs">
                        <span className="text-[11px] font-medium text-gray-400 block">{item.tag}</span>
                        <h3 className="font-bold text-gray-900 group-hover:underline line-clamp-1">{item.name}</h3>
                        <span className="font-semibold text-gray-800 block">{item.price}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* TH2: KHI ĐÃ GÕ TỪ KHÓA -> CHỈ HIỂN THỊ 1 KHỐI KẾT QUẢ CHUNG KHÔNG CHIA NAM/NỮ */}
        {hasSearchKeyword && (
          searchResults.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-gray-900 tracking-tight">
                Kết quả tìm kiếm cho "{searchTerm.trim()}"
              </h2>

              <div className="grid grid-cols-6 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4">
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product-detail/${item.id}`}
                    onClick={handleClose}
                    className="group space-y-2 block"
                  >
                    <div className="aspect-square bg-[#f6f6f6] overflow-hidden relative">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-0.5 text-xs">
                      <span className="text-[11px] font-medium text-gray-400 block">{item.tag}</span>
                      <h3 className="font-bold text-gray-900 group-hover:underline line-clamp-1">{item.name}</h3>
                      <span className="font-semibold text-gray-800 block">{item.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 space-y-2 text-gray-500">
              <p className="text-base font-bold text-gray-900">Không tìm thấy sản phẩm phù hợp với "{searchTerm.trim()}"</p>
              <p className="text-xs">Vui lòng thử lại với từ khóa khác hoặc bấm Enter để tìm trên danh mục.</p>
            </div>
          )
        )}

      </div>

    </div>
  );
}
