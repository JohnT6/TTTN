import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Lock, Upload, Loader2, Save, ShieldCheck } from 'lucide-react';
import { updateUserAPI, uploadMultipleFilesAPI } from '../../services/api';
import { updateUserInfo } from '../../store/authSlice';
import ToastNotification from '../../components/common/ToastNotification';
import { formatImageUrl } from '../../helpers/helper';

export default function ProfilePage() {
  const { user, isAuthenticated } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || user.full_name || user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setAvatar(user.avatar || '');
    }
  }, [user]);

  // Nếu chưa đăng nhập -> Chuyển hướng sang /sign-in
  if (!isAuthenticated || !user) {
    return <Navigate to="/sign-in" replace />;
  }

  // Upload Ảnh Đại Diện User
  const handleAvatarUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingAvatar(true);
    try {
      const res = await uploadMultipleFilesAPI(files, 'avatars');
      if (res && res.success && res.data && res.data[0]) {
        setAvatar(res.data[0]);
        showToast('success', 'Tải avatar thành công', 'Đã chọn ảnh đại diện mới.');
      } else {
        showToast('error', 'Tải avatar thất bại', res?.message || 'Không thể upload ảnh.');
      }
    } catch (err) {
      showToast('error', 'Lỗi upload ảnh', err.message || 'Lỗi khi tải avatar lên server.');
    } finally {
      setUploadingAvatar(false);
      e.target.value = '';
    }
  };

  // Cập Nhật Thông Tin Tài Khoản
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      showToast('warning', 'Thiếu thông tin', 'Vui lòng nhập Họ và tên.');
      return;
    }

    setSubmitting(true);
    const payload = {
      fullName: fullName.trim(),
      phone: phone.trim() || null,
      address: address.trim() || null,
      avatar: avatar || null,
    };
    if (password.trim()) {
      payload.password = password.trim();
    }

    try {
      const res = await updateUserAPI(user.id, payload);
      if (res && res.success) {
        dispatch(updateUserInfo(res.data || payload));
        showToast('success', 'Cập nhật thành công', 'Đã lưu thông tin tài khoản mới.');
        setPassword('');
      } else {
        showToast('error', 'Cập nhật thất bại', res?.message || 'Không thể lưu thay đổi.');
      }
    } catch (err) {
      showToast('error', 'Lỗi hệ thống', err.message || 'Không thể cập nhật thông tin.');
    } finally {
      setSubmitting(false);
    }
  };

  const userRole = (user.role || 'USER').toUpperCase();

  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-28 md:pt-32 pb-16 px-4">
      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Breadcrumb */}
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Chỉnh Sửa Tài Khoản</h1>
            <p className="text-xs text-gray-500 mt-1">
              Quản lý thông tin cá nhân, địa chỉ giao hàng và ảnh đại diện của bạn.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/order-history')}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 rounded-xl transition-all cursor-pointer"
          >
            Xem Lịch Sử Đơn Hàng →
          </button>
        </div>

        {/* Profile Form Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xs space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-black overflow-hidden shadow-md shrink-0">
                <img
                  src={formatImageUrl(avatar || '/assets/imgs/user_default.jpg')}
                  alt={fullName}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/imgs/user_default.jpg';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-800 transition-colors">
                {uploadingAvatar ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={uploadingAvatar}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-xl font-black text-gray-900">{fullName || 'Người Dùng VELOCITÀ'}</h2>
              <p className="text-xs text-gray-500 font-mono">{email}</p>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1 bg-black text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                  <ShieldCheck size={12} />
                  <span>{userRole}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Họ tên */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <User size={14} className="text-gray-500" />
                  <span>Họ và Tên *</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nhập họ và tên đầy đủ..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-sm font-bold text-gray-900 outline-none focus:border-black focus:bg-white transition-colors"
                />
              </div>

              {/* Email (Chỉ đọc) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail size={14} className="text-gray-500" />
                  <span>Địa Chỉ Email</span>
                </label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full bg-gray-100 border border-gray-200 rounded-2xl p-3.5 text-sm font-mono font-bold text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Số điện thoại */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone size={14} className="text-gray-500" />
                  <span>Số Điện Thoại Nhận Hàng</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ví dụ: 0912345678"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-sm font-medium text-gray-900 outline-none focus:border-black focus:bg-white transition-colors"
                />
              </div>

              {/* Đổi Mật Khẩu */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock size={14} className="text-gray-500" />
                  <span>Mật Khẩu Mới (Để trống nếu không đổi)</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-sm font-medium text-gray-900 outline-none focus:border-black focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Địa chỉ nhận hàng mặc định */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={14} className="text-gray-500" />
                <span>Địa Chỉ Nhận Hàng Mặc Định</span>
              </label>
              <textarea
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-sm font-medium text-gray-900 outline-none focus:border-black focus:bg-white transition-colors resize-none"
              />
            </div>

            {/* Footer Submit Button */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3.5 bg-black hover:bg-gray-800 text-white font-bold text-sm rounded-2xl transition-all cursor-pointer shadow-md flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? <Loader2 size={16} className="animate-spin text-white" /> : <Save size={16} />}
                <span>Lưu Thay Đổi Thông Tin</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
