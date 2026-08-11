import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getCategoriesAPI,
  getProductByIdApi,
  createProductAPI,
  updateProductAPI,
  uploadMultipleFilesAPI,
} from '../../services/api';
import {
  Trash2,
  CheckCircle2,
  Loader2,
  Tag,
  Layers,
  Palette,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Check,
  Plus,
  FileText,
  Boxes,
} from 'lucide-react';
import RichTextEditor from '../../components/common/RichTextEditor';
import ToastNotification from '../../components/common/ToastNotification';
import { formatImageUrl, toRelativePath } from '../../helpers/helper';

// SVG Icon Arrow Left do người dùng cung cấp
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 fill-current">
    <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" />
  </svg>
);

// SVG Icon Image Bự Nằm Ở Giữa Vùng Upload do người dùng cung cấp
const BigImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-16 h-16 fill-current text-gray-400 group-hover:text-black transition-colors">
    <path d="M128 160C128 124.7 156.7 96 192 96L512 96C547.3 96 576 124.7 576 160L576 416C576 451.3 547.3 480 512 480L192 480C156.7 480 128 451.3 128 416L128 160zM56 192C69.3 192 80 202.7 80 216L80 512C80 520.8 87.2 528 96 528L456 528C469.3 528 480 538.7 480 552C480 565.3 469.3 576 456 576L96 576C60.7 576 32 547.3 32 512L32 202.7 42.7 192 56 192zM224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160C206.3 160 192 174.3 192 192C192 209.7 206.3 224 224 224zM420.5 235.5C416.1 228.4 408.4 224 400 224C391.6 224 383.9 228.4 379.5 235.5L323.2 327.6L298.7 297C294.1 291.3 287.3 288 280 288C272.7 288 265.8 291.3 261.3 297L197.3 377C191.5 384.2 190.4 394.1 194.4 402.4C198.4 410.7 206.8 416 216 416L488 416C496.7 416 504.7 411.3 508.9 403.7C513.1 396.1 513 386.9 508.4 379.4L420.4 235.4z" />
  </svg>
);

