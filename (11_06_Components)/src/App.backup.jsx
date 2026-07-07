import { useState } from 'react';
// ĐÃ THÊM: Import thêm thẻ Render từ thư viện Puck
import { Puck, Render } from '@puckeditor/core';
import '@puckeditor/core/puck.css';
import puckConfig from './admin-puck-config';

// Dữ liệu trống ban đầu
const initialData = {};

export default function App() {
  // Tạo state để lưu lại cục dữ liệu sau khi Admin bấm Publish
  const [puckData, setPuckData] = useState(initialData);

  // Tạo công tắc: true là đang xem thử, false là đang edit
  const [isPreview, setIsPreview] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // NẾU BẬT XEM THỬ: Sẽ dùng thẻ <Render> để vẽ web 100% full màn hình
  if (isPreview) {
    return (
      <div className="relative">
        {/* Nút lơ lửng ở mép phải, trượt sang trái khi hover */}
        <button
          onClick={() => setIsPreview(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed top-24 right-0 z-999999 bg-linear-to-l from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white pl-4 pr-6 py-3 rounded-l-full shadow-2xl transition-transform duration-300 flex items-center gap-3 cursor-pointer group"
          style={{
            transform: isHovered ? 'translateX(0)' : 'translateX(calc(100% - 40px))',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Biểu tượng mũi tên & cài đặt cố định ở đầu nút */}
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5 animate-pulse text-white group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </div>
          <span className="font-bold text-sm tracking-wide whitespace-nowrap">Quay lại chỉnh sửa</span>
        </button>

        {/* Component Render này sẽ đọc cục JSON và vẽ ra giao diện y như thật */}
        <Render config={puckConfig} data={puckData} />
      </div>
    );
  }

  // NẾU ĐANG EDIT: Vẫn hiện màn hình có thanh công cụ hai bên
  return (
    <Puck
      config={puckConfig}
      data={puckData}
      onPublish={(data) => {
        // Khi bấm Publish: Lưu dữ liệu lại và bật công tắc nhảy sang màn hình Xem thử
        setPuckData(data);
        setIsPreview(true);
      }}
      iframe={{ enabled: false }}
    />
  );
}