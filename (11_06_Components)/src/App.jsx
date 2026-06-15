import React, { useState } from 'react';
// ĐÃ THÊM: Import thêm thẻ Render từ thư viện Puck
import { Puck, Render } from '@measured/puck';
import '@measured/puck/puck.css';
import puckConfig from './admin-puck-config';

// Dữ liệu trống ban đầu
const initialData = {};

export default function App() {
  // Tạo state để lưu lại cục dữ liệu sau khi Admin bấm Publish
  const [puckData, setPuckData] = useState(initialData);

  // Tạo công tắc: true là đang xem thử, false là đang edit
  const [isPreview, setIsPreview] = useState(false);

  // NẾU BẬT XEM THỬ: Sẽ dùng thẻ <Render> để vẽ web 100% full màn hình
  if (isPreview) {
    return (
      <div className="relative">
        {/* Nút lơ lửng để quay lại màn hình Edit */}
        <button
          onClick={() => setIsPreview(false)}
          className="fixed top-4 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded shadow-lg hover:bg-gray-700"
        >
          ← Quay lại sửa
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