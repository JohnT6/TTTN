import React, { useState, useEffect } from 'react';
import { Puck } from '@puckeditor/core';
import '@puckeditor/core/puck.css';
import puckConfig from '../admin-puck-config';
import { getPageById, savePage } from '../services/db';

export default function Editor({ pageId, editLang = 'vi', onNavigate }) {
  // Page meta state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('draft');
  const [puckData, setPuckData] = useState(null);

  useEffect(() => {
    if (pageId) {
      const page = getPageById(pageId);
      if (page) {
        setTitle(page.title || '');
        setSlug(page.slug || '');
        setStatus(page.status || 'draft');
        
        // Lọc ra các component thuộc ngôn ngữ đang edit (hoặc chưa gán)
        const originalData = page.data || {};
        const allContent = originalData.content || [];
        const filteredContent = allContent.filter(
            c => c.props.lang === editLang || !c.props.lang || c.props.lang === 'all'
        );
        
        setPuckData({ ...originalData, content: filteredContent });
      } else {
        setPuckData({});
      }
    } else {
      // Default new page
      setTitle('Trang mới');
      setSlug('/trang-moi');
      setStatus('draft');
      setPuckData({});
    }
  }, [pageId, editLang]);

  const handlePublish = (data) => {
    // 1. Gắn cứng ngôn ngữ đang edit cho toàn bộ component hiển thị
    const enforcedContent = data.content.map(c => ({
      ...c,
      props: { ...c.props, lang: c.props.lang || editLang }
    }));

    // 2. Lấy lại cục data cũ trong DB để móc những component bị ẩn ra
    let hiddenContent = [];
    if (pageId) {
      const page = getPageById(pageId);
      if (page && page.data && page.data.content) {
        hiddenContent = page.data.content.filter(
          c => c.props.lang !== editLang && c.props.lang !== 'all' && c.props.lang
        );
      }
    }

    // 3. Ghép lại với nhau
    const mergedData = {
      ...data,
      content: [...hiddenContent, ...enforcedContent]
    };

    // Save to DB
    const newPageId = savePage({
      id: pageId,
      title,
      slug,
      status: 'published',
      data: mergedData
    });
    alert('Đã xuất bản (Publish) trang thành công!');
    // Navigate back to manager
    onNavigate('manager');
  };

  return (
    <div className="flex flex-col h-screen">
      <style>{`
        /* Ghi đè height của Puck để không bị tràn ra khỏi màn hình do top bar */
        .puck-editor-wrapper > div {
          height: 100% !important;
          min-height: 100% !important;
          max-height: 100% !important;
        }
      `}</style>
      {/* Top Bar for Meta Data */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm z-50">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={() => onNavigate('manager')}
            className="text-gray-500 hover:text-gray-900 mr-4 flex items-center gap-1 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Quay lại
          </button>
          
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-500">Tiêu đề trang</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              className="font-bold text-lg focus:outline-none focus:border-b border-blue-500 bg-transparent"
              placeholder="Nhập tiêu đề..."
            />
          </div>
          <div className="flex flex-col border-l border-gray-200 pl-4 ml-2">
            <label className="text-xs font-semibold text-gray-500">Đường dẫn (Slug)</label>
            <input 
              type="text" 
              value={slug} 
              onChange={e => setSlug(e.target.value)}
              className="text-gray-600 font-mono text-sm focus:outline-none focus:border-b border-blue-500 bg-transparent w-48"
              placeholder="/vi-du"
            />
          </div>
          <div className="flex flex-col border-l border-gray-200 pl-4 ml-2 justify-center">
             <span className={`px-3 py-1 rounded text-xs font-bold ${editLang === 'vi' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                ĐANG SỬA BẢN {editLang.toUpperCase()}
             </span>
          </div>
        </div>
      </div>

      {/* Puck Editor */}
      <div className="flex-1 overflow-hidden relative puck-editor-wrapper">
        {puckData !== null ? (
          <Puck
            key={pageId || 'new'}
            config={puckConfig}
            data={puckData}
            onPublish={handlePublish}
            iframe={{ enabled: false }}
          />
        ) : (
          <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>
        )}
      </div>
    </div>
  );
}
