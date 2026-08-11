import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Plus, RefreshCw } from 'lucide-react';
import { getBannersAPI, deleteBannerAPI } from '../../services/api';
import ToastNotification from '../../components/common/ToastNotification';
import ConfirmModal from '../../components/common/ConfirmModal';
import { formatImageUrl } from '../../helpers/helper';

export default function BannerManager() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Confirm Modal State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast State
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  // Format URL media
  const getMediaUrl = (url) => {
    if (!url) return '';
    return formatImageUrl(url);
  };

  // Tải danh sách Banner từ Backend CSDL MySQL
  const loadBanners = async () => {
    setLoading(true);
    try {
      const res = await getBannersAPI();
      if (res && res.success && res.data) {
        const bannerList = res.data.items || res.data;
        setBanners(Array.isArray(bannerList) ? bannerList : []);
      }
    } catch (err) {
      showToast('error', 'Lỗi nạp banner', err.message || 'Không thể tải danh sách banner');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  // Thực hiện Xóa Banner sau khi mở ConfirmModal
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      await deleteBannerAPI(deleteTarget.id);
      showToast('success', 'Xóa thành công', `Đã xóa banner "${deleteTarget.title || 'không tiêu đề'}".`);
      setDeleteTarget(null);
      await loadBanners();
    } catch (err) {
      showToast('error', 'Lỗi xóa banner', err.message || 'Không thể xóa banner này.');
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

      {/* Confirm Modal Xóa Banner bằng Giao diện Đẹp thay cho window.confirm */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Xác nhận xóa Banner"
        message={`Bạn có chắc chắn muốn xóa banner "${deleteTarget?.title || 'này'}" khỏi hệ thống CSDL MySQL? Hành động này không thể hoàn tác.`}
        confirmText="Xóa Banner"
        cancelText="Hủy bỏ"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản lý Banner & Slider</h1>
          <p className="text-xs text-gray-500 mt-1">
            Quản lý các hình ảnh và video trình chiếu trên trang chủ & tin tức • Tổng số{' '}
            <span className="font-bold underline text-blue-600">{banners.length}</span> banner
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadBanners}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 transition-all cursor-pointer"
            title="Làm mới danh sách banner"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/banners/create')}
            className="bg-[#003882] hover:bg-[#002868] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm shrink-0"
          >
            <Plus size={16} /> Thêm Banner mới
          </button>
        </div>
      </div>

      {/* Table Banner */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-900 uppercase text-xs font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Hình ảnh / Video</th>
                <th className="p-4">Tiêu đề (title)</th>
                <th className="p-4">Phụ đề (subtitle)</th>
                <th className="p-4">Link</th>
                <th className="p-4">Nút bấm (button_text)</th>
                <th className="p-4">Vị trí (position)</th>
                <th className="p-4">Thứ tự</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-xs text-gray-400 font-semibold">
                    Đang nạp danh sách banner từ CSDL MySQL...
                  </td>
                </tr>
              ) : banners.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-xs text-gray-500 font-semibold">
                    Chưa có banner nào trong cơ sở dữ liệu. Bấm "+ Thêm Banner mới" để tạo.
                  </td>
                </tr>
              ) : (
                banners.map((b) => {
                  const hasVideo = Boolean(b.videoUrl || b.video_url);
                  const isBannerActive = Boolean(b.status ?? true);

                  return (
                    <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <div className="relative w-24 h-14 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                          {hasVideo ? (
                            <video
                              src={getMediaUrl(b.videoUrl || b.video_url)}
                              autoPlay
                              loop
                              muted
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img
                              src={getMediaUrl(b.image)}
                              alt={b.title}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/assets/img/adidas-2.jpg';
                              }}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-black/75 text-white">
                            {hasVideo ? 'Video' : 'Ảnh'}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 max-w-xs">
                        <p className="font-bold text-gray-900 line-clamp-1">
                          {b.title || <span className="text-gray-400 font-normal italic">(Không có tiêu đề)</span>}
                        </p>
                      </td>
                      <td className="p-4 max-w-xs text-xs text-gray-500 truncate">
                        {b.subtitle || b.desc || '-'}
                      </td>
                      <td className="p-4 font-mono text-xs text-blue-600 truncate max-w-[120px]">
                        {b.link || '-'}
                      </td>
                      <td className="p-4 text-xs font-semibold text-gray-800">
                        {b.buttonText || b.button_text || '-'}
                      </td>
                      <td className="p-4 text-xs font-mono font-bold text-gray-600">
                        {b.position || 'HOME_HERO'}
                      </td>
                      <td className="p-4 text-xs font-mono font-bold text-gray-900">
                        {b.sortOrder ?? b.sort_order ?? 0}
                      </td>
                      <td className="p-4">
                        {isBannerActive ? (
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
                            onClick={() => navigate(`/admin/banners/edit/${b.id}`)}
                            className="text-blue-600 hover:underline cursor-pointer"
                          >
                            Sửa
                          </button>
                          {!isEditor && (
                            <button
                              type="button"
                              onClick={() => setDeleteTarget(b)}
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
    </div>
  );
}
