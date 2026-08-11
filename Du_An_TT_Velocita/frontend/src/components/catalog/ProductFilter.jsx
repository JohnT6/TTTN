import React, { useState, useRef, useEffect } from 'react';

// Icon Mũi tên xuống SVG FontAwesome
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    className="w-4 h-4 fill-current"
  >
    <path d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z" />
  </svg>
);

const ProductFilter = ({
  isOpen,
  onClose,
  filters = {},
  onApplyFilters,
  onResetFilters,
}) => {
  // Trạng thái mở/gập các mục Accordion
  const [openSections, setOpenSections] = useState({
    category: true,
    color: true,
    size: true,
    price: true,
    sort: true,
  });

  const absoluteMinPrice = 75000;
  const absoluteMaxPrice = 12490000;

  // Local state lưu các giá trị filter tạm thời
  const [selectedBrands, setSelectedBrands] = useState(filters?.brands || []);
  const [selectedSizes, setSelectedSizes] = useState(filters?.sizes || []);
  const [selectedColors, setSelectedColors] = useState(filters?.colors || []);
  const [minPrice, setMinPrice] = useState(
    filters?.minPrice !== null && filters?.minPrice !== undefined ? filters.minPrice : absoluteMinPrice
  );
  const [maxPrice, setMaxPrice] = useState(
    filters?.maxPrice !== null && filters?.maxPrice !== undefined ? filters.maxPrice : absoluteMaxPrice
  );
  const [sortBy, setSortBy] = useState(filters?.sortBy || 'newest');

  const sliderTrackRef = useRef(null);

  // Đồng bộ filters prop bên ngoài khi chuyển URL hay đổi bộ lọc
  useEffect(() => {
    if (filters) {
      if (filters.brands) setSelectedBrands(filters.brands);
      if (filters.sizes) setSelectedSizes(filters.sizes);
      if (filters.colors) setSelectedColors(filters.colors);
      if (filters.minPrice !== null && filters.minPrice !== undefined) {
        setMinPrice(filters.minPrice);
      } else {
        setMinPrice(absoluteMinPrice);
      }
      if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
        setMaxPrice(filters.maxPrice);
      } else {
        setMaxPrice(absoluteMaxPrice);
      }
      if (filters.sortBy) setSortBy(filters.sortBy);
    }
  }, [filters]);

  // Khóa scroll trang background đằng sau khi mở Drawer để chống scroll lan
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const brandsList = [
    { id: 'nike', name: 'Nike' },
    { id: 'adidas', name: 'Adidas' },
    { id: 'puma', name: 'Puma' },
    { id: 'asics', name: 'Asics' },
  ];

  const sizesList = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

  // Danh sách màu sắc
  const colorsList = [
    { id: 'be', name: 'Be', hex: '#e8d8c8' },
    { id: 'bac', name: 'Bạc', bg: 'linear-gradient(135deg, #e0e0e0 0%, #9e9e9e 100%)' },
    { id: 'cam', name: 'Cam', hex: '#ff7f00' },
    { id: 'hong', name: 'Hồng', hex: '#ff1493' },
    { id: 'nau', name: 'Nâu', hex: '#5c3a21' },
    { id: 'trang', name: 'Trắng', hex: '#ffffff', border: true },
    { id: 'tim', name: 'Tím', hex: '#4b0082' },
    { id: 'vang', name: 'Vàng', hex: '#ffd700' },
    { id: 'xanhduong', name: 'Xanh dương', hex: '#0066cc' },
    { id: 'xanhla', name: 'Xanh lá', hex: '#008000' },
    { id: 'xam', name: 'Xám', hex: '#808080' },
    { id: 'den', name: 'Đen', hex: '#000000' },
  ];

  const sortOptions = [
    { id: 'price_asc', label: 'Giá (thấp - cao)' },
    { id: 'newest', label: 'Mới nhất trước' },
    { id: 'best_seller', label: 'Bán chạy nhất' },
    { id: 'price_desc', label: 'Giá (cao - thấp)' },
  ];

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const handleBrandChange = (brandName) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName]
    );
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorChange = (colorId) => {
    setSelectedColors((prev) =>
      prev.includes(colorId)
        ? prev.filter((c) => c !== colorId)
        : [...prev, colorId]
    );
  };

  const handleMinInputBlur = (val) => {
    let num = Number(val);
    if (isNaN(num) || num < 0) num = 0;
    if (num > maxPrice - 50000) num = maxPrice - 50000;
    setMinPrice(num);
  };

  const handleMaxInputBlur = (val) => {
    let num = Number(val);
    if (isNaN(num)) num = absoluteMaxPrice;
    if (num < minPrice + 50000) num = minPrice + 50000;
    setMaxPrice(num);
  };

  // Drag handler
  const handleThumbMouseDown = (type) => (e) => {
    e.preventDefault();

    const handleMouseMove = (moveEvent) => {
      if (!sliderTrackRef.current) return;
      const rect = sliderTrackRef.current.getBoundingClientRect();
      const clientX = moveEvent.clientX !== undefined
        ? moveEvent.clientX
        : (moveEvent.touches && moveEvent.touches[0] ? moveEvent.touches[0].clientX : 0);

      const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = offsetX / rect.width;
      const step = 50000;
      const rawPrice = absoluteMinPrice + percentage * (absoluteMaxPrice - absoluteMinPrice);
      const calculatedPrice = Math.round(rawPrice / step) * step;

      if (type === 'min') {
        const clampedMin = Math.max(0, Math.min(calculatedPrice, maxPrice - 50000));
        setMinPrice(clampedMin);
      } else {
        const clampedMax = Math.max(minPrice + 50000, Math.min(calculatedPrice, absoluteMaxPrice));
        setMaxPrice(clampedMax);
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
  };

  const handleApply = () => {
    onApplyFilters({
      brands: selectedBrands,
      sizes: selectedSizes,
      colors: selectedColors,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
      sortBy: sortBy,
    });
    if (onClose) onClose();
  };

  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMinPrice(absoluteMinPrice);
    setMaxPrice(absoluteMaxPrice);
    setSortBy('newest');
    if (onResetFilters) {
      onResetFilters();
    }
  };

  // Phần trăm vị trí track slider
  const minPercent = Math.min(100, Math.max(0, ((minPrice - absoluteMinPrice) / (absoluteMaxPrice - absoluteMinPrice)) * 100));
  const maxPercent = Math.min(100, Math.max(0, ((maxPrice - absoluteMinPrice) / (absoluteMaxPrice - absoluteMinPrice)) * 100));

  return (
    <div
      className={`fixed inset-0 z-[60] flex justify-end transition-opacity duration-300 ease-in-out ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Drawer content với Slide In & Slide Out Transition */}
      <div
        className={`relative z-10 w-full max-w-[440px] h-full bg-white flex flex-col shadow-2xl overflow-hidden transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white">
          <h2 className="text-xl font-bold text-gray-900">Hiện bộ lọc</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-black rounded-full transition-colors cursor-pointer"
            aria-label="Đóng bộ lọc"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Filter List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 scrollbar-thin overscroll-contain">

          {/* Section 1: Danh mục */}
          <div className="border-b border-gray-100 pb-4">
            <button
              onClick={() => toggleSection('category')}
              className="flex justify-between items-center w-full py-2 text-left text-base font-semibold text-gray-900 cursor-pointer"
            >
              <span>Danh mục</span>
              <span className={`text-gray-700 transition-transform duration-300 ${openSections.category ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDownIcon />
              </span>
            </button>

            {/* Smooth Slide Transition Container */}
            <div className={`grid transition-all duration-300 ease-in-out ${openSections.category ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
              <div className="overflow-hidden space-y-2.5 pl-1">
                {brandsList.map((brand) => (
                  <label key={brand.id} className="flex items-center gap-3 cursor-pointer text-sm text-gray-700 hover:text-black">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.name)}
                      onChange={() => handleBrandChange(brand.name)}
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black cursor-pointer"
                    />
                    <span>{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Màu sắc */}
          <div className="border-b border-gray-100 pb-4">
            <button
              onClick={() => toggleSection('color')}
              className="flex justify-between items-center w-full py-2 text-left text-base font-semibold text-gray-900 cursor-pointer"
            >
              <span>Màu sắc {selectedColors.length > 0 && `(${selectedColors.length})`}</span>
              <span className={`text-gray-700 transition-transform duration-300 ${openSections.color ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDownIcon />
              </span>
            </button>

            {/* Smooth Slide Transition Container */}
            <div className={`grid transition-all duration-300 ease-in-out ${openSections.color ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
              <div className="overflow-hidden">
                <div className="grid grid-cols-4 gap-3">
                  {colorsList.map((color) => {
                    const isSelected = selectedColors.includes(color.id);
                    return (
                      <div
                        key={color.id}
                        onClick={() => handleColorChange(color.id)}
                        className={`cursor-pointer rounded-lg p-1 bg-white transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-2 border-black font-semibold shadow-xs'
                            : 'border border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div
                          className={`w-full h-16 rounded-md mb-2 ${color.border ? 'border border-gray-200' : ''}`}
                          style={{ background: color.bg || color.hex }}
                        ></div>
                        <span className="text-xs text-gray-800 px-1 pb-1 truncate">{color.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Kích cỡ / Kích thước */}
          <div className="border-b border-gray-100 pb-4">
            <button
              onClick={() => toggleSection('size')}
              className="flex justify-between items-center w-full py-2 text-left text-base font-semibold text-gray-900 cursor-pointer"
            >
              <span>Kích cỡ/Kích thước</span>
              <span className={`text-gray-700 transition-transform duration-300 ${openSections.size ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDownIcon />
              </span>
            </button>

            {/* Smooth Slide Transition Container */}
            <div className={`grid transition-all duration-300 ease-in-out ${openSections.size ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
              <div className="overflow-hidden space-y-2.5 pl-1">
                {sizesList.map((size) => (
                  <label key={size} className="flex items-center gap-3 cursor-pointer text-sm text-gray-700 hover:text-black">
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black cursor-pointer"
                    />
                    <span>{size}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Khoảng giá */}
          <div className="border-b border-gray-100 pb-4">
            <button
              onClick={() => toggleSection('price')}
              className="flex justify-between items-center w-full py-2 text-left text-base font-bold text-gray-900 cursor-pointer"
            >
              <span>Khoảng giá</span>
              <span className={`text-gray-700 transition-transform duration-300 ${openSections.price ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDownIcon />
              </span>
            </button>

            {/* Smooth Slide Transition Container */}
            <div className={`grid transition-all duration-300 ease-in-out ${openSections.price ? 'grid-rows-[1fr] opacity-100 mt-5' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
              <div className="overflow-hidden px-2">
                {/* Custom Dual Range Slider */}
                <div ref={sliderTrackRef} className="relative w-full h-8 flex items-center select-none cursor-pointer">
                  <div className="absolute w-full h-[2px] bg-black rounded-full"></div>
                  <div
                    className="absolute h-[3px] bg-black rounded-full"
                    style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
                  ></div>

                  {/* Min Thumb */}
                  <div
                    onMouseDown={handleThumbMouseDown('min')}
                    onTouchStart={handleThumbMouseDown('min')}
                    className="absolute -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-black flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md z-30 transition-transform hover:scale-110"
                    style={{ left: `${minPercent}%` }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-black pointer-events-none"></div>
                  </div>

                  {/* Max Thumb */}
                  <div
                    onMouseDown={handleThumbMouseDown('max')}
                    onTouchStart={handleThumbMouseDown('max')}
                    className="absolute -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-black flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md z-30 transition-transform hover:scale-110"
                    style={{ left: `${maxPercent}%` }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-black pointer-events-none"></div>
                  </div>
                </div>

                {/* Money labels under thumbs */}
                <div className="flex justify-between items-center text-xs font-semibold text-gray-900 mt-1 mb-5">
                  <span>{minPrice.toLocaleString('vi-VN')}đ</span>
                  <span>{maxPrice.toLocaleString('vi-VN')}đ</span>
                </div>

                {/* 2 Input boxes */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1.5">Tối thiểu (VND)</label>
                    <div className="h-12 border border-gray-400 rounded-none px-3 flex items-center focus-within:border-black">
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
                        onBlur={(e) => handleMinInputBlur(e.target.value)}
                        className="w-full text-base font-normal text-gray-900 border-none outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1.5">Tối đa (VND)</label>
                    <div className="h-12 border border-gray-400 rounded-none px-3 flex items-center focus-within:border-black">
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                        onBlur={(e) => handleMaxInputBlur(e.target.value)}
                        className="w-full text-base font-normal text-gray-900 border-none outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Sắp xếp theo */}
          <div className="border-b border-gray-100 pb-4">
            <button
              onClick={() => toggleSection('sort')}
              className="flex justify-between items-center w-full py-2 text-left text-base font-bold text-gray-900 cursor-pointer"
            >
              <span>Sắp xếp theo</span>
              <span className={`text-gray-700 transition-transform duration-300 ${openSections.sort ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDownIcon />
              </span>
            </button>

            {/* Smooth Slide Transition Container */}
            <div className={`grid transition-all duration-300 ease-in-out ${openSections.sort ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
              <div className="overflow-hidden space-y-1">
                {sortOptions.map((option) => (
                  <label
                    key={option.id}
                    onClick={() => setSortBy(option.id)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-none cursor-pointer transition-colors ${
                      sortBy === option.id ? 'bg-gray-100/70 font-semibold' : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sortByOption"
                      value={option.id}
                      checked={sortBy === option.id}
                      onChange={() => setSortBy(option.id)}
                      className="w-5 h-5 border-gray-400 text-black focus:ring-black accent-black cursor-pointer"
                    />
                    <span className="text-sm text-gray-900">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-gray-100 bg-white flex flex-col gap-2.5 z-10">
          <button
            type="button"
            onClick={handleApply}
            className="w-full h-12 bg-black hover:bg-gray-900 text-white font-bold text-sm rounded-full transition-all flex items-center justify-center cursor-pointer shadow-md"
          >
            Hiển thị sản phẩm
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-full py-2 text-xs text-gray-500 hover:text-black font-medium underline text-center cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
