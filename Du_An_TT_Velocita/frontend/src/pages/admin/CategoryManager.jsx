import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Plus, RefreshCw, X, Loader2, Upload, Trash2, CheckCircle2 } from 'lucide-react';
import {
  getCategoriesAPI,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
  uploadMultipleFilesAPI,
} from '../../services/api';
import ToastNotification from '../../components/common/ToastNotification';
import ConfirmModal from '../../components/common/ConfirmModal';
import { formatImageUrl, toRelativePath } from '../../helpers/helper';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Form Fields theo đúng bảng MySQL Categories
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState(true);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Toast State
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  // Helper nạp ảnh từ Backend
  const getLogoUrl = (url) => {
    if (!url) return '/assets/imgs/brand-adidas.png';
    return formatImageUrl(url);
  };

  // Tải danh sách Danh mục / Thương hiệu từ Backend MySQL
  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategoriesAPI();
      if (res && res.success && res.data) {
        const catList = res.data.items || res.data;
        setCategories(Array.isArray(catList) ? catList : []);
      }
    } catch (err) {
      showToast('error', 'Lỗi nạp danh mục', err.message || 'Không thể tải danh sách thương hiệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Tự động sinh Slug chuẩn khi gõ Tên thương hiệu
  const handleNameChange = (val) => {
    setName(val);
    if (!editingCategory) {
      const autoSlug = val
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
      setSlug(autoSlug);
    }
  };

  // Mở Modal Thêm mới
  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setImage('');
    setStatus(true);
    setIsModalOpen(true);
  };

  // Mở Modal Chỉnh sửa
  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setName(cat.name || '');
    setSlug(cat.slug || '');
    setDescription(cat.description || '');
    setImage(cat.image || '');
    setStatus(Boolean(cat.status ?? true));
    setIsModalOpen(true);
  };

  // Upload Logo từ thiết bị lên Backend Express
  const handleLogoUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    try {
      const res = await uploadMultipleFilesAPI(files, 'categories');
      if (res && res.success && res.data && res.data[0]) {
        setImage(res.data[0]);
        showToast('success', 'Tải ảnh logo thành công', 'Đã lưu file ảnh logo thương hiệu.');
      } else {
        showToast('error', 'Tải ảnh thất bại', res?.message || 'Không thể upload ảnh logo.');
      }
    } catch (err) {
      showToast('error', 'Lỗi upload ảnh', err.message || 'Lỗi khi tải logo lên server.');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  // Lưu Thêm mới hoặc Cập nhật Danh mục về Backend
  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('warning', 'Thiếu thông tin', 'Vui lòng nhập tên danh mục thương hiệu.');
      return;
    }

    setSubmitting(true);
    const payload = {
      name: name.trim(),
      slug: slug.trim() || undefined,
      description: description.trim() || null,
      image: toRelativePath(image) || null,
      status: Boolean(status),
    };

    try {
      if (editingCategory) {
        const res = await updateCategoryAPI(editingCategory.id, payload);
        if (res && res.success) {
          showToast('success', 'Cập nhật thành công', `Đã cập nhật thương hiệu "${name}".`);
        }
      } else {
        const res = await createCategoryAPI(payload);
        if (res && res.success) {
          showToast('success', 'Tạo mới thành công', `Đã khởi tạo thương hiệu "${name}".`);
        }
      }
      setIsModalOpen(false);
      await loadCategories();
    } catch (err) {
      showToast('error', 'Lỗi lưu danh mục', err.message || 'Không thể xử lý yêu cầu.');
    } finally {
      setSubmitting(false);
    }
  };

  // Confirm Modal State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Xóa danh mục khỏi Backend khi người dùng xác nhận ở ConfirmModal
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      await deleteCategoryAPI(deleteTarget.id);
      showToast('success', 'Xóa thành công', `Đã xóa thương hiệu "${deleteTarget.name}".`);
      setDeleteTarget(null);
      await loadCategories();
    } catch (err) {
      showToast('error', 'Lỗi xóa danh mục', err.message || 'Không thể xóa thương hiệu này.');
    } finally {
      setDeleting(false);
    }
  };

  const { user } = useSelector((state) => state.auth || {});
  const isEditor = user?.role === 'EDITOR';

  return (
    <div className="space-y-6">
      {/* Toast Notification Popup */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Confirm Modal Xóa Danh mục Thương hiệu */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Xác nhận xóa Thương hiệu"
        message={`Bạn có chắc chắn muốn xóa thương hiệu "${deleteTarget?.name}" khỏi hệ thống CSDL MySQL? Hành động này không thể hoàn tác.`}
        confirmText="Xóa Thương hiệu"
        cancelText="Hủy bỏ"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Top Header Card - Chuẩn kích cỡ & Màu sắc đồng bộ 100% với Quản lý Sản phẩm */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản lý Danh mục & Thương hiệu</h1>
          <p className="text-xs text-gray-500 mt-1">
            Quản lý các thương hiệu sản phẩm trong hệ thống • Tổng số{' '}
            <span className="font-bold underline text-blue-600">{categories.length}</span> danh mục
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadCategories}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 transition-all cursor-pointer"
            title="Làm mới danh sách danh mục"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            type="button"
            onClick={openCreateModal}
            className="bg-[#003882] hover:bg-[#002868] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm shrink-0"
          >
            <Plus size={16} /> Thêm Thương hiệu mới
          </button>
        </div>
      </div>

      {/* Table Card - Đầy đủ các cột theo đúng Bảng MySQL Categories */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-900 uppercase text-xs font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Logo</th>
                <th className="p-4">Tên thương hiệu</th>
                <th className="p-4">Mô tả</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-xs text-gray-400 font-semibold">
                    Đang nạp danh sách thương hiệu từ CSDL MySQL...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-xs text-gray-500 font-semibold">
                    Chưa có thương hiệu nào trong cơ sở dữ liệu.
                  </td>
                </tr>
              ) : (
                categories.map((c) => {
                  const isCatActive = Boolean(c.status ?? true);

                  return (
                    <tr key={c.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 p-1 flex items-center justify-center overflow-hidden shrink-0">
                          <img
                            src={getLogoUrl(c.image)}
                            alt={c.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/assets/imgs/brand-adidas.png';
                            }}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </td>
                      <td className="p-4 font-bold text-gray-900">{c.name}</td>
                      <td className="p-4 text-gray-600 max-w-xs truncate">
                        {c.description || 'Chưa có mô tả'}
                      </td>
                      <td className="p-4">
                        {isCatActive ? (
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-bold">
                            Bật (Hiển thị)
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-600 border border-gray-300 text-xs px-2.5 py-0.5 rounded-full font-bold">
                            Tắt (Ẩn)
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3 text-xs font-bold">
                          <button
                            type="button"
                            onClick={() => openEditModal(c)}
                            className="text-blue-600 hover:underline cursor-pointer"
                          >
                            Sửa
                          </button>
                          {!isEditor && (
                            <button
                              type="button"
                              onClick={() => setDeleteTarget(c)}
                              className="text-red-500 hover:underline cursor-pointer"
                            >
                              Xóa
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Thêm / Chỉnh Sửa Thương Hiệu (Đầy đủ các trường MySQL: name, slug, image, description, status) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl p-6 space-y-5 animate-bounce-in max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-gray-900">
                {editingCategory ? 'Chỉnh Sửa Thương Hiệu' : 'Thêm Thương Hiệu Mới'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 cursor-pointer p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* 1. Tên thương hiệu */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Tên thương hiệu / Danh mục *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ví dụ: Adidas, Nike, Asics, Puma, Mizuno..."
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-bold outline-none focus:border-black transition-colors"
                />
              </div>

              {/* 2. Hình ảnh Logo thương hiệu (Image Upload) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Hình ảnh Logo thương hiệu (image)
                </label>

                <div className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="w-16 h-16 rounded-xl bg-white border border-gray-300 p-1 flex items-center justify-center overflow-hidden shrink-0">
                    {image ? (
                      <img src={getLogoUrl(image)} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-[10px] text-gray-400 font-semibold text-center">Chưa có logo</span>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 hover:border-black rounded-lg text-xs font-bold text-gray-800 transition-colors cursor-pointer shadow-2xs">
                      {uploadingImage ? <Loader2 size={14} className="animate-spin text-black" /> : <Upload size={14} />}
                      <span>{uploadingImage ? 'Đang tải ảnh lên...' : 'Tải logo từ thiết bị'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>

                    {image && (
                      <button
                        type="button"
                        onClick={() => setImage('')}
                        className="block text-[11px] text-red-600 font-bold hover:underline cursor-pointer"
                      >
                        Gỡ ảnh logo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 4. Mô tả thương hiệu */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Mô tả thương hiệu (description)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Nhập mô tả giới thiệu về thương hiệu này..."
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-medium outline-none focus:border-black transition-colors"
                />
              </div>

              {/* 5. Trạng thái hiển thị (Status) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Trạng thái thương hiệu (status)
                </label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status_radio"
                      checked={status === true}
                      onChange={() => setStatus(true)}
                      className="w-4 h-4 text-black focus:ring-black cursor-pointer"
                    />
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 size={14} /> 1 - Bật (Hiển thị)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status_radio"
                      checked={status === false}
                      onChange={() => setStatus(false)}
                      className="w-4 h-4 text-black focus:ring-black cursor-pointer"
                    />
                    <span className="text-xs font-bold text-gray-600">
                      0 - Tắt (Ẩn)
                    </span>
                  </label>
                </div>
              </div>

              {/* Nút bấm Thao tác */}
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-[#003882] hover:bg-[#002868] text-white text-xs rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  Lưu thương hiệu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
