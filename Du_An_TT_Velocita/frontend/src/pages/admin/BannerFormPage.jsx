import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Upload, Video, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import {
  getBannerByIdAPI,
  createBannerAPI,
  updateBannerAPI,
  uploadMultipleFilesAPI,
} from '../../services/api';
import ToastNotification from '../../components/common/ToastNotification';
import { formatImageUrl, toRelativePath } from '../../helpers/helper';

export default function BannerFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  // Form States
  const [title, setTitle] = useState('');
  const [emptyTitle, setEmptyTitle] = useState(false);

  const [subtitle, setSubtitle] = useState('');
  const [emptySubtitle, setEmptySubtitle] = useState(false);

  const [image, setImage] = useState('');

  const [videoUrl, setVideoUrl] = useState('');
  const [emptyVideo, setEmptyVideo] = useState(true);

  const [mediaType, setMediaType] = useState('IMAGE');

  const [link, setLink] = useState('/product-catalog');
  const [emptyLink, setEmptyLink] = useState(false);

  const [buttonText, setButtonText] = useState('Khám phá ngay');
  const [emptyButtonText, setEmptyButtonText] = useState(false);

  const [position, setPosition] = useState('HOME_HERO');
  const [sortOrder, setSortOrder] = useState(1);
  const [status, setStatus] = useState(true);

  const [loadingData, setLoadingData] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Toast State
  const [toast, setToast] = useState(null);

  const showToast = (type, titleStr, message) => {
    setToast({ type, title: titleStr, message });
  };

  // Format URL hiển thị media
  const getMediaUrl = (url) => {
    if (!url) return '';
    return formatImageUrl(url);
  };

  // Nạp dữ liệu Banner nếu ở chế độ Chỉnh sửa (Edit Mode)
  useEffect(() => {
    if (isEditMode) {
      const fetchDetail = async () => {
        setLoadingData(true);
        try {
          const res = await getBannerByIdAPI(id);
          if (res && res.success && res.data) {
            const b = res.data;

            const titleVal = b.title || '';
            setTitle(titleVal);
            setEmptyTitle(!titleVal);

            const subVal = b.subtitle || '';
            setSubtitle(subVal);
            setEmptySubtitle(!subVal);

            setImage(b.image || '');

            const vidVal = b.videoUrl || b.video_url || '';
            setVideoUrl(vidVal);
            setEmptyVideo(!vidVal);

            setMediaType(b.mediaType || b.media_type || 'IMAGE');

            const linkVal = b.link || '';
            setLink(linkVal);
            setEmptyLink(!linkVal);

            const btnVal = b.buttonText || b.button_text || '';
            setButtonText(btnVal);
            setEmptyButtonText(!btnVal);

            setPosition(b.position || 'HOME_HERO');
            setSortOrder(b.sortOrder ?? b.sort_order ?? 1);
            setStatus(Boolean(b.status ?? true));
          } else {
            showToast('error', 'Không tìm thấy', 'Không thể tải dữ liệu banner.');
          }
        } catch (err) {
          showToast('error', 'Lỗi nạp dữ liệu', err.message || 'Lỗi kết nối máy chủ.');
        } finally {
          setLoadingData(false);
        }
      };
      fetchDetail();
    }
  }, [id, isEditMode]);

  // Upload Ảnh từ thiết bị
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    try {
      const res = await uploadMultipleFilesAPI(files, 'banners');
      if (res && res.success && res.data && res.data[0]) {
        setImage(res.data[0]);
        showToast('success', 'Tải ảnh thành công', 'Đã lưu file ảnh banner.');
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

  // Upload Video MP4 từ thiết bị
  const handleVideoUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingVideo(true);
    try {
      const res = await uploadMultipleFilesAPI(files, 'banners');
      if (res && res.success && res.data && res.data[0]) {
        setVideoUrl(res.data[0]);
        setEmptyVideo(false);
        if (mediaType === 'IMAGE') setMediaType('VIDEO');
        showToast('success', 'Tải video thành công', 'Đã lưu file video banner.');
      } else {
        showToast('error', 'Tải video thất bại', res?.message || 'Không thể upload video.');
      }
    } catch (err) {
      showToast('error', 'Lỗi upload video', err.message || 'Lỗi khi tải video lên server.');
    } finally {
      setUploadingVideo(false);
      e.target.value = '';
    }
  };

  // Submit Form Lưu Banner
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image.trim() && (!videoUrl.trim() || emptyVideo)) {
      showToast('warning', 'Thiếu media', 'Vui lòng tải lên ít nhất 1 hình ảnh hoặc 1 video MP4 làm Banner.');
      return;
    }

    setSubmitting(true);
    const finalTitle = emptyTitle ? '' : title.trim();

    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim() || null,
      desc: subtitle.trim() || null,
      image: toRelativePath(image) || null,
      videoUrl: emptyVideo ? null : (toRelativePath(videoUrl) || null),
      video_url: emptyVideo ? null : (toRelativePath(videoUrl) || null),
      link: link.trim() || null,
      buttonText: buttonText.trim() || null,
      button_text: buttonText.trim() || null,
      position,
      sortOrder: Number(sortOrder) || 1,
      status: Boolean(status),
    };

    try {
      if (isEditMode) {
        const res = await updateBannerAPI(id, payload);
        if (res && res.success) {
          showToast('success', 'Cập nhật thành công', 'Đã cập nhật dữ liệu Banner thành công.');
          setTimeout(() => navigate('/admin/banners'), 1000);
        }
      } else {
        const res = await createBannerAPI(payload);
        if (res && res.success) {
          showToast('success', 'Tạo mới thành công', 'Đã khởi tạo Banner mới thành công.');
          setTimeout(() => navigate('/admin/banners'), 1000);
        }
      }
    } catch (err) {
      showToast('error', 'Lỗi lưu banner', err.message || 'Không thể xử lý yêu cầu.');
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
            onClick={() => navigate('/admin/banners')}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 transition-all cursor-pointer"
            title="Quay lại danh sách banner"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              {isEditMode ? 'Chỉnh Sửa Banner' : 'Thêm Banner Mới'}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {isEditMode ? `Cập nhật thông tin banner ID: #${id}` : 'Khởi tạo banner trình chiếu mới trên hệ thống'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/banners')}
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
            Lưu Banner
          </button>
        </div>
      </div>

      {/* Main Form Body */}
      {loadingData ? (
        <div className="bg-white p-12 text-center text-xs text-gray-400 font-semibold rounded-2xl border border-gray-100">
          Đang nạp dữ liệu banner...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cột Trái (2 Cols): Thông tin chính */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card 1: Thông tin tiêu đề & nội dung */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-5">
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                1. Thông tin Tiêu đề & Nội dung
              </h2>

              {/* 1.1 Tiêu đề (title) */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Tiêu đề Banner (title)
                </label>
                <input
                  type="text"
                  disabled={emptyTitle}
                  value={emptyTitle ? '' : title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Adidas Ultraboost 5X, Giày Golf Cao Cấp..."
                  className={`w-full border rounded-xl p-3 text-sm font-bold outline-none transition-all ${
                    emptyTitle
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed placeholder-gray-400'
                      : 'bg-white text-gray-900 border-gray-300 focus:border-black'
                  }`}
                />
                <label className="inline-flex items-center gap-2 mt-1.5 cursor-pointer text-xs font-semibold text-gray-600 hover:text-black">
                  <input
                    type="checkbox"
                    checked={emptyTitle}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setEmptyTitle(checked);
                      if (checked) setTitle('');
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                  />
                  <span>Để trống tiêu đề (Không hiển thị tiêu đề trên Banner)</span>
                </label>
              </div>

              {/* 1.2 Phụ đề / Mô tả ngắn (subtitle) */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Phụ đề / Mô tả ngắn (subtitle)
                </label>
                <textarea
                  rows={3}
                  disabled={emptySubtitle}
                  value={emptySubtitle ? '' : subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Một thế hệ mới của giày chạy bộ tăng cường độ êm và phản hồi lực..."
                  className={`w-full border rounded-xl p-3 text-sm font-medium outline-none transition-all ${
                    emptySubtitle
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed placeholder-gray-400'
                      : 'bg-white text-gray-900 border-gray-300 focus:border-black'
                  }`}
                />
                <label className="inline-flex items-center gap-2 mt-1.5 cursor-pointer text-xs font-semibold text-gray-600 hover:text-black">
                  <input
                    type="checkbox"
                    checked={emptySubtitle}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setEmptySubtitle(checked);
                      if (checked) setSubtitle('');
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                  />
                  <span>Để trống phụ đề / mô tả ngắn</span>
                </label>
              </div>

              {/* 1.3 Link URL & Button Text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                {/* Link URL */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Đường dẫn liên kết (link)
                  </label>
                  <input
                    type="text"
                    disabled={emptyLink}
                    value={emptyLink ? '' : link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="/product-catalog hoặc https://..."
                    className={`w-full border rounded-xl p-3 text-sm font-mono outline-none transition-all ${
                      emptyLink
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed placeholder-gray-400'
                        : 'bg-white text-gray-900 border-gray-300 focus:border-black'
                    }`}
                  />
                  <label className="inline-flex items-center gap-2 mt-1.5 cursor-pointer text-xs font-semibold text-gray-600 hover:text-black">
                    <input
                      type="checkbox"
                      checked={emptyLink}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setEmptyLink(checked);
                        if (checked) setLink('');
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                    />
                    <span>Để trống đường dẫn</span>
                  </label>
                </div>

                {/* Button Text */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Chữ hiển thị trên Nút (button_text)
                  </label>
                  <input
                    type="text"
                    disabled={emptyButtonText}
                    value={emptyButtonText ? '' : buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="Ví dụ: Khám phá ngay, Cửa hàng..."
                    className={`w-full border rounded-xl p-3 text-sm font-bold outline-none transition-all ${
                      emptyButtonText
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed placeholder-gray-400'
                        : 'bg-white text-gray-900 border-gray-300 focus:border-black'
                    }`}
                  />
                  <label className="inline-flex items-center gap-2 mt-1.5 cursor-pointer text-xs font-semibold text-gray-600 hover:text-black">
                    <input
                      type="checkbox"
                      checked={emptyButtonText}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setEmptyButtonText(checked);
                        if (checked) setButtonText('');
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                    />
                    <span>Để trống nút bấm (Không nút)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Card 2: Hình ảnh & Video Banner */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-5">
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                2. Quản lý Hình ảnh & Video Media
              </h2>

              {/* Upload Ảnh Banner */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Hình ảnh Banner (image) *
                </label>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                  {/* Khung xem trước & Click chọn ảnh với hiệu ứng Hover mượt mà */}
                  <label className="relative aspect-video rounded-xl bg-white border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-100/60 transition-all duration-300 overflow-hidden flex flex-col items-center justify-center cursor-pointer group shadow-2xs">
                    {image ? (
                      <img src={getMediaUrl(image)} alt="Preview Banner" className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" />
                    ) : (
                      <div className="text-center p-4 text-gray-400 group-hover:text-black transition-colors space-y-1.5">
                        <ImageIcon size={38} className="mx-auto opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                        <span className="text-xs font-bold block">Nhấp vào đây để chọn hoặc đổi Hình Ảnh Banner</span>
                        <span className="text-[11px] text-gray-400 font-medium block">Hỗ trợ các định dạng JPG, PNG, WEBP</span>
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
                      <span>{uploadingImage ? 'Đang tải ảnh lên...' : 'Tải ảnh từ máy'}</span>
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
                        Gỡ hình ảnh
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Upload Video MP4 Banner */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Video MP4 trình chiếu (video_url)
                </label>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                  {/* Khung xem trước & Click chọn Video với hiệu ứng Hover mượt mà */}
                  <label
                    className={`relative aspect-video rounded-xl border-2 border-dashed transition-all duration-300 overflow-hidden flex flex-col items-center justify-center shadow-2xs ${
                      emptyVideo
                        ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-gray-300 hover:border-black hover:bg-gray-100/60 text-gray-500 hover:text-black cursor-pointer group'
                    }`}
                  >
                    {!emptyVideo && videoUrl ? (
                      <video src={getMediaUrl(videoUrl)} controls className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4 space-y-1.5">
                        <Video size={38} className={`mx-auto transition-all duration-300 ${emptyVideo ? 'opacity-30' : 'opacity-60 group-hover:opacity-100 group-hover:scale-110'}`} />
                        <span className="text-xs font-bold block">
                          {emptyVideo ? 'Đang chọn: Không sử dụng Video' : 'Nhấp vào đây để chọn hoặc đổi Video MP4 trình chiếu'}
                        </span>
                        {!emptyVideo && (
                          <span className="text-[11px] text-gray-400 font-medium block">Hỗ trợ các file định dạng video MP4</span>
                        )}
                      </div>
                    )}
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      disabled={uploadingVideo || emptyVideo}
                      className="hidden"
                    />
                  </label>

                  <div className="flex items-center justify-between">
                    <label
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                        emptyVideo
                          ? 'bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed'
                          : 'bg-white border border-gray-300 hover:border-black hover:bg-gray-100 text-gray-800 cursor-pointer'
                      }`}
                    >
                      {uploadingVideo ? <Loader2 size={16} className="animate-spin text-black" /> : <Video size={16} />}
                      <span>{uploadingVideo ? 'Đang tải video lên...' : 'Tải video MP4 từ máy'}</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        disabled={uploadingVideo || emptyVideo}
                        className="hidden"
                      />
                    </label>
                    {!emptyVideo && videoUrl && (
                      <button
                        type="button"
                        onClick={() => setVideoUrl('')}
                        className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                      >
                        Gỡ video
                      </button>
                    )}
                  </div>

                  <label className="inline-flex items-center gap-2 pt-1 cursor-pointer text-xs font-semibold text-gray-600 hover:text-black">
                    <input
                      type="checkbox"
                      checked={emptyVideo}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setEmptyVideo(checked);
                        if (checked) setVideoUrl('');
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                    />
                    <span>Không dùng Video (Chỉ sử dụng hình ảnh Banner)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Cột Phải (1 Col): Cấu hình cài đặt & Trạng thái */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-5">
              <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                3. Cấu hình Cài đặt
              </h2>

              {/* Vị trí hiển thị (Position) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Vị trí hiển thị (position)
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-bold outline-none focus:border-black transition-colors cursor-pointer"
                >
                  <option value="HOME_HERO">HOME_HERO (Slider chính Trang chủ)</option>
                  <option value="NEWS_HERO">NEWS_HERO (Banner chính Trang Tin tức)</option>
                </select>
              </div>

              {/* Thứ tự sắp xếp (Sort Order) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Thứ tự sắp xếp (sort_order)
                </label>
                <input
                  type="number"
                  min={1}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-bold outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Trạng thái hiển thị (Status) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Trạng thái Banner (status)
                </label>
                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60">
                    <input
                      type="radio"
                      name="banner_status"
                      checked={status === true}
                      onChange={() => setStatus(true)}
                      className="w-4 h-4 text-black focus:ring-black cursor-pointer"
                    />
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 size={14} /> 1 - Bật (Hiển thị)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl border border-gray-200 bg-gray-50">
                    <input
                      type="radio"
                      name="banner_status"
                      checked={status === false}
                      onChange={() => setStatus(false)}
                      className="w-4 h-4 text-black focus:ring-black cursor-pointer"
                    />
                    <span className="text-xs font-bold text-gray-600">
                      0 - Tắt (Ẩn tạm thời)
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
