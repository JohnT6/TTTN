import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  RefreshCw,
  RotateCcw,
  Palette,
  Check,
  Save,
  Loader2,
  Sparkles,
  Layout,
  Upload,
  Image as ImageIcon,
  LayoutGrid,
  Search,
  X,
  Eye,
  EyeOff,
  Settings,
} from 'lucide-react';
import {
  getSiteSettingsAPI,
  updateSiteSettingsAPI,
  uploadMultipleFilesAPI,
  getProductsAPI,
  getNewsAPI,
} from '../../services/api';
import ToastNotification from '../../components/common/ToastNotification';
import { formatImageUrl, toRelativePath } from '../../helpers/helper';

// Cấu hình Màu Gốc Nguyên Bản của Dự Án Velocità (Để khôi phục dễ dàng)
const VELOCITA_ORIGINAL_PALETTE = {
  name: 'Màu Gốc Dự Án (Velocità Original)',
  backgroundColor: '#ffffff',
  primaryColor: '#000000',
  accentColor: '#003882',
  description: 'Trở về màu sắc thiết kế nguyên bản ban đầu của dự án Store.',
};

export default function SiteSettingsManager() {
  // Settings States
  const [logo, setLogo] = useState('/assets/logos/logo.svg');
  const [backgroundColor, setBackgroundColor] = useState(VELOCITA_ORIGINAL_PALETTE.backgroundColor);
  const [primaryColor, setPrimaryColor] = useState(VELOCITA_ORIGINAL_PALETTE.primaryColor);
  const [accentColor, setAccentColor] = useState(VELOCITA_ORIGINAL_PALETTE.accentColor);

  // Section Toggles
  const [showNewArrivals, setShowNewArrivals] = useState(true);
  const [showBestSellers, setShowBestSellers] = useState(true);
  const [showSaleProducts, setShowSaleProducts] = useState(true);
  const [showNews, setShowNews] = useState(true);

  // Danh sách ID các món bị ẩn cụ thể (Sản phẩm & Tin tức)
  const [hiddenProductIds, setHiddenProductIds] = useState([]);
  const [hiddenNewsIds, setHiddenNewsIds] = useState([]);

  // Toàn bộ dữ liệu để tính số lượng sản phẩm bị ẩn cho từng section (Admin luôn thấy đầy đủ)
  const [allProducts, setAllProducts] = useState([]);
  const [allNews, setAllNews] = useState([]);

  // Modal Cấu hình Ẩn từng Món cụ thể
  const [activeModalType, setActiveModalType] = useState(null); // 'products' hoặc 'news'
  const [modalTitle, setModalTitle] = useState('');
  const [modalItems, setModalItems] = useState([]);
  const [modalSearch, setModalSearch] = useState('');
  const [loadingModalItems, setLoadingModalItems] = useState(false);

  // Submitting & Loading States
  const [loading, setLoading] = useState(true);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [saving, setSaving] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  // Khóa cuộn trang khi mở Modal
  useEffect(() => {
    if (activeModalType) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModalType]);

  // Danh sách các Bộ Màu Cài Sẵn Gợi Ý
  const presetPalettes = [
    VELOCITA_ORIGINAL_PALETTE,
    {
      name: 'Nền Xám Nhẹ Sang Trọng',
      backgroundColor: '#f8f9fa',
      primaryColor: '#111827',
      accentColor: '#003882',
      description: 'Nền xám dịu mắt, độ tương phản cao cho sản phẩm.',
    },
    {
      name: 'Nền Kem Warm Cream',
      backgroundColor: '#fdfbf7',
      primaryColor: '#292524',
      accentColor: '#d90429',
      description: 'Nền kem ấm áp phong cách vintage tối giản.',
    },
    {
      name: 'Nền Xanh Thể Thao',
      backgroundColor: '#f0fdf4',
      primaryColor: '#065f46',
      accentColor: '#059669',
      description: 'Tông xanh tươi mát thể thao năng động.',
    },
    {
      name: 'Nền Tối Dark Mode',
      backgroundColor: '#111827',
      primaryColor: '#f9fafb',
      accentColor: '#3b82f6',
      description: 'Giao diện nền tối hiện đại, ngầu và nổi bật.',
    },
  ];

  // Nạp cấu hình từ CSDL MySQL & nạp toàn bộ danh sách để Admin xem đầy đủ trạng thái
  const loadSettings = async () => {
    setLoading(true);
    try {
      // 1. Lấy cài đặt site
      const res = await getSiteSettingsAPI();
      if (res && res.success && res.data) {
        const s = res.data;
        if (s.logo) setLogo(s.logo);
        if (s.backgroundColor) setBackgroundColor(s.backgroundColor);
        if (s.primaryColor) setPrimaryColor(s.primaryColor);
        if (s.accentColor) setAccentColor(s.accentColor);

        setShowNewArrivals(s.showNewArrivals === 'true' || s.showNewArrivals === true);
        setShowBestSellers(s.showBestSellers === 'true' || s.showBestSellers === true);
        setShowSaleProducts(s.showSaleProducts === 'true' || s.showSaleProducts === true);
        setShowNews(s.showNews === 'true' || s.showNews === true);

        if (s.hiddenProductIds) {
          try {
            setHiddenProductIds(JSON.parse(s.hiddenProductIds));
          } catch {
            setHiddenProductIds([]);
          }
        }
        if (s.hiddenNewsIds) {
          try {
            setHiddenNewsIds(JSON.parse(s.hiddenNewsIds));
          } catch {
            setHiddenNewsIds([]);
          }
        }
      }

      // 2. Nạp danh sách tất cả sản phẩm & tin tức (Admin view đầy đủ)
      try {
        const prodRes = await getProductsAPI('admin=true');
        if (prodRes && prodRes.success && prodRes.data) {
          const pList = Array.isArray(prodRes.data) ? prodRes.data : prodRes.data.items || [];
          setAllProducts(pList);
        }
      } catch (e) {
        // Ignore
      }

      try {
        const newsRes = await getNewsAPI('admin=true');
        if (newsRes && newsRes.success && newsRes.data) {
          const nList = Array.isArray(newsRes.data) ? newsRes.data : newsRes.data.items || [];
          setAllNews(nList);
        }
      } catch (e) {
        // Ignore
      }
    } catch (err) {
      showToast('error', 'Lỗi nạp cấu hình', err.message || 'Không thể tải cấu hình từ server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // Hàm helper tính chính xác số lượng sản phẩm/bài viết đang ở trạng thái ĐÃ ẨN cho từng mục section
  const getHiddenCount = (sectionKey) => {
    const productList = allProducts.length > 0 ? allProducts : modalItems;

    if (sectionKey === 'isNew') {
      const newItems = productList.filter((p) => Boolean(p.isNew ?? p.is_new));
      if (!showNewArrivals) return newItems.length;
      return newItems.filter(
        (p) =>
          hiddenProductIds.includes(p.id) || p.status === false || p.status === 0 || p.status === '0'
      ).length;
    }

    if (sectionKey === 'isBest') {
      const bestItems = productList.filter((p) => Boolean(p.isBest ?? p.is_best));
      if (!showBestSellers) return bestItems.length;
      return bestItems.filter(
        (p) =>
          hiddenProductIds.includes(p.id) || p.status === false || p.status === 0 || p.status === '0'
      ).length;
    }

    if (sectionKey === 'isSale') {
      const saleItems = productList.filter(
        (p) => Boolean(p.isSale ?? p.is_sale) || (p.salePrice && Number(p.salePrice) > 0)
      );
      if (!showSaleProducts) return saleItems.length;
      return saleItems.filter(
        (p) =>
          hiddenProductIds.includes(p.id) || p.status === false || p.status === 0 || p.status === '0'
      ).length;
    }

    if (sectionKey === 'news') {
      const newsList = allNews.length > 0 ? allNews : modalItems;
      if (!showNews) return newsList.length;
      return newsList.filter(
        (n) => hiddenNewsIds.includes(n.id) || n.status === false || n.status === 0 || n.status === '0'
      ).length;
    }

    return 0;
  };

  // Upload Logo Website mới
  const handleLogoUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingLogo(true);
    try {
      const res = await uploadMultipleFilesAPI(files, 'logos');
      if (res && res.success && res.data && res.data[0]) {
        setLogo(res.data[0]);
        showToast('success', 'Tải logo thành công', 'Đã cập nhật ảnh logo thương hiệu mới.');
      } else {
        showToast('error', 'Tải logo thất bại', res?.message || 'Không thể upload file logo.');
      }
    } catch (err) {
      showToast('error', 'Lỗi upload logo', err.message || 'Lỗi khi tải logo lên server.');
    } finally {
      setUploadingLogo(false);
      e.target.value = '';
    }
  };

  // Khôi phục Nhanh về Màu Gốc Nguyên Bản của Dự Án
  const handleResetToOriginal = () => {
    setBackgroundColor(VELOCITA_ORIGINAL_PALETTE.backgroundColor);
    setPrimaryColor(VELOCITA_ORIGINAL_PALETTE.primaryColor);
    setAccentColor(VELOCITA_ORIGINAL_PALETTE.accentColor);
    showToast(
      'success',
      'Đã khôi phục Màu Gốc Dự Án',
      'Đã đặt lại màu nền trang (#ffffff) và màu thương hiệu nguyên bản ban đầu.'
    );
  };

  // Áp dụng Bộ màu Preset được chọn
  const handleSelectPreset = (palette) => {
    setBackgroundColor(palette.backgroundColor);
    setPrimaryColor(palette.primaryColor);
    setAccentColor(palette.accentColor);
    showToast('info', `Đã chọn: ${palette.name}`, palette.description);
  };

  // Mở Modal chọn món cụ thể (Hiển thị ĐẦY ĐỦ tất cả món thuộc section đó để Admin quản lý)
  const handleOpenItemModal = async (type, sectionTitle, sectionFilterKey) => {
    setActiveModalType(type);
    setModalTitle(sectionTitle);
    setModalSearch('');
    setLoadingModalItems(true);

    try {
      if (type === 'products') {
        const res = await getProductsAPI('admin=true');
        if (res && res.success && res.data) {
          const rawList = Array.isArray(res.data) ? res.data : res.data.items || [];
          setAllProducts(rawList); // Đồng bộ danh sách cho đếm badge

          let list = rawList;
          if (sectionFilterKey === 'isNew') {
            list = list.filter((p) => Boolean(p.isNew ?? p.is_new));
          } else if (sectionFilterKey === 'isBest') {
            list = list.filter((p) => Boolean(p.isBest ?? p.is_best));
          } else if (sectionFilterKey === 'isSale') {
            list = list.filter(
              (p) => Boolean(p.isSale ?? p.is_sale) || (p.salePrice && Number(p.salePrice) > 0)
            );
          }

          setModalItems(list);
        }
      } else if (type === 'news') {
        const res = await getNewsAPI('admin=true');
        if (res && res.success && res.data) {
          const list = Array.isArray(res.data) ? res.data : res.data.items || [];
          setAllNews(list);
          setModalItems(list);
        }
      }
    } catch (err) {
      showToast('error', 'Lỗi nạp danh sách', err.message || 'Không thể lấy dữ liệu để chọn.');
    } finally {
      setLoadingModalItems(false);
    }
  };

  // Toggle ẩn / hiện một ID cụ thể trong Modal (Cập nhật sống động trạng thái & con số đã ẩn)
  const handleToggleItemHide = (id) => {
    if (activeModalType === 'products') {
      const targetItem = allProducts.find((p) => p.id === id) || modalItems.find((p) => p.id === id);
      const isCurrentlyHidden =
        hiddenProductIds.includes(id) ||
        targetItem?.status === false ||
        targetItem?.status === 0 ||
        targetItem?.status === '0';

      let updatedHiddenList;
      if (isCurrentlyHidden) {
        // Chuyển sang ĐANG HIỆN
        updatedHiddenList = hiddenProductIds.filter((itemId) => itemId !== id);
        setAllProducts((prev) => prev.map((p) => (p.id === id ? { ...p, status: true } : p)));
        setModalItems((prev) => prev.map((p) => (p.id === id ? { ...p, status: true } : p)));
      } else {
        // Chuyển sang ĐÃ ẨN
        if (!hiddenProductIds.includes(id)) {
          updatedHiddenList = [...hiddenProductIds, id];
        } else {
          updatedHiddenList = hiddenProductIds;
        }
        setAllProducts((prev) => prev.map((p) => (p.id === id ? { ...p, status: false } : p)));
        setModalItems((prev) => prev.map((p) => (p.id === id ? { ...p, status: false } : p)));
      }
      setHiddenProductIds(updatedHiddenList);
    } else if (activeModalType === 'news') {
      const targetItem = allNews.find((n) => n.id === id) || modalItems.find((n) => n.id === id);
      const isCurrentlyHidden =
        hiddenNewsIds.includes(id) ||
        targetItem?.status === false ||
        targetItem?.status === 0 ||
        targetItem?.status === '0';

      let updatedHiddenList;
      if (isCurrentlyHidden) {
        updatedHiddenList = hiddenNewsIds.filter((itemId) => itemId !== id);
        setAllNews((prev) => prev.map((n) => (n.id === id ? { ...n, status: true } : n)));
        setModalItems((prev) => prev.map((n) => (n.id === id ? { ...n, status: true } : n)));
      } else {
        if (!hiddenNewsIds.includes(id)) {
          updatedHiddenList = [...hiddenNewsIds, id];
        } else {
          updatedHiddenList = hiddenNewsIds;
        }
        setAllNews((prev) => prev.map((n) => (n.id === id ? { ...n, status: false } : n)));
        setModalItems((prev) => prev.map((n) => (n.id === id ? { ...n, status: false } : n)));
      }
      setHiddenNewsIds(updatedHiddenList);
    }
  };

  // Lưu Toàn Bộ Cấu Hình Giao Diện vào CSDL MySQL
  const handleSaveSettings = async (e) => {
    if (e) e.preventDefault();

    setSaving(true);
    const payload = {
      logo: toRelativePath(logo),
      backgroundColor,
      primaryColor,
      accentColor,
      showNewArrivals: String(showNewArrivals),
      showBestSellers: String(showBestSellers),
      showSaleProducts: String(showSaleProducts),
      showNews: String(showNews),
      hiddenProductIds: JSON.stringify(hiddenProductIds),
      hiddenNewsIds: JSON.stringify(hiddenNewsIds),
    };

    try {
      const res = await updateSiteSettingsAPI(payload);
      if (res && res.success) {
        showToast('success', 'Lưu thành công', 'Đã cập nhật toàn bộ cấu hình Logo, Màu sắc & Trạng thái Ẩn/Hiện vào CSDL!');
        loadSettings();
      } else {
        showToast('error', 'Lỗi lưu cấu hình', res?.message || 'Không thể lưu cài đặt.');
      }
    } catch (err) {
      showToast('error', 'Lỗi lưu cài đặt', err.message || 'Không thể xử lý yêu cầu.');
    } finally {
      setSaving(false);
    }
  };

  // Lọc danh sách món trong Modal theo từ khóa tìm kiếm
  const filteredModalItems = modalItems.filter((item) => {
    if (!modalSearch.trim()) return true;
    const term = modalSearch.toLowerCase().trim();
    const nameStr = (item.name || item.title || '').toLowerCase();
    const categoryStr = (item.category?.name || item.category || '').toLowerCase();
    return nameStr.includes(term) || categoryStr.includes(term);
  });

  return (
    <div className="space-y-6 animate-page-slide-in">
      {/* Toast Notification Popup */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Top Action Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-black" />
            <span>Quản Lý Giao Diện Website</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Thay đổi Logo thương hiệu, màu sắc giao diện & chọn ẩn/hiển thị từng mục sản phẩm/tin tức
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Nút Khôi Phục Màu Gốc Dự Án Nhanh */}
          <button
            type="button"
            onClick={handleResetToOriginal}
            className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-gray-200"
            title="Khôi phục màu sắc về mẫu gốc ban đầu của dự án"
          >
            <RotateCcw size={14} />
            <span>Màu Gốc Dự Án</span>
          </button>

          <button
            type="button"
            onClick={loadSettings}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 transition-all cursor-pointer"
            title="Làm mới cài đặt"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>

          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={saving || loading}
            className="bg-black hover:bg-gray-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin text-white" /> : <Save size={16} />}
            <span>Lưu Cấu Hình Giao Diện</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white p-12 text-center text-xs text-gray-400 font-semibold rounded-3xl border border-gray-100">
          Đang nạp cấu hình giao diện từ CSDL MySQL...
        </div>
      ) : (
        <form onSubmit={handleSaveSettings} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cột Trái (2 Cols): Logo Website & Màu Sắc Giao Diện */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card 1: Logo Website Thương Hiệu */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 text-black flex items-center justify-center font-bold">
                    <ImageIcon size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">1. Logo Website Thương Hiệu</h2>
                    <p className="text-xs text-gray-400">Hình ảnh hiển thị ở Header & Footer toàn trang</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                {/* Khung Xem Trước Logo */}
                <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 min-h-[160px]">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Xem trước Logo hiện tại</p>
                  <div className="h-16 px-6 py-2 bg-white rounded-xl border border-gray-200 shadow-2xs flex items-center justify-center">
                    <img
                      src={formatImageUrl(logo)}
                      alt="Website Logo Preview"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/logos/logo.svg';
                      }}
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-gray-400 truncate max-w-full">{logo}</span>
                </div>

                {/* Tải logo mới & tùy chỉnh đường dẫn */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Tải Logo mới từ máy tính
                    </label>
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs">
                      {uploadingLogo ? <Loader2 size={16} className="animate-spin text-white" /> : <Upload size={16} />}
                      <span>{uploadingLogo ? 'Đang tải file...' : 'Tải ảnh Logo lên'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        disabled={uploadingLogo}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Đường dẫn URL Logo tương đối
                    </label>
                    <input
                      type="text"
                      value={logo}
                      onChange={(e) => setLogo(e.target.value)}
                      placeholder="/assets/logos/logo.svg"
                      className="w-full bg-white border border-gray-300 rounded-xl p-3 text-xs text-gray-900 font-mono outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Quản Lý Màu Sắc & Nút Khôi Phục Màu Gốc Dự Án */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    <Palette size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">2. Màu Sắc Giao Diện & Nút Chọn Nhanh Màu Gốc</h2>
                    <p className="text-xs text-gray-400">Thay đổi màu nền trang web hoặc khôi phục về màu gốc của dự án</p>
                  </div>
                </div>
              </div>

              {/* Bộ Màu Gợi Ý & Màu Gốc Dự Án */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {presetPalettes.map((p, idx) => {
                  const isOriginal = p.name.includes('Màu Gốc Dự Án');
                  const isSelected =
                    backgroundColor === p.backgroundColor &&
                    primaryColor === p.primaryColor &&
                    accentColor === p.accentColor;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPreset(p)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative group flex flex-col justify-between space-y-2 ${
                        isSelected
                          ? 'border-black bg-gray-50 ring-2 ring-black/10 shadow-xs'
                          : isOriginal
                          ? 'border-black/40 bg-amber-50/50 hover:border-black'
                          : 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isOriginal ? 'text-black' : 'text-gray-900'}`}>
                          {p.name}
                        </span>
                        {isSelected ? (
                          <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[9px]">
                            <Check size={10} />
                          </span>
                        ) : isOriginal ? (
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-black text-white uppercase">
                            Mẫu Gốc
                          </span>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-1.5 pt-1">
                        <span
                          className="w-4 h-4 rounded-full border border-gray-300 shadow-2xs"
                          style={{ backgroundColor: p.backgroundColor }}
                          title="Màu nền trang web"
                        ></span>
                        <span
                          className="w-4 h-4 rounded-full border border-gray-300 shadow-2xs"
                          style={{ backgroundColor: p.primaryColor }}
                          title="Màu chủ đạo"
                        ></span>
                        <span
                          className="w-4 h-4 rounded-full border border-gray-300 shadow-2xs"
                          style={{ backgroundColor: p.accentColor }}
                          title="Màu điểm nhấn"
                        ></span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Color Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl space-y-2">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase">Màu Nền Trang Web</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-8 h-8 rounded-xl border cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-2 py-1 text-xs font-mono font-bold uppercase"
                    />
                  </div>
                </div>

                <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl space-y-2">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase">Màu Chủ Đạo (Text/Btn)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-8 h-8 rounded-xl border cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-2 py-1 text-xs font-mono font-bold uppercase"
                    />
                  </div>
                </div>

                <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl space-y-2">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase">Màu Điểm Nhấn</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-8 h-8 rounded-xl border cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-2 py-1 text-xs font-mono font-bold uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cột Phải (1 Col): Hiển thị / Ẩn các Mục Trang chủ */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6">
              <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <LayoutGrid size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">3. Ẩn / Hiển Thị các Mục Trang Chủ</h2>
                  <p className="text-xs text-gray-400">Bật/tắt từng section hoặc chọn ẩn từng món cụ thể</p>
                </div>
              </div>

              {/* Danh sách Switch Toggles cho 4 Khối Section + Nút Chọn Món Cụ Thể */}
              <div className="space-y-4">
                {/* Section 1: Sản Phẩm Mới */}
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-900">Sản phẩm mới (New Arrivals)</p>
                      <p className="text-[11px] text-gray-400">Khối danh sách giày mới phát hành</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowNewArrivals(!showNewArrivals)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        showNewArrivals ? 'bg-black' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          showNewArrivals ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenItemModal('products', 'Ẩn sản phẩm cụ thể trong Mục Sản Phẩm Mới', 'isNew')}
                    className="w-full py-2 px-3 bg-white border border-gray-200 hover:border-black rounded-xl text-[11px] font-bold text-gray-700 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Settings size={13} className="text-blue-600" /> Chọn ẩn từng sản phẩm...
                    </span>
                    <span className="text-blue-600 font-mono font-bold">
                      ({getHiddenCount('isNew')} đã ẩn)
                    </span>
                  </button>
                </div>

                {/* Section 2: Sản Phẩm Bán Chạy */}
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-900">Sản phẩm bán chạy (Best Sellers)</p>
                      <p className="text-[11px] text-gray-400">Khối top sản phẩm mua nhiều nhất</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowBestSellers(!showBestSellers)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        showBestSellers ? 'bg-black' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          showBestSellers ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenItemModal('products', 'Ẩn sản phẩm cụ thể trong Mục Bán Chạy', 'isBest')}
                    className="w-full py-2 px-3 bg-white border border-gray-200 hover:border-black rounded-xl text-[11px] font-bold text-gray-700 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Settings size={13} className="text-blue-600" /> Chọn ẩn từng sản phẩm...
                    </span>
                    <span className="text-blue-600 font-mono font-bold">
                      ({getHiddenCount('isBest')} đã ẩn)
                    </span>
                  </button>
                </div>

                {/* Section 3: Sản Phẩm Giảm Giá */}
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-900">Sản phẩm giảm giá (Sale / Discount)</p>
                      <p className="text-[11px] text-gray-400">Khối các mẫu giày ưu đãi khuyến mãi</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowSaleProducts(!showSaleProducts)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        showSaleProducts ? 'bg-black' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          showSaleProducts ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenItemModal('products', 'Ẩn sản phẩm cụ thể trong Mục Giảm Giá', 'isSale')}
                    className="w-full py-2 px-3 bg-white border border-gray-200 hover:border-black rounded-xl text-[11px] font-bold text-gray-700 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Settings size={13} className="text-blue-600" /> Chọn ẩn từng sản phẩm...
                    </span>
                    <span className="text-blue-600 font-mono font-bold">
                      ({getHiddenCount('isSale')} đã ẩn)
                    </span>
                  </button>
                </div>

                {/* Section 4: Bài Viết & Tin Tức */}
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-900">Bài viết & Tin tức (News Section)</p>
                      <p className="text-[11px] text-gray-400">Khối hiển thị tin tức mới nhất ở trang chủ</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowNews(!showNews)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        showNews ? 'bg-black' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          showNews ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenItemModal('news', 'Ẩn bài viết cụ thể trong Mục Tin Tức', 'news')}
                    className="w-full py-2 px-3 bg-white border border-gray-200 hover:border-black rounded-xl text-[11px] font-bold text-gray-700 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Settings size={13} className="text-blue-600" /> Chọn ẩn từng bài viết...
                    </span>
                    <span className="text-blue-600 font-mono font-bold">
                      ({getHiddenCount('news')} đã ẩn)
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Modal Tìm kiếm & Chọn Ẩn từng Món cụ thể (Admin luôn xem đầy đủ danh sách để bấm Ẩn/Hiện) */}
      {activeModalType &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-gray-100 max-h-[85vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-gray-900">{modalTitle}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Admin xem toàn bộ danh sách - Bấm nút để chuyển đổi trạng thái Ẩn/Hiện ở trang Client
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalType(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Live Search Bar */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  value={modalSearch}
                  onChange={(e) => setModalSearch(e.target.value)}
                  placeholder={
                    activeModalType === 'products'
                      ? 'Tìm sản phẩm theo tên, thương hiệu...'
                      : 'Tìm bài viết theo tiêu đề, chuyên mục...'
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-gray-900 font-medium placeholder-gray-400 outline-none focus:border-black focus:bg-white transition-colors"
                />
                {modalSearch && (
                  <button
                    type="button"
                    onClick={() => setModalSearch('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Modal Items List */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 divide-y divide-gray-100 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                {loadingModalItems ? (
                  <div className="py-12 text-center text-xs text-gray-400 font-semibold">
                    Đang nạp danh sách dữ liệu...
                  </div>
                ) : filteredModalItems.length === 0 ? (
                  <div className="py-12 text-center text-xs text-gray-400 font-semibold">
                    Không tìm thấy dữ liệu nào khớp trong mục này.
                  </div>
                ) : (
                  filteredModalItems.map((item) => {
                    const itemId = item.id;
                    const isHidden =
                      activeModalType === 'products'
                        ? hiddenProductIds.includes(itemId) || item.status === false || item.status === 0 || item.status === '0'
                        : hiddenNewsIds.includes(itemId) || item.status === false || item.status === 0 || item.status === '0';

                    const mainImg =
                      activeModalType === 'products'
                        ? (item.images && item.images[0]?.url) || item.image || item.img || ''
                        : item.image || item.img || '';

                    const titleText = item.name || item.title || 'Món không tên';
                    const subText = item.category?.name || item.category || 'Chưa phân loại';

                    return (
                      <div
                        key={itemId}
                        className="pt-2.5 first:pt-0 flex items-center justify-between gap-4 p-2.5 rounded-2xl hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={formatImageUrl(mainImg)}
                            alt={titleText}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/assets/imgs/blog-clean-shoes.png';
                            }}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200 shrink-0 bg-gray-100"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">{titleText}</p>
                            <p className="text-[11px] text-gray-400 truncate mt-0.5">{subText}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {isHidden ? (
                            <span className="bg-red-50 text-red-600 border border-red-200 text-[11px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                              <EyeOff size={12} /> Đã ẩn
                            </span>
                          ) : (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                              <Eye size={12} /> Đang hiện
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => handleToggleItemHide(itemId)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                              isHidden
                                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                                : 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200'
                            }`}
                          >
                            {isHidden ? 'Hiện món này' : 'Ẩn món này'}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveModalType(null)}
                  className="bg-black hover:bg-gray-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Xác Nhận & Đóng
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
