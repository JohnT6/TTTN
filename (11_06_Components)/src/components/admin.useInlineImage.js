import { useEffect, useRef } from 'react';
import { showImageModal } from './admin.inlineImageModal';

/**
 * Hook dùng chung cho tính năng sửa ảnh inline trên canvas của Puck.
 * 
 * @param {Object} options
 * @param {boolean} options.isEditing - Trạng thái có đang ở mode Edit của Puck không
 * @param {Function} options.onUpdate - Callback gọi khi có ảnh mới: (editId, newUrl) => void
 * @returns {Object} { containerRef, getEditProps }
 */
export const useInlineImage = ({ isEditing, onUpdate }) => {
    const containerRef = useRef(null);
    const hoveredElRef = useRef(null);

    useEffect(() => {
        if (!isEditing) return;

        const getEditElement = (elements) => {
            for (const el of elements) {
                // Chỉ xử lý nếu element này nằm trong container của component hiện tại
                if (el.hasAttribute('data-inline-image-id') && containerRef.current && containerRef.current.contains(el)) {
                    return el;
                }
            }
            return null;
        };

        const handleDoubleClick = (e) => {
            if (e.target.closest('[data-inline-image-modal]')) return;
            if (document.querySelector('[data-inline-image-modal]')) return;

            const elements = document.elementsFromPoint(e.clientX, e.clientY);
            const el = getEditElement(elements);
            
            if (el) {
                e.preventDefault();
                e.stopPropagation();

                const editId = el.getAttribute('data-inline-image-id');
                const imgEl = el.querySelector('img') || (el.tagName === 'IMG' ? el : null);
                if (imgEl) {
                    showImageModal(imgEl, (newUrl) => {
                        onUpdate(editId, newUrl);
                    });
                }
            }
        };

        const handlePointerMove = (e) => {
            if (document.querySelector('[data-inline-image-modal]')) return;

            const elements = document.elementsFromPoint(e.clientX, e.clientY);
            const found = getEditElement(elements);

            // Tìm tất cả các element đang bị force hover trong container này để xoá
            if (containerRef.current) {
                containerRef.current.querySelectorAll('[data-inline-image-id]').forEach(el => {
                    if (el !== found) {
                        el.style.outline = 'none';
                        el.classList.remove('inline-image-force-hover');
                    }
                });
            }

            if (found) {
                if (hoveredElRef.current !== found) {
                    hoveredElRef.current = found;
                }
                found.style.outline = '2px solid #3b82f6';
                found.style.outlineOffset = '-2px';
                found.classList.add('inline-image-force-hover');

                if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
                    window.focus(); // Focus để có thể bắt sự kiện paste
                }
            } else if (hoveredElRef.current !== null) {
                hoveredElRef.current = null;
            }
        };

        const handleGlobalPaste = (e) => {
            if (document.querySelector('[data-inline-image-modal]')) return;

            // Chỉ xử lý paste nếu element đang hover thuộc về component này
            const hoveredEl = hoveredElRef.current;
            if (!hoveredEl || !containerRef.current || !containerRef.current.contains(hoveredEl)) return;
            if (!hoveredEl.classList.contains('inline-image-force-hover')) return;
            
            const editId = hoveredEl.getAttribute('data-inline-image-id');
            const clipboardData = e.clipboardData;
            if (!clipboardData) return;
            
            if (clipboardData.files && clipboardData.files.length > 0) {
                const file = clipboardData.files[0];
                if (file.type.indexOf('image/') !== -1) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        onUpdate(editId, event.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            } else {
                const text = clipboardData.getData('text/plain');
                if (text && (text.startsWith('http://') || text.startsWith('https://') || text.startsWith('data:image/'))) {
                    e.preventDefault();
                    e.stopPropagation();
                    onUpdate(editId, text);
                }
            }
        };

        window.addEventListener('dblclick', handleDoubleClick, { capture: true });
        window.addEventListener('pointermove', handlePointerMove, { capture: true, passive: true });
        window.addEventListener('paste', handleGlobalPaste);
        
        return () => {
            window.removeEventListener('dblclick', handleDoubleClick, { capture: true });
            window.removeEventListener('pointermove', handlePointerMove, { capture: true });
            window.removeEventListener('paste', handleGlobalPaste);
        };
    }, [isEditing, onUpdate]);

    const getEditProps = (id) => {
        if (!isEditing) return {};
        return {
            'data-inline-image-id': String(id),
            style: { pointerEvents: 'auto' },
            onClick: (e) => e.preventDefault(),
        };
    };

    return { containerRef, getEditProps };
};
