import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { Plus, RefreshCw, X, Upload, Loader2 } from 'lucide-react';
import {
  getUsersAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
  uploadMultipleFilesAPI,
} from '../../services/api';
import ToastNotification from '../../components/common/ToastNotification';
import ConfirmModal from '../../components/common/ConfirmModal';
import { formatImageUrl, toRelativePath } from '../../helpers/helper';

// SVG Icon Kính lúp tìm kiếm đồng bộ 100% với các trang Quản lý khác
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 fill-current">
    <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
  </svg>
);

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Modal Thêm / Sửa Tài khoản
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [avatar, setAvatar] = useState('');
  const [status, setStatus] = useState(true);

  // Submitting & Uploading States
  const [submitting, setSubmitting] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Confirm Modal & Toast States
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  // Khóa thanh cuộn màn hình chính khi mở Modal
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  // Nạp danh sách tài khoản từ Backend API CSDL MySQL
  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsersAPI();
      if (res && res.success && res.data) {
        const userList = res.data.items || res.data;
        setUsers(Array.isArray(userList) ? userList : []);
      }
    } catch (err) {
      showToast('error', 'Lỗi nạp người dùng', err.message || 'Không thể tải danh sách tài khoản.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Mở modal Thêm mới tài khoản
  const handleOpenAddModal = () => {
    setEditingUser(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setRole('USER');
    setAvatar('');
    setStatus(true);
    setShowModal(true);
  };

  // Mở modal Sửa thông tin tài khoản
  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setFullName(user.fullName || user.full_name || user.name || '');
    setEmail(user.email || '');
    setPhone(user.phone || '');
    setPassword('');
    setRole(user.role || 'USER');
    setAvatar(user.avatar || '');
    setStatus(Boolean(user.status ?? true));
    setShowModal(true);
  };

  // Upload Ảnh Đại Diện User vào /uploads/avatars/
  const handleAvatarUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingAvatar(true);
    try {
      const res = await uploadMultipleFilesAPI(files, 'avatars');
      if (res && res.success && res.data && res.data[0]) {
        setAvatar(res.data[0]);
        showToast('success', 'Tải avatar thành công', 'Đã lưu file ảnh đại diện.');
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

  // Lưu Thêm mới hoặc Cập nhật Người dùng
  const handleSaveUser = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      showToast('warning', 'Thiếu thông tin', 'Vui lòng nhập Họ và tên.');
      return;
    }
    if (!email.trim()) {
      showToast('warning', 'Thiếu thông tin', 'Vui lòng nhập địa chỉ Email.');
      return;
    }

    setSubmitting(true);
    const payload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      role,
      avatar: toRelativePath(avatar) || null,
      status: Boolean(status),
    };
    if (password.trim()) {
      payload.password = password.trim();
    }

    try {
      if (editingUser) {
        const res = await updateUserAPI(editingUser.id, payload);
        if (res && res.success) {
          showToast('success', 'Cập nhật thành công', `Đã cập nhật tài khoản ${fullName}.`);
          setShowModal(false);
          await loadUsers();
        }
      } else {
        const res = await createUserAPI(payload);
        if (res && res.success) {
          showToast('success', 'Tạo tài khoản thành công', `Đã tạo mới tài khoản ${fullName}.`);
          setShowModal(false);
          await loadUsers();
        }
      }
    } catch (err) {
      showToast('error', 'Lỗi lưu tài khoản', err.message || 'Không thể lưu thông tin người dùng.');
    } finally {
      setSubmitting(false);
    }
  };

  // Xóa Người dùng khỏi CSDL MySQL khi xác nhận ở ConfirmModal
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      await deleteUserAPI(deleteTarget.id);
      showToast('success', 'Xóa thành công', `Đã xóa tài khoản "${deleteTarget.fullName || deleteTarget.email}".`);
      setDeleteTarget(null);
      await loadUsers();
    } catch (err) {
      showToast('error', 'Lỗi xóa tài khoản', err.message || 'Không thể xóa tài khoản này.');
    } finally {
      setDeleting(false);
    }
  };

  // Nút Nhanh: Đổi Vai Trò trực tiếp trên Bảng
  const handleQuickRoleChange = async (user, newRole) => {
    try {
      await updateUserAPI(user.id, { role: newRole });
      showToast('success', 'Đổi vai trò thành công', `Đã đổi vai trò của ${user.fullName || user.email} thành ${newRole}.`);
      await loadUsers();
    } catch (err) {
      showToast('error', 'Lỗi đổi vai trò', err.message || 'Không thể thay đổi vai trò.');
    }
  };

  // Nút Nhanh: Khóa / Kích Hoạt Trạng Thái trực tiếp trên Bảng
  const handleQuickToggleStatus = async (user) => {
    const newStatus = !Boolean(user.status ?? true);
    try {
      await updateUserAPI(user.id, { status: newStatus });
      showToast(
        'success',
        'Cập nhật trạng thái thành công',
        `Đã ${newStatus ? 'Kích hoạt' : 'Khóa'} tài khoản ${user.fullName || user.email}.`
      );
      await loadUsers();
    } catch (err) {
      showToast('error', 'Lỗi đổi trạng thái', err.message || 'Không thể thay đổi trạng thái.');
    }
  };

  // Lọc tài khoản theo Từ khóa tìm kiếm & Phân quyền
  const filteredUsers = users.filter((u) => {
    const nameStr = (u.fullName || u.full_name || u.name || '').toLowerCase();
    const emailStr = (u.email || '').toLowerCase();
    const phoneStr = (u.phone || '').toLowerCase();
    const term = searchTerm.toLowerCase().trim();

    const matchSearch = !term || nameStr.includes(term) || emailStr.includes(term) || phoneStr.includes(term);
    const matchRole = roleFilter === 'all' || (u.role || 'USER').toLowerCase() === roleFilter.toLowerCase();

    return matchSearch && matchRole;
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

      {/* Confirm Modal Xóa Tài khoản */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Xác nhận xóa Tài khoản Người dùng"
        message={`Bạn có chắc chắn muốn xóa tài khoản "${deleteTarget?.fullName || deleteTarget?.email}" khỏi hệ thống CSDL MySQL? Hành động này không thể hoàn tác.`}
        confirmText="Xóa Tài khoản"
        cancelText="Hủy bỏ"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản lý Tài khoản & Người dùng</h1>
          <p className="text-xs text-gray-500 mt-1">
            Danh sách tài khoản đã đăng ký trên hệ thống VELOCITÀ • Tổng số{' '}
            <span className="font-bold underline text-blue-600">{users.length}</span> tài khoản
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadUsers}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 transition-all cursor-pointer"
            title="Làm mới danh sách tài khoản"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="bg-[#003882] hover:bg-[#002868] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm shrink-0"
          >
            <Plus size={16} /> Thêm người dùng mới
          </button>
        </div>
      </div>

      {/* Thanh Tìm kiếm & Lọc Vai trò (Đồng bộ 100% Giao diện các trang khác) */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên người dùng, email, số điện thoại..."
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

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Phân Quyền:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-900 outline-none focus:border-black focus:bg-white transition-colors cursor-pointer"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="superadmin">SUPERADMIN (Tổng quản)</option>
            <option value="admin">ADMIN (Quản trị viên)</option>
            <option value="editor">EDITOR (Biên tập viên)</option>
            <option value="user">USER (Khách hàng)</option>
          </select>
        </div>
      </div>

      {/* Bảng Danh sách Tài khoản Người dùng */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-900 uppercase text-xs font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Người dùng</th>
                <th className="p-4">Email / Điện thoại</th>
                <th className="p-4">Vai trò (Role)</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-xs text-gray-400 font-semibold">
                    Đang nạp danh sách tài khoản từ CSDL MySQL...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-xs text-gray-500 font-semibold">
                    {searchTerm
                      ? `Không tìm thấy tài khoản nào khớp với từ khóa "${searchTerm}".`
                      : 'Chưa có tài khoản nào trong hệ thống.'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const displayName = u.fullName || u.full_name || u.name || 'Người dùng';
                  const isUserActive = Boolean(u.status ?? true);
                  const userRole = u.role || 'USER';

                  return (
                    <tr key={u.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 text-white overflow-hidden flex items-center justify-center font-bold text-sm shrink-0 border border-gray-200">
                            <img
                              src={formatImageUrl(u.avatar || '/assets/imgs/user_default.jpg')}
                              alt={displayName}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/assets/imgs/user_default.jpg';
                              }}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 line-clamp-1">{displayName}</p>
                            <p className="text-[11px] text-gray-400 font-mono mt-0.5">ID: #{u.id.substring(0, 8)}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <p className="text-xs font-mono font-bold text-gray-900">{u.email}</p>
                        {u.phone && <p className="text-[11px] font-mono text-gray-500 mt-0.5">{u.phone}</p>}
                      </td>

                      <td className="p-4">
                        <select
                          value={userRole}
                          onChange={(e) => handleQuickRoleChange(u, e.target.value)}
                          className={`text-xs font-bold px-3 py-1 rounded-full border cursor-pointer outline-none transition-colors ${
                            userRole === 'SUPERADMIN'
                              ? 'bg-rose-900 text-white border-rose-900'
                              : userRole === 'ADMIN'
                              ? 'bg-black text-white border-black'
                              : userRole === 'EDITOR'
                              ? 'bg-purple-100 text-purple-900 border-purple-300'
                              : 'bg-gray-100 text-gray-800 border-gray-300'
                          }`}
                        >
                          <option value="SUPERADMIN" className="bg-white text-gray-900">SUPERADMIN (Tổng Quản)</option>
                          <option value="ADMIN" className="bg-white text-gray-900">ADMIN (Quản trị)</option>
                          <option value="EDITOR" className="bg-white text-gray-900">EDITOR (Biên tập)</option>
                          <option value="USER" className="bg-white text-gray-900">USER (Khách hàng)</option>
                        </select>
                      </td>

                      <td className="p-4">
                        {isUserActive ? (
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-bold">
                            Hoạt động
                          </span>
                        ) : (
                          <span className="bg-red-50 text-red-600 border border-red-200 text-xs px-2.5 py-0.5 rounded-full font-bold">
                            Đã khóa
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3 text-xs font-bold">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(u)}
                            className="text-blue-600 hover:underline cursor-pointer"
                          >
                            Sửa
                          </button>
                          <button
                            type="button"
                            onClick={() => handleQuickToggleStatus(u)}
                            className={isUserActive ? 'text-amber-600 hover:underline cursor-pointer' : 'text-emerald-600 hover:underline cursor-pointer'}
                          >
                            {isUserActive ? 'Khóa' : 'Kích hoạt'}
                          </button>
                          {!isEditor && (
                            <button
                              type="button"
                              onClick={() => setDeleteTarget(u)}
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

      {/* Modal Thêm / Chỉnh Sửa Tài Khoản Người Dùng */}
      {showModal &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
              {/* Header Modal */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-lg font-black text-gray-900">
                  {editingUser ? 'Chỉnh Sửa Tài Khoản Người Dùng' : 'Tạo Tài Khoản Người Dùng Mới'}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSaveUser} className="space-y-4">
                {/* Họ tên */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Họ và Tên *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-bold outline-none focus:border-black transition-colors"
                  />
                </div>

                {/* Email & Điện thoại */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Địa chỉ Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-medium outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Số Điện Thoại
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0912345678"
                      className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-medium outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                {/* Mật khẩu */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Mật khẩu {editingUser && '(Để trống nếu không đổi)'}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={editingUser ? 'Nhập mật khẩu mới...' : 'Mặc định: 123456'}
                    className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-medium outline-none focus:border-black transition-colors"
                  />
                </div>

                {/* Phân quyền (Role) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Vai trò Phân quyền (Role)
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-bold outline-none focus:border-black transition-colors cursor-pointer"
                  >
                    <option value="SUPERADMIN">SUPERADMIN (Tổng quản trị cao nhất)</option>
                    <option value="ADMIN">ADMIN (Quản trị viên toàn quyền)</option>
                    <option value="EDITOR">EDITOR (Biên tập tin tức & sản phẩm)</option>
                    <option value="USER">USER (Khách hàng thông thường)</option>
                  </select>
                </div>

                {/* Tải Ảnh Đại Diện Avatar */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Ảnh Đại Diện Avatar
                  </label>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 text-white overflow-hidden flex items-center justify-center font-bold shrink-0">
                      <img
                        src={formatImageUrl(avatar || '/assets/imgs/user_default.jpg')}
                        alt="Preview Avatar"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/imgs/user_default.jpg';
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 hover:border-black rounded-lg text-xs font-bold text-gray-800 transition-colors cursor-pointer shadow-2xs">
                        {uploadingAvatar ? <Loader2 size={14} className="animate-spin text-black" /> : <Upload size={14} />}
                        <span>{uploadingAvatar ? 'Đang tải...' : 'Chọn Avatar'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          disabled={uploadingAvatar}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Trạng thái tài khoản */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Trạng thái Tài khoản
                  </label>
                  <div className="flex gap-4 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="user_status"
                        checked={status === true}
                        onChange={() => setStatus(true)}
                        className="w-4 h-4 text-black focus:ring-black cursor-pointer"
                      />
                      <span className="text-xs font-bold text-emerald-700">Hoạt động</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="user_status"
                        checked={status === false}
                        onChange={() => setStatus(false)}
                        className="w-4 h-4 text-black focus:ring-black cursor-pointer"
                      />
                      <span className="text-xs font-bold text-red-600">Khóa tài khoản</span>
                    </label>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-black hover:bg-gray-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    {submitting && <Loader2 size={16} className="animate-spin text-white" />}
                    {editingUser ? 'Cập Nhật' : 'Tạo Tài Khoản'}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
