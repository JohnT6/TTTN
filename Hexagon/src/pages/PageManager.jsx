import React, { useState, useEffect } from 'react';
import { getAllPages, deletePage, duplicatePageToLang, deleteLangFromPage } from '../services/db';
import { AVAILABLE_LANGUAGES } from '../utils/langUtils';

export default function PageManager({ onNavigate }) {
  const [pages, setPages] = useState([]);
  
  // State lưu id của các row đang được xổ xuống (accordion/dropdown)
  const [expandedRows, setExpandedRows] = useState([]);

  // State for Copy Modal
  const [copyModal, setCopyModal] = useState({ isOpen: false, pageId: null, sourceLang: null, targetLang: '' });

  useEffect(() => {
    const pagesList = getAllPages();
    setPages(pagesList);
  }, []);

  const toggleExpand = (id) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleCreateNew = () => {
    onNavigate('editor', null); // Create new page
  };

  const handleEdit = (id, editLang) => {
    onNavigate('editor', id, editLang);
  };

  const handleView = (id) => {
    onNavigate('viewer', id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xoá trang này?')) {
      deletePage(id);
      setPages(getAllPages());
    }
  };

  const handleDuplicateFromLang = (pageId, sourceLang) => {
    const page = pages.find(p => p.id === pageId);
    if (!page) return;
    
    // Auto-select the first available language that isn't the source
    const defaultTarget = AVAILABLE_LANGUAGES.find(l => l.code !== sourceLang)?.code || '';
    
    setCopyModal({
      isOpen: true,
      pageId,
      sourceLang,
      targetLang: defaultTarget
    });
  };

  const executeCopy = () => {
    const { pageId, sourceLang, targetLang } = copyModal;
    if (!targetLang) return;

    if (targetLang === sourceLang) {
      alert(`Vui lòng chọn một ngôn ngữ khác ngôn ngữ gốc (${sourceLang.toUpperCase()})!`);
      return;
    }

    const page = pages.find(p => p.id === pageId);
    if (checkHasLang(page, targetLang)) {
      alert(`Trang này đã có bản dịch ${targetLang.toUpperCase()} rồi! Vui lòng chọn ngôn ngữ khác.`);
      return;
    }

    const resultId = duplicatePageToLang(pageId, sourceLang, targetLang);
    if (resultId) {
      alert(`Đã nhân bản từ ${sourceLang.toUpperCase()} sang ${targetLang.toUpperCase()} thành công! Bạn có thể vào chỉnh sửa bản mới.`);
      setPages(getAllPages()); // Cập nhật lại list
      setCopyModal({ isOpen: false, pageId: null, sourceLang: null, targetLang: '' });
    }
  };

  const handleDeleteLang = (pageId, langToDelete) => {
    if (confirm(`Bạn có chắc muốn xoá bản dịch ${langToDelete.toUpperCase()} của trang này không? Nếu không còn bản dịch nào, trang sẽ bị xoá hoàn toàn.`)) {
      deleteLangFromPage(pageId, langToDelete);
      setPages(getAllPages());
    }
  };

  const checkHasLang = (page, lang) => {
    if (lang === 'vi') return true; // Luôn có vi (mặc định)
    return page.data?.content?.some(c => c.props.lang === lang);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Quản lý Pages
            </h1>
            <p className="text-gray-500 text-sm mt-1">Tạo và quản lý các trang với PUCK Visual Builder</p>
          </div>
          <button 
            onClick={handleCreateNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            + Tạo Page Mới
          </button>
        </div>

        {/* Bảng danh sách */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Tiêu đề</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4 text-center">Ngôn ngữ</th>
                <th className="px-6 py-4 text-center">Trạng thái</th>
                <th className="px-6 py-4">Cập nhật</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pages.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    Chưa có trang nào. Hãy tạo trang đầu tiên!
                  </td>
                </tr>
              ) : (
                pages.flatMap(page => {
                  return AVAILABLE_LANGUAGES
                    .filter(lang => checkHasLang(page, lang.code))
                    .map(lang => ({ page, lang }));
                }).map(({ page, lang }, index) => {
                  const isVi = lang.code === 'vi';
                  // Check if this page has missing translations to show "Tạo bản sao"
                  const hasMissingLangs = AVAILABLE_LANGUAGES.some(l => !checkHasLang(page, l.code));
                  const firstMissingLang = AVAILABLE_LANGUAGES.find(l => !checkHasLang(page, l.code))?.code;

                  return (
                    <tr key={`${page.id}-${lang.code}`} className="hover:bg-gray-50 transition-colors bg-white">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                          <div>
                            <div className="font-medium text-gray-800 text-base">
                              {page.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              <span>SEO: {page.title}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-50 text-gray-700 px-2 py-1 rounded text-sm font-mono">
                          {page.slug || '/'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          <span className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold ${isVi ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                            {lang.code.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${page.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {page.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-800 text-sm">
                        {page.updatedAt || '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-4 items-center">
                          <button onClick={() => handleDuplicateFromLang(page.id, lang.code)} title={`Tạo bản sao từ ${lang.code.toUpperCase()}`} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); handleView(page.id); }} title="Xem thử Trang này" className="text-teal-600 hover:text-teal-800 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                          </button>
                          <button onClick={() => handleEdit(page.id, lang.code)} title={`Chỉnh sửa bản ${lang.code.toUpperCase()}`} className="text-blue-600 hover:text-blue-800">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                          </button>
                          <button onClick={() => isVi ? handleDelete(page.id) : handleDeleteLang(page.id, lang.code)} title={isVi ? "Xoá hoàn toàn trang này" : `Xoá bản ${lang.code.toUpperCase()}`} className="text-red-600 hover:text-red-800">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
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

      {/* Copy Modal */}
      {copyModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-[400px] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800">Tạo bản sao ngôn ngữ</h3>
              <button 
                onClick={() => setCopyModal({ isOpen: false, pageId: null, sourceLang: null, targetLang: '' })}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Bạn đang tạo một bản sao từ ngôn ngữ <strong className="text-blue-600 uppercase">{copyModal.sourceLang}</strong>.
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Chọn ngôn ngữ đích:</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  value={copyModal.targetLang}
                  onChange={(e) => setCopyModal({...copyModal, targetLang: e.target.value})}
                >
                  <option value="" disabled>-- Chọn ngôn ngữ --</option>
                  {AVAILABLE_LANGUAGES.filter(l => l.code !== copyModal.sourceLang).map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.label} ({lang.code})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => setCopyModal({ isOpen: false, pageId: null, sourceLang: null, targetLang: '' })}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Hủy
              </button>
              <button 
                onClick={executeCopy}
                disabled={!copyModal.targetLang}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50"
              >
                Nhân bản
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
