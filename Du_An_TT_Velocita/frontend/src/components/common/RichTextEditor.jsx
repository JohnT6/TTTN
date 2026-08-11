import React, { useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { uploadMultipleFilesAPI } from '../../services/api';
import { formatImageUrl, toRelativePath, formatHtmlContent } from '../../helpers/helper';
import ToastNotification from './ToastNotification';

export default function RichTextEditor({ value = '', onChange, placeholder = 'Nhập mô tả chi tiết sản phẩm...' }) {
  const quillRef = useRef(null);
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  // Custom Image Handler cho ReactQuill: Tải ảnh từ thiết bị lên Backend Express
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'true');
    input.click();

    input.onchange = async () => {
      const files = input.files;
      if (!files || files.length === 0) return;

      try {
        const res = await uploadMultipleFilesAPI(files, 'news');
        if (res && res.success && res.data) {
          const quill = quillRef.current.getEditor();
          let range = quill.getSelection(true);

          res.data.forEach((url) => {
            const cleanUrl = toRelativePath(url);
            quill.insertEmbed(range.index, 'image', cleanUrl);
            quill.setSelection(range.index + 1);
            range = { index: range.index + 1 };
          });
          showToast('success', 'Tải ảnh thành công', 'Đã chèn hình ảnh vào trình soạn thảo.');
        } else {
          showToast('error', 'Lỗi upload ảnh', res?.message || 'Không thể tải hình ảnh lên server.');
        }
      } catch (err) {
        showToast('error', 'Lỗi upload ảnh', err.message || 'Lỗi khi tải hình ảnh từ thiết bị.');
      }
    };
  };

  // Cấu hình Toolbar đầy đủ tính năng tiêu chuẩn từ ReactQuill
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          [{ align: [] }],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'color',
    'background',
    'list',
    'bullet',
    'indent',
    'align',
    'link',
    'image',
    'video',
  ];

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-300 focus-within:border-black transition-colors shadow-xs relative">
      {/* Toast Notification khi Upload Ảnh trong RichTextEditor */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <style>{`
        .ql-toolbar.ql-snow {
          background-color: #f9fafb;
          border: none;
          border-bottom: 1px solid #e5e7eb;
          padding: 8px 12px;
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
        }
        .ql-container.ql-snow {
          border: none;
          min-height: 220px;
          font-family: inherit;
          font-size: 14px;
        }
        .ql-editor {
          min-height: 220px;
          max-height: 550px;
          overflow-y: auto;
          line-height: 1.6;
          padding: 16px;
        }
        .ql-editor.ql-blank::before {
          font-style: normal;
          color: #9ca3af;
        }
        .ql-editor img {
          max-width: 100%;
          border-radius: 12px;
          margin: 12px 0;
          display: block;
        }
        .ql-editor blockquote {
          border-left: 4px solid #06b6d4;
          background-color: #ecfeff;
          padding: 16px 20px;
          margin: 16px 0;
          border-radius: 0 12px 12px 0;
          color: #155e75;
          font-style: normal;
          line-height: 1.6;
        }
      `}</style>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={formatHtmlContent(value)}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