// Custom Dropdown Select Component
const CustomSelect = ({ label, options, value, onChange, placeholder = 'Chọn...' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => String(opt.value) === String(value));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full select-none" ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border rounded-xl p-3.5 text-sm font-bold text-gray-900 flex items-center justify-between transition-all duration-200 cursor-pointer shadow-xs ${isOpen
          ? 'border-black ring-4 ring-black/10 bg-gray-50/50 shadow-md'
          : 'border-gray-300 hover:border-black hover:bg-gray-50/80 hover:shadow-md active:scale-[0.995]'
          }`}
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-black scale-110' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden py-1.5 animate-fade-in max-h-60 overflow-y-auto divide-y divide-gray-50">
          {options.map((opt) => {
            const isSelected = String(opt.value) === String(value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm font-semibold flex items-center justify-between transition-all duration-150 cursor-pointer ${isSelected
                  ? 'bg-black text-white font-bold'
                  : 'text-gray-800 hover:bg-gray-100 hover:pl-6 hover:text-black font-medium'
                  }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-4 h-4 text-white animate-scale-in" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const COMMON_SIZES = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46'];

// Component Ô Nhập Số Tiền Tích Hợp Mũi Tên Tăng/Giảm (Stepper), Format Dấu Chấm & Chặn Số Âm
const FormattedMoneyInput = ({ label, required = false, value, onChange, placeholder = '0' }) => {
  const step = 1; // Bước tăng giảm đúng 1 đơn vị duy nhất

  const parseCleanNumber = (val) => {
    if (val === undefined || val === null || val === '') return 0;
    const cleaned = String(val).replace(/\D/g, '');
    const num = Number(cleaned);
    return isNaN(num) || num < 0 ? 0 : num;
  };

  const getFormattedValue = (val) => {
    if (val === '' || val === null || val === undefined) return '';
    const num = parseCleanNumber(val);
    if (num === 0 && (val === 0 || val === '0')) return '0';
    return num ? num.toLocaleString('vi-VN').replace(/,/g, '.') : '';
  };

  const handleInputChange = (e) => {
    const raw = e.target.value;
    const num = parseCleanNumber(raw);
    onChange(num);
  };

  const handleStepUp = () => {
    const current = parseCleanNumber(value);
    onChange(current + step);
  };

  const handleStepDown = () => {
    const current = parseCleanNumber(value);
    const nextVal = Math.max(0, current - step);
    onChange(nextVal);
  };

  return (
    <div>
      {label && (
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          type="text"
          required={required}
          value={getFormattedValue(value)}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full bg-white border border-gray-300 rounded-xl p-3 pr-10 text-sm text-gray-900 font-bold outline-none focus:border-black transition-colors"
        />
        {/* Nút Mũi Tên Tăng / Giảm số tiền */}
        <div className="absolute right-2.5 flex flex-col items-center justify-center border-l border-gray-200 pl-1 py-0.5 select-none">
          <button
            type="button"
            onClick={handleStepUp}
            className="p-0.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded transition-colors cursor-pointer"
            title="Tăng 1 đơn vị"
          >
            <ChevronUp size={13} />
          </button>
          <button
            type="button"
            onClick={handleStepDown}
            disabled={parseCleanNumber(value) <= 0}
            className={`p-0.5 text-gray-500 transition-colors ${parseCleanNumber(value) <= 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-black hover:bg-gray-100 rounded cursor-pointer'}`}
            title="Giảm 1 đơn vị"
          >
            <ChevronDown size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProductFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form States
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [gender, setGender] = useState('UNISEX');
  const [price, setPrice] = useState(3870750);
  const [salePrice, setSalePrice] = useState(3500000);
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [styleCode, setStyleCode] = useState('');
  const [colorName, setColorName] = useState('');
  const [isNew, setIsNew] = useState(true);
  const [isBest, setIsBest] = useState(false);
  const [isSale, setIsSale] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  // Biến thể Kích thước & Tồn kho riêng từng size
  const [variantList, setVariantList] = useState([
    { size: '38', stock: 15 },
    { size: '39', stock: 20 },
    { size: '40', stock: 25 },
    { size: '41', stock: 18 },
    { size: '42', stock: 10 },
  ]);

  // Danh sách đường dẫn ảnh
  const [uploadedImages, setUploadedImages] = useState([]);

  // Chuẩn hóa đường dẫn hình ảnh kết nối với Backend Domain
  const getImageUrl = (url) => {
    if (!url) return formatImageUrl('/assets/img/product-adidas-1.jpg');
    return formatImageUrl(url);
  };

  // Nạp danh mục và thông tin sản phẩm (nếu chế độ Sửa)
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        const resCat = await getCategoriesAPI();
        let catList = [];
        if (resCat && resCat.success && resCat.data) {
          catList = resCat.data.items || resCat.data;
          setCategories(Array.isArray(catList) ? catList : []);
        }

        if (isEditMode) {
          const resProduct = await getProductByIdApi(id);
          if (resProduct && resProduct.success && resProduct.data) {
            const p = resProduct.data;
            setName(p.name || '');
            setCategoryId(p.categoryId || p.category_id || p.category?.id || catList[0]?.id || '');
            setGender(p.gender || 'UNISEX');
            setPrice(Number(p.price) || 3000000);
            setSalePrice(Number(p.salePrice ?? p.sale_price) || 0);
            setStyleCode(p.styleCode || p.style_code || '');
            setColorName(p.colorName || p.color_name || (p.variants && p.variants[0]?.color) || '');
            setDescription(p.description || '');
            setDetails(p.details || '');
            setIsNew(Boolean(p.isNew ?? p.is_new));
            setIsBest(Boolean(p.isBest ?? p.is_best));
            setIsSale(Boolean(p.isSale ?? p.is_sale));

            if (p.variants && p.variants.length > 0) {
              setVariantList(
                p.variants.map((v) => ({
                  size: String(v.size),
                  stock: Number(v.stock) || 0,
                }))
              );
            }

            if (p.images && p.images.length > 0) {
              setUploadedImages(p.images.map((img) => getImageUrl(img.imageUrl || img.url || img)));
            } else if (p.image) {
              const imgs = [getImageUrl(p.image)];
              if (p.hoverImage && p.hoverImage !== p.image) {
                imgs.push(getImageUrl(p.hoverImage));
              }
              setUploadedImages(imgs);
            }
          }
        } else if (Array.isArray(catList) && catList.length > 0) {
          setCategoryId(catList[0].id);
        }
      } catch (err) {
        showToast('error', 'Lỗi nạp dữ liệu', 'Không thể nạp thông tin sản phẩm từ cơ sở dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, [id, isEditMode]);

  // Xử lý Upload Multiple Ảnh kèm Chống Trùng (Mức 1)
  const handleMultipleFilesUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const res = await uploadMultipleFilesAPI(files);
      if (res && res.success && res.data) {
        const newUrls = res.data.map((url) => getImageUrl(url));

        setUploadedImages((prev) => {
          let hasDuplicates = false;
          const uniqueList = [...prev];

          newUrls.forEach((url) => {
            if (!uniqueList.includes(url)) {
              uniqueList.push(url);
            } else {
              hasDuplicates = true;
            }
          });

          if (hasDuplicates) {
            showToast('warning', 'Lọc ảnh trùng lặp', 'Một số hình ảnh đã chọn đã có trong danh sách và được tự động bỏ qua.');
          } else {
            showToast('success', 'Tải ảnh thành công', `Đã thêm ${newUrls.length} hình ảnh vào sản phẩm.`);
          }

          return uniqueList;
        });
      } else {
        showToast('error', 'Tải ảnh thất bại', res?.message || 'Không thể tải ảnh lên server');
      }
    } catch (err) {
      showToast('error', 'Lỗi tải ảnh', err.message || 'Lỗi khi kết nối đến dịch vụ tải ảnh');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // Active Image Index cho tính năng Nhấn chọn & Đổi vị trí
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Xử lý Click vào thẻ ảnh để Active hoặc Hoán đổi vị trí với ảnh khác
  const handleCardClick = (idx) => {
    if (selectedImageIndex === null) {
      setSelectedImageIndex(idx);
      showToast(
        'info',
        `Đã chọn Ảnh ${idx + 1}`,
        'Bây giờ nhấp vào tấm ảnh khác để hoán đổi vị trí, hoặc dùng nút ⬅️ ➡️ để di chuyển.'
      );
    } else if (selectedImageIndex === idx) {
      setSelectedImageIndex(null);
    } else {
      const fromIdx = selectedImageIndex;
      const toIdx = idx;

      setUploadedImages((prev) => {
        const copy = [...prev];
        const temp = copy[fromIdx];
        copy[fromIdx] = copy[toIdx];
        copy[toIdx] = temp;
        return copy;
      });

      showToast(
        'success',
        'Đã hoán đổi vị trí ảnh',
        `Đã đổi chỗ thành công giữa Vị trí ${fromIdx + 1} và Vị trí ${toIdx + 1}.`
      );
      setSelectedImageIndex(null);
    }
  };

  // Di chuyển ảnh sang Trái (Up 1) hoặc Phải (Down 1)
  const handleMoveImageShift = (fromIdx, direction) => {
    const toIdx = direction === 'left' ? fromIdx - 1 : fromIdx + 1;
    if (toIdx < 0 || toIdx >= uploadedImages.length) return;

    setUploadedImages((prev) => {
      const copy = [...prev];
      const temp = copy[fromIdx];
      copy[fromIdx] = copy[toIdx];
      copy[toIdx] = temp;
      return copy;
    });

    if (selectedImageIndex === fromIdx) {
      setSelectedImageIndex(toIdx);
    }

    const dirText = direction === 'left' ? 'sang Trái ⬅️' : 'sang Phải ➡️';
    showToast('success', 'Đã chuyển vị trí', `Đã chuyển Ảnh Vị trí ${fromIdx + 1} ${dirText}.`);
  };

  const handleRemoveImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    if (selectedImageIndex === index) setSelectedImageIndex(null);
    showToast('info', 'Đã xóa ảnh', 'Hình ảnh đã được gỡ khỏi danh sách sản phẩm.');
  };

  const handleSetPrimaryImage = (index) => {
    if (index === 0) return;
    setUploadedImages((prev) => {
      const copy = [...prev];
      const selected = copy.splice(index, 1)[0];
      return [selected, ...copy];
    });
    setSelectedImageIndex(0);
    showToast('success', 'Ảnh chính đã đổi', 'Đã thiết lập ảnh mới làm ảnh đại diện chính.');
  };

  // Quản lý biến thể Size & Tồn Kho (Add/Edit/Remove)
  const handleAddVariantRow = (customSize = '') => {
    setVariantList((prev) => [...prev, { size: customSize || '39', stock: 10 }]);
  };

  const handleUpdateVariant = (index, field, val) => {
    setVariantList((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const handleRemoveVariantRow = (index) => {
    setVariantList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleCommonSize = (sz) => {
    const existingIdx = variantList.findIndex((v) => String(v.size) === String(sz));
    if (existingIdx !== -1) {
      setVariantList((prev) => prev.filter((_, i) => i !== existingIdx));
    } else {
      setVariantList((prev) => [...prev, { size: String(sz), stock: 15 }]);
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploadedImages.length === 0) {
      showToast('warning', 'Thiếu hình ảnh', 'Vui lòng tải lên ít nhất 1 hình ảnh từ thiết bị cho sản phẩm');
      return;
    }

    if (variantList.length === 0) {
      showToast('warning', 'Thiếu kích thước', 'Vui lòng thêm ít nhất 1 Kích thước (Size) cho sản phẩm');
      return;
    }

    setSubmitting(true);
    const validPrice = Math.max(0, Number(price) || 0);
    const validSalePrice = Math.max(0, Number(salePrice) || 0);

    const cleanImages = uploadedImages.map(toRelativePath).filter(Boolean);

    const payload = {
      name,
      categoryId,
      gender,
      price: validPrice,
      salePrice: validSalePrice > 0 ? validSalePrice : null,
      description,
      details,
      styleCode: styleCode ? styleCode.toUpperCase() : null,
      colorName,
      isNew,
      isBest,
      isSale,
      image: cleanImages[0] || '',
      hoverImage: cleanImages[1] || cleanImages[0] || '',
      images: cleanImages,
      variants: variantList.map((v) => ({
        size: String(v.size),
        stock: Number(v.stock) || 0,
      })),
    };

    try {
      if (isEditMode) {
        await updateProductAPI(id, payload);
        showToast('success', 'Cập nhật thành công', 'Thông tin sản phẩm đã được lưu vào hệ thống.');
      } else {
        await createProductAPI(payload);
        showToast('success', 'Tạo sản phẩm thành công', 'Sản phẩm mới đã được khởi tạo thành công.');
      }
      setTimeout(() => navigate('/admin/products'), 1200);
    } catch (err) {
      showToast('error', 'Lỗi lưu sản phẩm', err.message || 'Vui lòng kiểm tra lại thông tin nhập!');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500 space-y-3">
        <Loader2 size={38} className="animate-spin text-black" />
        <p className="text-sm font-semibold tracking-wide">Đang nạp dữ liệu sản phẩm...</p>
      </div>
    );
  }

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const genderOptions = [
    { value: 'MEN', label: 'Nam (MEN)' },
    { value: 'WOMEN', label: 'Nữ (WOMEN)' },
    { value: 'UNISEX', label: 'Unisex (Cả Nam & Nữ)' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 animate-page-slide-in">
      {/* Reusable Toast Notification Popup */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Top Header Trang Form Admin */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-800 transition-all cursor-pointer flex items-center gap-2"
            title="Quay lại danh sách sản phẩm"
          >
            <ArrowLeftIcon />
            <span className="text-xs font-bold max-sm:hidden">Quay lại</span>
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              {isEditMode ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">
              Giao diện quản lý thông tin, mô tả, hình ảnh và tồn kho theo từng kích thước
            </p>
          </div>
        </div>

        <button
          type="submit"
          form="product-form"
          disabled={submitting}
          className={`bg-black hover:bg-gray-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2 ${submitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
        >
          {submitting ? 'Đang lưu dữ liệu...' : isEditMode ? 'Lưu Thay Đổi' : 'Tạo Sản Phẩm Mới'}
        </button>
      </div>

      <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
        {/* KHU VỰC 1: QUẢN LÝ HÌNH ẢNH */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gray-700" />
              <h2 className="text-base font-bold text-gray-900">1. Quản lý Hình Ảnh Sản Phẩm</h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-gray-100 rounded-full text-gray-800 border border-gray-200">
              Đã chọn: {uploadedImages.length} ảnh
            </span>
          </div>

          <div className="relative border-2 border-dashed border-gray-300 hover:border-black rounded-2xl p-8 transition-colors text-center group cursor-pointer bg-gray-50/50 hover:bg-gray-50">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleMultipleFilesUpload}
              disabled={uploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex flex-col items-center justify-center space-y-3">
              <BigImageIcon />
              <div className="space-y-1">
                <p className="text-sm font-bold text-gray-900">
                  {uploading ? 'Đang tải ảnh từ thiết bị lên server...' : 'Nhấp vào đây hoặc Kéo thả nhiều ảnh từ thiết bị'}
                </p>
                <p className="text-xs text-gray-500">
                  Ảnh đầu tiên sẽ làm <b>Ảnh Đại Diện chính</b>, Ảnh thứ hai làm <b>Ảnh hiển thị khi rê chuột (Hover)</b>.
                </p>
              </div>
            </div>
          </div>

          {uploadedImages.length > 0 && (
            <div className="pt-3 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gray-700">
                  Danh sách ảnh sản phẩm ({uploadedImages.length} ảnh):
                </p>
                {selectedImageIndex !== null && (
                  <button
                    type="button"
                    onClick={() => setSelectedImageIndex(null)}
                    className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                  >
                    Hủy chọn
                  </button>
                )}
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 font-medium">
                Bạn có thể thay đổi vị trí hình ảnh bằng cách nhấp chọn tấm ảnh muốn chuyển, sau đó nhấp vào tấm ảnh cần đổi vị trí.
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {uploadedImages.map((imgUrl, idx) => {
                  const isActive = selectedImageIndex === idx;
                  const isMain = idx === 0;
                  const isHover = idx === 1;

                  return (
                    <div
                      key={idx}
                      onClick={() => handleCardClick(idx)}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', idx)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const fromIdx = Number(e.dataTransfer.getData('text/plain'));
                        if (isNaN(fromIdx) || fromIdx === idx) return;
                        setUploadedImages((prev) => {
                          const copy = [...prev];
                          const [moved] = copy.splice(fromIdx, 1);
                          copy.splice(idx, 0, moved);
                          return copy;
                        });
                        showToast('success', 'Đã sắp xếp ảnh', `Đã chuyển ảnh sang vị trí ${idx + 1}`);
                      }}
                      className={`relative group rounded-2xl overflow-hidden border aspect-square bg-gray-100 transition-all duration-200 cursor-pointer select-none ${isActive
                        ? ' border-black shadow-xl scale-[1.02] z-20 bg-white'
                        : 'border-gray-200 hover:border-gray-900 hover:shadow-md'
                        }`}
                    >
                      <img src={getImageUrl(imgUrl)} alt={`Sản phẩm ${idx + 1}`} className="w-full h-full object-cover" />

                      {/* Badge Ảnh Chính & Ảnh Hover */}
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
                        {isMain && (
                          <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm leading-none tracking-wide select-none">
                            Ảnh Chính
                          </span>
                        )}
                        {isHover && (
                          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm leading-none tracking-wide select-none">
                            Ảnh Hover
                          </span>
                        )}
                      </div>

                      {/* Badge trạng thái Active khi được nhấp */}
                      {isActive && (
                        <span className="absolute top-2.5 right-2.5 bg-black text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 leading-none select-none">
                          Đã chọn
                        </span>
                      )}

                      {/* Hover overlay chỉ chứa nút xóa ảnh */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 z-10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(idx);
                          }}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
                          title="Xóa ảnh này"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* KHU VỰC 2: THÔNG TIN SẢN PHẨM CHÍNH & PHỐI MÀU */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Tag className="w-5 h-5 text-gray-700" />
            <h2 className="text-base font-bold text-gray-900">2. Thông Tin Sản Phẩm & Phối Màu</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Tên Sản Phẩm *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Coursecup Spikeless Golf Shoes..."
                className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-semibold outline-none focus:border-black transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Mã Kiểu Dáng
                </label>
                <input
                  type="text"
                  value={styleCode}
                  onChange={(e) => setStyleCode(e.target.value)}
                  placeholder="Mã dùng gom nhóm các màu (Ví dụ: CRSP, HRD9, AM90)..."
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-bold outline-none focus:border-black uppercase transition-colors"
                />
                <p className="text-[11px] text-gray-400 mt-1">Các sản phẩm cùng Mã Kiểu Dáng sẽ xuất hiện chung dưới dạng các tùy chọn Màu Sắc.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  Tên Phối Màu *
                </label>
                <input
                  type="text"
                  required
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  placeholder="Ví dụ: Cloud White, Core Black, Metamorphosis..."
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-semibold outline-none focus:border-black transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomSelect
                label="Thương Hiệu *"
                options={categoryOptions}
                value={categoryId}
                onChange={(val) => setCategoryId(val)}
                placeholder="Chọn thương hiệu..."
              />

              <CustomSelect
                label="Phân Loại Giới Tính *"
                options={genderOptions}
                value={gender}
                onChange={(val) => setGender(val)}
                placeholder="Chọn giới tính..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormattedMoneyInput
                label="Giá Niêm Yết VNĐ *"
                required
                value={price}
                onChange={(val) => setPrice(val)}
                placeholder="Ví dụ: 3.870.750"
              />

              <FormattedMoneyInput
                label="Giá Ưu Đãi VNĐ"
                value={salePrice}
                onChange={(val) => setSalePrice(val)}
                placeholder="Ví dụ: 3.500.000"
              />
            </div>

            {/* MÔ TẢ NGẮN */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Mô Tả Ngắn Sản Phẩm
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập tóm tắt mô tả ngắn gọn về sản phẩm..."
                className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-medium outline-none focus:border-black transition-colors"
              />
            </div>

            {/* MÔ TẢ CHI TIẾT SẢN PHẨM BẰNG WYSIWYG EDITOR */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                Mô Tả Chi Tiết Sản Phẩm
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Soạn thảo nội dung định dạng văn bản, chèn tiêu đề, danh sách và hình ảnh trực tiếp từ máy tính.
              </p>
              <RichTextEditor
                value={details}
                onChange={(content) => setDetails(content)}
                placeholder="Soạn thảo mô tả chi tiết sản phẩm..."
              />
            </div>
          </div>
        </div>

        {/* KHU VỰC 3: QUẢN LÝ BIẾN THỂ SIZE VÀ SỐ LƯỢNG TỒN KHO RIÊNG BIỆT TỪNG SIZE */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Boxes className="w-5 h-5 text-gray-700" />
              <h2 className="text-base font-bold text-gray-900">3. Quản Lý Kích Thước & Tồn Kho Chi Tiết</h2>
            </div>
            <button
              type="button"
              onClick={() => handleAddVariantRow('')}
              className="bg-black hover:bg-gray-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Plus size={14} /> Thêm Dòng Size Mới
            </button>
          </div>

          <div className="space-y-4">
            {/* Thanh preset chọn nhanh Size phổ biến */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Chọn Nhanh Các Size Phổ Biến (Bật/Tắt)
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_SIZES.map((sz) => {
                  const isPresent = variantList.some((v) => String(v.size) === String(sz));
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => handleToggleCommonSize(sz)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${isPresent
                        ? 'bg-black text-white border-black shadow-sm scale-[1.02]'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-black hover:bg-gray-50 hover:-translate-y-0.5'
                        }`}
                    >
                      EU {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bảng Danh Sách Biến Thể Size & Tồn Kho Chi Tiết */}
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700 uppercase text-[11px] font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-3 w-16 text-center">STT</th>
                    <th className="p-3">Kích Thước</th>
                    <th className="p-3">Số Lượng Tồn Kho</th>
                    <th className="p-3 w-20 text-center">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {variantList.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-xs text-gray-400 font-medium">
                        Chưa có biến thể Size nào. Nhấn "Thêm Dòng Size Mới" hoặc chọn size phổ biến ở trên!
                      </td>
                    </tr>
                  ) : (
                    variantList.map((vItem, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                        <td className="p-3 text-center text-xs font-bold text-gray-400">
                          {idx + 1}
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            required
                            value={vItem.size}
                            onChange={(e) => handleUpdateVariant(idx, 'size', e.target.value)}
                            placeholder="Ví dụ: 39, 40, 42.5..."
                            className="w-full max-w-[160px] bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-bold text-gray-900 outline-none focus:border-black"
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min={0}
                              required
                              value={vItem.stock}
                              onChange={(e) => handleUpdateVariant(idx, 'stock', Number(e.target.value))}
                              className="w-full max-w-[160px] bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-bold text-gray-900 outline-none focus:border-black"
                            />
                            <span className="text-xs text-gray-500 font-semibold">đôi</span>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveVariantRow(idx)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Xóa size này"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Nhãn Gợi Ý Trạng Thái */}
          <div className="pt-3 border-t border-gray-100">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
              Nhãn Gợi Ý & Trạng Thái
            </label>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  className="w-4 h-4 accent-black rounded border-gray-300 focus:ring-black cursor-pointer"
                />
                <span>Sản phẩm mới</span>
              </label>

              <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isBest}
                  onChange={(e) => setIsBest(e.target.checked)}
                  className="w-4 h-4 accent-black rounded border-gray-300 focus:ring-black cursor-pointer"
                />
                <span>Nổi bật / Bán chạy</span>
              </label>

              <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isSale}
                  onChange={(e) => setIsSale(e.target.checked)}
                  className="w-4 h-4 accent-black rounded border-gray-300 focus:ring-black cursor-pointer"
                />
                <span>Đang giảm giá</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
