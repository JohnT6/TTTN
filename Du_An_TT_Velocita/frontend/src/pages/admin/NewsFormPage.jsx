import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Upload, Image as ImageIcon } from 'lucide-react';
import {
  getNewsDetailAPI,
  createNewsAPI,
  updateNewsAPI,
  uploadMultipleFilesAPI,
} from '../../services/api';
import ToastNotification from '../../components/common/ToastNotification';
import RichTextEditor from '../../components/common/RichTextEditor';
import { formatImageUrl, toRelativePath } from '../../helpers/helper';

export default function NewsFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  // Form States
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('GENERAL');
  const [image, setImage] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Velocità Admin');
  const [showDate, setShowDate] = useState(true);
  const [date, setDate] = useState(new Date().toLocaleDateString('vi-VN'));
  const [status, setStatus] = useState(true);

  // Loading & Submitting States
  const [loadingData, setLoadingData] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Toast State
  const [toast, setToast] = useState(null);

  const showToast = (type, titleStr, message) => {
    setToast({ type, title: titleStr, message });
  };

  // Nạp thông tin bài viết nếu đang ở chế độ Sửa (Edit Mode)
  useEffect(() => {
    if (isEditMode) {
      const fetchDetail = async () => {
        setLoadingData(true);
        try {
          const res = await getNewsDetailAPI(id);
          if (res && res.success && res.data) {
            const item = res.data;
            setTitle(item.title || '');
            setCategory(item.category || 'GENERAL');
            setImage(item.image || '');
            setDesc(item.desc || '');
            setContent(item.content || '');
            setAuthor(item.author || 'Velocità Admin');
            setShowDate(Boolean(item.showDate ?? item.show_date ?? true));
            setDate(item.date || new Date().toLocaleDateString('vi-VN'));
            setStatus(Boolean(item.status ?? true));
          } else {
            showToast('error', 'Không tìm thấy', 'Bài viết tin tức này không tồn tại.');
          }
        } catch (err) {
          showToast('error', 'Lỗi nạp dữ liệu', err.message || 'Không thể lấy thông tin bài viết.');
        } finally {
          setLoadingData(false);
        }
      };
      fetchDetail();
    }
  }, [id, isEditMode]);

  // Upload Ảnh đại diện bài viết vào thư mục public/uploads/news/imgs/
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    try {
      const res = await uploadMultipleFilesAPI(files, 'news');
      if (res && res.success && res.data && res.data[0]) {
        setImage(res.data[0]);
        showToast('success', 'Tải ảnh thành công', 'Đã lưu file ảnh đại diện bài viết.');
      } else {
        showToast('error', 'Tải ảnh thất bại', res?.message || 'Không thể upload ảnh.');
      }
    } catch (err) {
      showToast('error', 'Lỗi upload ảnh', err.message || 'Lỗi khi tải ảnh lên server.');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  // Submit Form Lưu Bài Viết Tin Tức
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast('warning', 'Thiếu thông tin', 'Vui lòng nhập tiêu đề bài viết tin tức.');
      return;
    }
    if (!image.trim()) {
      showToast('warning', 'Thiếu ảnh đại diện', 'Vui lòng tải lên ảnh đại diện cho bài viết.');
      return;
    }

    setSubmitting(true);
    const payload = {
      title: title.trim(),
      category,
      image: toRelativePath(image),
      desc: desc.trim() || null,
      content: content || null,
      author: author.trim() || 'Velocità Admin',
      showDate: Boolean(showDate),
      date: date.trim() || new Date().toLocaleDateString('vi-VN'),
      status: Boolean(status),
    };

    try {
      if (isEditMode) {
        const res = await updateNewsAPI(id, payload);
        if (res && res.success) {
          showToast('success', 'Cập nhật thành công', 'Đã cập nhật thông tin bài viết thành công.');
          setTimeout(() => navigate('/admin/news'), 1000);
        }
      } else {
        const res = await createNewsAPI(payload);
        if (res && res.success) {
          showToast('success', 'Tạo mới thành công', 'Đã xuất bản bài viết tin tức mới thành công.');
          setTimeout(() => navigate('/admin/news'), 1000);
        }
      }
    } catch (err) {
      showToast('error', 'Lỗi lưu bài viết', err.message || 'Không thể xử lý yêu cầu.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-page-slide-in">
      {/* Toast Popup Notification */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Top Action Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/news')}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 transition-all cursor-pointer"
            title="Quay lại danh sách bài viết"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              {isEditMode ? 'Chỉnh Sửa Bài Viết Tin Tức' : 'Thêm Bài Viết Tin Tức Mới'}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {isEditMode
                ? `Cập nhật thông tin bài viết ID: #${id}`
                : 'Đăng bài viết chia sẻ xu hướng, mẹo vặt thể thao mới'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/news')}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || loadingData}
            className="bg-black hover:bg-gray-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            {submitting && <Loader2 size={16} className="animate-spin text-white" />}
            Lưu Bài Viết
          </button>
        </div>
      </div>

      {/* Main Form Body */}
      {loadingData ? (
        <div className="bg-white p-12 text-center text-xs text-gray-400 font-semibold rounded-2xl border border-gray-100">
          Đang nạp dữ liệu bài viết...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cột Trái (2 Cols): Tiêu đề, Mô tả ngắn & Nội dung chi tiết */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card 1: Thông tin Tiêu đề & Mô tả */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-5">
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                1. Thông tin Tiêu đề & Nội dung Tóm tắt
              </h2>

              {/* Tiêu đề Bài viết */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Tiêu đề Bài viết (title) *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Top 5 Mẫu Giày Chạy Bộ Tốt Nhất Năm 2026..."
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-bold outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Mô tả ngắn */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Mô tả tóm tắt (desc)
                </label>
                <textarea
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Đoạn văn ngắn tổng quan nội dung bài viết hiển thị ở danh sách bài viết..."
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-medium outline-none focus:border-black transition-colors"
                />
              </div>
            </div>

            {/* Card 2: Trình soạn thảo văn bản chi tiết (RichTextEditor) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                2. Nội dung Bài viết Chi tiết (Rich Text Content)
              </h2>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Nội dung bài viết (Có hỗ trợ chèn ảnh, video, định dạng chữ)
                </label>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Nhập nội dung bài viết chi tiết tại đây..."
                />
              </div>
            </div>
          </div>

          {/* Cột Phải (1 Col): Ảnh đại diện, Chuyên mục & Cấu hình */}
          <div className="space-y-6">
            {/* Card 3: Upload Ảnh Đại Diện */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                3. Hình ảnh Đại diện Bài viết *
              </h2>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                {/* Khung xem trước & Click chọn ảnh */}
                <label className="relative aspect-video rounded-xl bg-white border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-100/60 transition-all duration-300 overflow-hidden flex flex-col items-center justify-center cursor-pointer group shadow-2xs">
                  {image ? (
                    <img
                      src={formatImageUrl(image)}
                      alt="Preview Cover"
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-center p-4 text-gray-400 group-hover:text-black transition-colors space-y-1.5">
                      <ImageIcon size={38} className="mx-auto opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                      <span className="text-xs font-bold block">Nhấp vào đây để chọn Ảnh Đại Diện</span>
                      <span className="text-[11px] text-gray-400 font-medium block">Tự động lưu vào /uploads/news/imgs/</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>

                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 hover:border-black hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-800 transition-all cursor-pointer shadow-2xs">
                    {uploadingImage ? <Loader2 size={16} className="animate-spin text-black" /> : <Upload size={16} />}
                    <span>{uploadingImage ? 'Đang tải ảnh...' : 'Tải ảnh từ máy'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                  {image && (
                    <button
                      type="button"
                      onClick={() => setImage('')}
                      className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                    >
                      Gỡ ảnh
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Card 4: Cấu hình Chuyên mục & Ngày tháng */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-5">
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                4. Phân loại & Cấu hình
              </h2>

              {/* Chuyên mục (Category) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Chuyên mục Bài viết (category)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-bold outline-none focus:border-black transition-colors cursor-pointer"
                >
                  <option value="GENERAL">GENERAL (Tin tức Chung)</option>
                  <option value="GUIDE">GUIDE (Hướng dẫn & Mẹo vặt)</option>
                  <option value="SHOWS">SHOWS (Sự kiện & Shows)</option>
                  <option value="ART_CULTURE">ART_CULTURE (Nghệ thuật & Văn hóa)</option>
                </select>
              </div>

              {/* Tác giả (Author) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Tác giả (author)
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Velocità Admin"
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-medium outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Trạng thái Bài viết */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Trạng thái Bài viết (status)
                </label>
                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60">
                    <input
                      type="radio"
                      name="news_status"
                      checked={status === true}
                      onChange={() => setStatus(true)}
                      className="w-4 h-4 text-black focus:ring-black cursor-pointer"
                    />
                    <span className="text-xs font-bold text-emerald-800">
                      1 - Bật (Xuất bản công khai)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl border border-gray-200 bg-gray-50">
                    <input
                      type="radio"
                      name="news_status"
                      checked={status === false}
                      onChange={() => setStatus(false)}
                      className="w-4 h-4 text-black focus:ring-black cursor-pointer"
                    />
                    <span className="text-xs font-bold text-gray-600">
                      0 - Tắt (Lưu nháp / Ẩn)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
