import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, Info, CheckCircle2, XCircle, X } from 'lucide-react';

/**
 * Component Notification Toast Reusable (Giao diện màu sáng Light Theme)
 * Sử dụng React Portal để đính thẳng vào document.body, hiển thị cố định ở góc trên bên phải màn hình (Top Right).
 */
export default function ToastNotification({
  type = 'info',
  title,
  message,
  onClose,
  duration = 4000,
}) {
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Cấu hình Icon và Màu sắc cho từng loại Toast (Tông nền SÁNG Light Theme)
  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-white" />,
          iconBg: 'bg-emerald-500',
          borderColor: 'border-emerald-200',
          defaultTitle: 'Thành công',
        };
      case 'error':
        return {
          icon: <XCircle className="w-5 h-5 text-white" />,
          iconBg: 'bg-red-500',
          borderColor: 'border-red-200',
          defaultTitle: 'Có lỗi xảy ra',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-white" />,
          iconBg: 'bg-amber-500',
          borderColor: 'border-amber-200',
          defaultTitle: 'Cảnh báo',
        };
      case 'info':
      default:
        return {
          icon: <Info className="w-5 h-5 text-white" />,
          iconBg: 'bg-blue-500',
          borderColor: 'border-blue-200',
          defaultTitle: 'Thông tin',
        };
    }
  };

  const config = getToastConfig();

  // Render trực tiếp lên document.body để cố định sát góc trên cùng bên phải màn hình (fixed top-6 right-6)
  return createPortal(
    <div className="fixed top-6 right-6 z-[99999] max-w-sm w-full transition-all duration-300">
      <div
        className={`bg-white/95 backdrop-blur-md rounded-2xl p-4 border ${config.borderColor} shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex items-start gap-3.5 select-none`}
      >
        {/* Circle Icon Badge */}
        <div className={`p-1.5 rounded-full ${config.iconBg} shrink-0 mt-0.5 shadow-xs`}>
          {config.icon}
        </div>

        {/* Content Area */}
        <div className="flex-1 pr-2 space-y-0.5">
          <h4 className="text-sm font-bold text-gray-900 tracking-tight">
            {title || config.defaultTitle}
          </h4>
          {message && (
            <p className="text-xs text-gray-600 leading-relaxed break-words">
              {message}
            </p>
          )}
        </div>

        {/* Close Button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-lg hover:bg-gray-100 cursor-pointer shrink-0"
            title="Đóng thông báo"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>,
    document.body
  );
}
