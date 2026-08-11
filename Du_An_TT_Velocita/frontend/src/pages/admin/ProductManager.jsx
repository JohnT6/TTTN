import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, RefreshCw, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { getProductsAPI, getCategoriesAPI, deleteProductAPI } from '../../services/api';
import ToastNotification from '../../components/common/ToastNotification';
import ConfirmModal from '../../components/common/ConfirmModal';
import { formatImageUrl, formatCurrencyVND } from '../../helpers/helper';

// SVG Icon Kính lúp tìm kiếm
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 fill-current">
    <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
  </svg>
);

export default function ProductManager() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Confirm Modal & Toast States
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  // Nạp danh sách sản phẩm và danh mục từ CSDL MySQL
  const loadData = async () => {
    setLoading(true);
    try {
      const [resProducts, resCategories] = await Promise.all([
        getProductsAPI(),
        getCategoriesAPI(),
      ]);

      if (resProducts && resProducts.success && resProducts.data) {
        setProducts(resProducts.data.items || resProducts.data);
      }
      if (resCategories && resCategories.success && resCategories.data) {
        const catList = resCategories.data.items || resCategories.data;
        setCategories(Array.isArray(catList) ? catList : []);
      }
    } catch (err) {
      showToast('error', 'Lỗi nạp dữ liệu', err.message || 'Không thể lấy dữ liệu sản phẩm.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Xóa sản phẩm khỏi CSDL MySQL khi xác nhận ở ConfirmModal
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      await deleteProductAPI(deleteTarget.id);
      showToast('success', 'Xóa thành công', `Đã xóa sản phẩm "${deleteTarget.name}".`);
      setDeleteTarget(null);
      await loadData();
    } catch (err) {
      showToast('error', 'Lỗi xóa sản phẩm', err.message || 'Không thể xóa sản phẩm này.');
    } finally {
      setDeleting(false);
    }
  };

  // Lọc sản phẩm theo Tên sản phẩm, Thương hiệu (Category) hoặc Mã kiểu dáng (Style Code)
  const filteredProducts = products.filter((p) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase().trim();

    const nameMatch = (p.name || '').toLowerCase().includes(term);
    const categoryMatch = (p.category?.name || '').toLowerCase().includes(term);
    const styleCodeMatch = (p.styleCode || p.style_code || '').toLowerCase().includes(term);

    return nameMatch || categoryMatch || styleCodeMatch;
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

      {/* Confirm Modal Xóa Sản phẩm */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Xác nhận xóa Sản phẩm"
        message={`Bạn có chắc chắn muốn xóa sản phẩm "${deleteTarget?.name}" khỏi hệ thống CSDL MySQL? Hành động này không thể hoàn tác.`}
        confirmText="Xóa Sản phẩm"
        cancelText="Hủy bỏ"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản lý Sản phẩm</h1>
          <p className="text-xs text-gray-500 mt-1">
            Quản lý toàn bộ danh sách sản phẩm trong hệ thống • Tổng số{' '}
            <span className="font-bold underline text-blue-600">{products.length}</span> sản phẩm
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadData}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 transition-all cursor-pointer"
            title="Làm mới danh sách sản phẩm"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products/create')}
            className="bg-[#003882] hover:bg-[#002868] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm shrink-0"
          >
            <Plus size={16} /> Thêm Sản phẩm mới
          </button>
        </div>
      </div>

      {/* Thanh Tìm kiếm Sản phẩm */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên sản phẩm, hãng giày (category), mã style code..."
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

      {/* Bảng Danh sách Sản phẩm (Khôi phục Cột Giao Diện Gốc 100%) */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-900 uppercase text-xs font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Hình ảnh</th>
                <th className="p-4">Tên sản phẩm</th>
                <th className="p-4">Thương hiệu</th>
                <th className="p-4">Giá gốc</th>
                <th className="p-4">Giá khuyến mãi</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-xs text-gray-400 font-semibold">
                    Đang nạp danh sách sản phẩm từ CSDL MySQL...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-xs text-gray-500 font-semibold">
                    {searchTerm
                      ? `Không tìm thấy sản phẩm nào khớp với từ khóa "${searchTerm}".`
                      : 'Chưa có sản phẩm nào trong cơ sở dữ liệu.'}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const firstImgObj = p.images && p.images.length > 0 ? p.images[0] : null;
                  const mainImage = typeof firstImgObj === 'string'
                    ? firstImgObj
                    : (firstImgObj?.url || firstImgObj?.imageUrl || firstImgObj?.image_url || p.image || p.img || '');

                  const brandName =
                    p.category?.name ||
                    p.category_name ||
                    categories.find((c) => String(c.id) === String(p.categoryId || p.category_id))?.name ||
                    'Khác';

                  const rawPrice = p.basePrice ?? p.base_price ?? p.price ?? (p.variants && p.variants[0]?.price) ?? 0;
                  const rawSalePrice = p.salePrice ?? p.sale_price ?? (p.variants && p.variants[0]?.salePrice) ?? null;

                  const isNewFlag = Boolean((p.isNew ?? p.is_new ?? p.isNewArrival ?? p.is_new_arrival) ?? false);
                  const isBestFlag = Boolean((p.isBest ?? p.is_best ?? p.isFeatured ?? p.is_featured) ?? false);
                  const isSaleFlag = Boolean((p.isSale ?? p.is_sale) || (rawSalePrice && rawSalePrice > 0 && rawSalePrice < rawPrice));

                  return (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <img
                          src={formatImageUrl(mainImage)}
                          alt={p.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/assets/img/product-adidas-1.jpg';
                          }}
                          className="w-14 h-14 object-cover rounded-lg bg-gray-100 border border-gray-200 shrink-0"
                        />
                      </td>
                      <td className="p-4 max-w-xs">
                        <p className="font-bold text-gray-900 line-clamp-1">{p.name}</p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500 font-medium">
                          {(p.styleCode || p.style_code) && (
                            <span className="bg-gray-100 text-gray-700 font-mono font-bold px-1.5 py-0.5 rounded border border-gray-200">
                              {p.styleCode || p.style_code}
                            </span>
                          )}
                          {(p.colorName || p.color_name) && (
                            <span className="text-gray-600 truncate">{p.colorName || p.color_name}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-gray-900 font-bold">{brandName}</td>
                      <td className="p-4 font-semibold text-gray-900">
                        {rawPrice ? formatCurrencyVND(rawPrice) : '-'}
                      </td>
                      <td className="p-4 text-emerald-600 font-extrabold">
                        {rawSalePrice ? formatCurrencyVND(rawSalePrice) : '-'}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1.5 flex-wrap">
                          {isNewFlag && (
                            <span className="bg-blue-50 text-[#003882] border border-blue-200 text-xs px-2.5 py-0.5 rounded-full font-bold">
                              Mới
                            </span>
                          )}
                          {isBestFlag && (
                            <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2.5 py-0.5 rounded-full font-bold">
                              Bán chạy
                            </span>
                          )}
                          {isSaleFlag && (
                            <span className="bg-red-50 text-red-600 border border-red-200 text-xs px-2.5 py-0.5 rounded-full font-bold">
                              Giảm giá
                            </span>
                          )}
                          {!isNewFlag && !isBestFlag && !isSaleFlag && (
                            <span className="bg-gray-100 text-gray-600 border border-gray-200 text-xs px-2.5 py-0.5 rounded-full font-bold">
                              Thường
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3 text-xs font-bold">
                          <button
                            type="button"
                            onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                            className="text-blue-600 hover:underline cursor-pointer"
                          >
                            Sửa
                          </button>
                          {!isEditor && (
                            <button
                              type="button"
                              onClick={() => setDeleteTarget(p)}
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
