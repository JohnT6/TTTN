import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createReviewAPI } from '../../services/api';
import ToastNotification from './ToastNotification';
import { formatImageUrl } from '../../helpers/helper';

const ReviewModal = ({ isOpen, onClose, product, onSuccess }) => {
  // Lấy thông tin user đã đăng nhập từ Redux Store
  const authUser = useSelector((state) => state.auth?.user || state.user?.user);

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Toast Notifications
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  // Tên hiển thị & Avatar người dùng
  const [displayName, setDisplayName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    if (authUser) {
      setDisplayName(authUser.fullName || authUser.full_name || authUser.name || authUser.email || 'Người dùng');
      setCurrentUserId(authUser.id || null);
      setUserAvatar(authUser.avatar || '');
    } else {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setDisplayName(parsed.fullName || parsed.full_name || parsed.name || parsed.email || 'Người dùng');
          setCurrentUserId(parsed.id || null);
          setUserAvatar(parsed.avatar || '');
        } catch {
          setDisplayName('Người dùng');
        }
      }
    }
  }, [authUser]);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      showToast('warning', 'Thiếu thông tin nhận xét', 'Vui lòng nhập nội dung đánh giá của bạn.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        rating,
        userId: currentUserId,
        userName: displayName,
        userAvatar: userAvatar || null,
        comment: comment.trim(),
      };

      const res = await createReviewAPI(product.id, payload);

      if (res && (res.success || res.data)) {
        showToast('success', 'Đánh giá thành công!', 'Cảm ơn bạn đã nhận xét sản phẩm.');
        setTimeout(() => {
          setComment('');
          setRating(5);
          onSuccess && onSuccess();
          onClose();
        }, 1200);
      } else {
        showToast('error', 'Gửi thất bại', res?.message || 'Có lỗi xảy ra khi gửi đánh giá.');
      }
    } catch (err) {
      showToast('error', 'Lỗi hệ thống', err.message || 'Không thể gửi đánh giá. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  // Mức rating hiển thị hiện tại khi rê chuột hoặc đã click chọn
  const currentRating = hoverRating || rating;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="bg-white border border-gray-200 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="text-lg font-black text-gray-900">Viết Đánh Giá Sản Phẩm</h3>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{product.title || product.name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200/80 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Người đánh giá (Tài khoản đang đăng nhập & Avatar chuẩn) */}
          <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden shrink-0 shadow-2xs">
              <img
                src={formatImageUrl(userAvatar || '/assets/imgs/user_default.jpg')}
                alt={displayName}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/imgs/user_default.jpg';
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs text-gray-500">Đánh giá dưới tên tài khoản:</p>
              <p className="text-sm font-bold text-gray-900">{displayName}</p>
            </div>
          </div>

          {/* Chọn Sao Rating Đột Phá Động */}
          <div className="text-center space-y-2 py-4 bg-gray-50/80 rounded-2xl border border-gray-100">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              CHỌN MỨC ĐỘ HÀI LÒNG *
            </label>

            {/* Các ngôi sao Rating */}
            <div className="flex justify-center items-center gap-2 text-3xl cursor-pointer select-none">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform duration-150 hover:scale-130 focus:outline-none cursor-pointer"
                >
                  <span className={currentRating >= star ? 'text-amber-400 drop-shadow-xs' : 'text-gray-300'}>
                    ★
                  </span>
                </button>
              ))}
            </div>

            {/* Nhãn tiếng Việt cập nhật ĐỘNG tương ứng với currentRating */}
            <p className="text-xs font-extrabold text-amber-600 transition-colors">
              {currentRating === 5 && 'Tuyệt vời (5/5)'}
              {currentRating === 4 && 'Rất tốt (4/5)'}
              {currentRating === 3 && 'Bình thường (3/5)'}
              {currentRating === 2 && 'Tạm được (2/5)'}
              {currentRating === 1 && 'Rất kém (1/5)'}
            </p>
          </div>

          {/* Ô nhập Nhận xét Chi tiết */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              NHẬN XÉT CHI TIẾT *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Chia sẻ cảm nhận của bạn về chất lượng sản phẩm, độ êm ái, kích cỡ vừa vặn..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-gray-900 text-sm outline-none focus:border-black focus:bg-white transition-colors resize-none font-medium"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors cursor-pointer text-xs"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-bold rounded-xl transition-colors cursor-pointer text-xs shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Đang gửi...</span>
                </>
              ) : (
                <span>Gửi đánh giá</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
