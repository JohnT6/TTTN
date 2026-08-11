import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Plus, RefreshCw, X, Search } from 'lucide-react';
import { getNewsAPI, deleteNewsAPI } from '../../services/api';
import ToastNotification from '../../components/common/ToastNotification';
import ConfirmModal from '../../components/common/ConfirmModal';
import { formatImageUrl } from '../../helpers/helper';

export default function NewsManager() {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Confirm Modal & Toast States
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  // Nạp danh sách Bài viết Tin tức từ Backend CSDL MySQL
  const loadNews = async () => {
    setLoading(true);
    try {
      const res = await getNewsAPI('admin=true');
      if (res && res.success && res.data) {
        const items = res.data.items || res.data;
        setNewsList(Array.isArray(items) ? items : []);
      }
    } catch (err) {
      showToast('error', 'Lỗi nạp tin tức', err.message || 'Không thể lấy danh sách tin tức từ server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  // Xóa bài viết khỏi CSDL MySQL khi người dùng xác nhận ở ConfirmModal
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      await deleteNewsAPI(deleteTarget.id);
      showToast('success', 'Xóa thành công', `Đã xóa bài viết "${deleteTarget.title}".`);
      setDeleteTarget(null);
      await loadNews();
    } catch (err) {
      showToast('error', 'Lỗi xóa bài viết', err.message || 'Không thể xóa bài viết này.');
    } finally {
      setDeleting(false);
    }
  };

  // Lọc bài viết theo tiêu đề hoặc chuyên mục
  const filteredNews = newsList.filter((n) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase().trim();
    const titleMatch = (n.title || '').toLowerCase().includes(term);
    const categoryMatch = (n.category || '').toLowerCase().includes(term);
    const authorMatch = (n.author || '').toLowerCase().includes(term);
    return titleMatch || categoryMatch || authorMatch;
  });

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

      {/* Confirm Modal Xóa Bài viết Tin tức */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Xác nhận xóa Bài viết Tin tức"
        message={`Bạn có chắc chắn muốn xóa bài viết "${deleteTarget?.title}" khỏi hệ thống CSDL MySQL? Hành động này không thể hoàn tác.`}
        confirmText="Xóa Bài viết"
        cancelText="Hủy bỏ"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản lý Bài viết & Tin tức</h1>
          <p className="text-xs text-gray-500 mt-1">
            Đăng tin tức, mẹo vặt & xu hướng thời trang • Tổng số{' '}
            <span className="font-bold underline text-blue-600">{newsList.length}</span> bài viết
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadNews}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 transition-all cursor-pointer"
            title="Làm mới danh sách bài viết"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/news/create')}
            className="bg-[#003882] hover:bg-[#002868] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm shrink-0"
          >
            <Plus size={16} /> Thêm Bài Viết Mới
          </button>
        </div>
      </div>

      {/* Thanh Tìm kiếm Bài viết */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tiêu đề bài viết, chuyên mục, tác giả..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-9 py-2.5 text-xs text-gray-900 font-medium placeholder-gray-400 outline-none focus:border-black focus:bg-white transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black cursor-pointer"
              title="Xóa từ khóa"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Bảng Danh sách Bài viết Tin tức */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-900 uppercase text-xs font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Hình ảnh đại diện</th>
                <th className="p-4">Tiêu đề bài viết</th>
                <th className="p-4">Chuyên mục</th>
                <th className="p-4">Tác giả</th>
                <th className="p-4">Ngày đăng</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-xs text-gray-400 font-semibold">
                    Đang nạp danh sách bài viết từ CSDL MySQL...
                  </td>
                </tr>
              ) : filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-xs text-gray-500 font-semibold">
                    {searchTerm
                      ? `Không tìm thấy bài viết nào khớp với từ khóa "${searchTerm}".`
                      : 'Chưa có bài viết tin tức nào trong CSDL MySQL. Bấm "+ Thêm Bài Viết Mới" để tạo.'}
                  </td>
                </tr>
              ) : (
                filteredNews.map((n) => {
                  const isActive = Boolean(n.status ?? true);

                  return (
                    <tr key={n.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <div className="relative w-20 h-12 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                          <img
                            src={formatImageUrl(n.image)}
                            alt={n.title}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/assets/imgs/blog-clean-shoes.png';
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="p-4 max-w-sm">
                        <p className="font-bold text-gray-900 line-clamp-1">{n.title}</p>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{n.desc || '-'}</p>
                      </td>
                      <td className="p-4">
                        <span className="bg-slate-100 text-slate-800 font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-200 uppercase">
                          {n.category || 'GENERAL'}
                        </span>
                      </td>
                      <td className="p-4 text-xs font-semibold text-gray-700">{n.author || 'Velocità Admin'}</td>
                      <td className="p-4 text-xs font-mono text-gray-500">{n.date || 'Gần đây'}</td>
                      <td className="p-4">
                        {isActive ? (
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-bold">
                            Bật (Công khai)
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
                            onClick={() => navigate(`/admin/news/edit/${n.id}`)}
                            className="text-blue-600 hover:underline cursor-pointer"
                          >
                            Sửa
                          </button>
                          {!isEditor && (
                            <button
                              type="button"
                              onClick={() => setDeleteTarget(n)}
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
