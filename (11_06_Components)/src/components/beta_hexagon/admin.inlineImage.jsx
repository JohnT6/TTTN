import React, { useState, useRef } from 'react';

/**
 * Custom Puck Field: Chọn ảnh trong sidebar với preview + upload + URL.
 * Dùng với type: 'custom' trong Puck config.
 * 
 * Cách dùng trong puckConfig:
 *   logoUrl: {
 *     type: 'custom',
 *     label: 'Ảnh Logo',
 *     render: (props) => <ImageField {...props} />
 *   }
 */
const ImageField = ({ value, onChange, field }) => {
    const [mode, setMode] = useState('preview'); // 'preview' | 'url'
    const fileInputRef = useRef(null);

    // Xử lý upload file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        onChange('/assets/images/' + file.name);
        // Reset input để có thể chọn lại cùng file
        e.target.value = '';
    };

    // Xử lý paste ảnh (Ctrl+V)
    const handlePaste = (e) => {
        const clipboardData = e.clipboardData;
        if (!clipboardData) return;

        // Ảnh blob
        if (clipboardData.files && clipboardData.files.length > 0) {
            for (const file of clipboardData.files) {
                if (file.type.startsWith('image/')) {
                    e.preventDefault();
                    onChange('/assets/images/' + file.name);
                    return;
                }
            }
        }

        // HTML chứa <img src>
        const html = clipboardData.getData('text/html');
        if (html) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const pastedImg = doc.querySelector('img');
            if (pastedImg?.src?.startsWith('http')) {
                e.preventDefault();
                onChange(pastedImg.src);
                return;
            }
        }

        // Text URL
        const text = clipboardData.getData('text/plain');
        if (text) {
            const trimmed = text.trim();
            if (trimmed.startsWith('http') || trimmed.startsWith('data:image') || trimmed.startsWith('/')) {
                e.preventDefault();
                onChange(trimmed);
            }
        }
    };

    return (
        <div id={sectionId || undefined}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
            onPaste={handlePaste}
            tabIndex={0}
        >
            {/* Preview ảnh */}
            {value ? (
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '80px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid rgba(0,0,0,0.1)',
                        background: '#f8f8f8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src={value}
                        alt="Preview"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </div>
            ) : (
                <div
                    style={{
                        width: '100%',
                        height: '60px',
                        borderRadius: '8px',
                        border: '2px dashed rgba(0,0,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(0,0,0,0.35)',
                        fontSize: '12px',
                    }}
                >
                    Chưa có ảnh
                </div>
            )}

            {/* Hàng nút chức năng */}
            <div style={{ display: 'flex', gap: '6px' }}>
                {/* Nút Upload */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                        flex: 1,
                        padding: '6px 0',
                        border: '1px solid rgba(0,0,0,0.12)',
                        borderRadius: '6px',
                        background: 'rgba(0,0,0,0.02)',
                        color: 'rgba(0,0,0,0.7)',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => { e.target.style.background = 'rgba(0,0,0,0.06)'; }}
                    onMouseLeave={(e) => { e.target.style.background = 'rgba(0,0,0,0.02)'; }}
                >
                    📁 Upload
                </button>

                {/* Nút xoá */}
                {value && (
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        style={{
                            width: '32px',
                            padding: '6px 0',
                            border: '1px solid rgba(0,0,0,0.12)',
                            borderRadius: '6px',
                            background: 'rgba(0,0,0,0.02)',
                            color: 'rgba(220,38,38,0.7)',
                            fontSize: '12px',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => { e.target.style.background = 'rgba(220,38,38,0.08)'; }}
                        onMouseLeave={(e) => { e.target.style.background = 'rgba(0,0,0,0.02)'; }}
                        title="Xoá ảnh"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* Input URL (hiện cố định) */}
            <input
                type="text"
                placeholder="Đường dẫn ảnh (URL hoặc đường dẫn cục bộ)..."
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '8px 10px',
                    border: '1px solid rgba(0,0,0,0.15)',
                    borderRadius: '6px',
                    background: '#fff',
                    color: '#1a1a1a',
                    fontSize: '12px',
                    outline: 'none',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(80,160,255,0.8)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.15)'; }}
            />

            {/* Gợi ý */}
            <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.3)', textAlign: 'center' }}>
                Ctrl+V để paste ảnh trực tiếp
            </div>

            {/* Input file ẩn */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default ImageField;
