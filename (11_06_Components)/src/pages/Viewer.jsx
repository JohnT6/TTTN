import React, { useState, useEffect } from 'react';
import { Render } from '@puckeditor/core';
import puckConfig from '../admin-puck-config';
import { getPageById } from '../services/db';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { filterPuckDataByLang } from '../utils/langUtils';

export default function Viewer({ pageId, onNavigate }) {
  const [currentPage, setCurrentPage] = useState(null);
  const [currentLang, setCurrentLang] = useState('vi'); // Ngôn ngữ mặc định
  const [error, setError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lắng nghe sự kiện đổi ngôn ngữ từ bất kỳ component con nào (ví dụ: AdminHeader)
  useEffect(() => {
    const handleSwitchLangEvent = (e) => {
      if (e.detail) {
        setCurrentLang(e.detail);
      }
    };
    window.addEventListener('switch-language', handleSwitchLangEvent);
    return () => window.removeEventListener('switch-language', handleSwitchLangEvent);
  }, []);

  // Load ban đầu bằng ID
  useEffect(() => {
    if (pageId) {
      const page = getPageById(pageId);
      if (page) {
        setCurrentPage(page);
        setCurrentLang(page.lang || 'vi');
      }
    }
  }, [pageId]);

  // Xử lý khi người dùng đổi ngôn ngữ trên Header giả lập
  const handleSwitchLang = (newLang) => {
    setCurrentLang(newLang);
  };

  if (!currentPage) {
    return <div className="p-8 text-center">Đang tải hoặc không tìm thấy trang...</div>;
  }

  // Lọc dữ liệu trước khi render bằng hàm dùng chung
  const renderData = filterPuckDataByLang(currentPage.data, currentLang);

  return (
    <div className="relative min-h-screen">
      
      {/* Floating Toggle Menu */}
      <div className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end gap-2">
        {/* Expanded Panel */}
        <div className={`transition-all duration-300 transform origin-bottom-right ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
          <div className="bg-white/95 backdrop-blur-md shadow-2xl border border-gray-200 p-4 rounded-2xl flex flex-col gap-4 min-w-[200px]">
            <div className="font-bold text-lg text-teal-600 flex items-center gap-2 border-b border-gray-100 pb-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg>
              Viewer
            </div>
            
            <button 
              onClick={() => onNavigate('manager')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-white hover:bg-teal-500 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Quay về Quản lý
            </button>
            
            <div className="pt-2 border-t border-gray-100">
              <label className="text-xs font-semibold text-gray-500 mb-2 block px-1">Ngôn ngữ hiển thị</label>
              <LanguageSwitcher 
                currentLang={currentLang} 
                onLangChange={handleSwitchLang} 
              />
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-teal-600 hover:bg-teal-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          title="Mở menu điều khiển"
        >
          <svg 
            className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            )}
          </svg>
        </button>
      </div>

      {/* Trang web thực tế */}
      <Render config={puckConfig} data={renderData} />

    </div>
  );
}
