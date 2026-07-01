import React from 'react';
import ImageField from './admin.inlineImage';
import { GRADIENT_DIRECTIONS } from './admin.styleUtils';

const AdminBackgroundField = ({ value, onChange, name }) => {
    const val = value || { type: 'color', color: '#ffffff' };

    const handleChange = (key, newValue) => {
        onChange({ ...val, [key]: newValue });
    };

    return (
        <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100 mt-2">
            <div className="font-bold text-gray-800 text-base pb-2 border-b border-gray-200">
                Nền (Background)
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Loại nền</label>
                <select
                    className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={val.type || 'color'}
                    onChange={(e) => handleChange('type', e.target.value)}
                >
                    <option value="color">Màu sắc</option>
                    <option value="gradient">Gradient</option>
                    <option value="image">Hình ảnh</option>
                    <option value="image_color">Hình ảnh & Màu sắc</option>
                    <option value="image_gradient">Hình ảnh & Gradient</option>
                </select>
            </div>

            {(val.type === 'color' || val.type === 'image_color') && (
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">Màu nền (Mã Hex)</label>
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={val.color || ''}
                        onChange={(e) => handleChange('color', e.target.value)}
                        placeholder="#ffffff"
                    />
                </div>
            )}

            {(val.type === 'gradient' || val.type === 'image_gradient') && (
                <>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Gradient từ (Mã Hex)</label>
                        <input
                            type="text"
                            className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={val.gradientFrom || ''}
                            onChange={(e) => handleChange('gradientFrom', e.target.value)}
                            placeholder="#eef2ff"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Gradient đến (Mã Hex)</label>
                        <input
                            type="text"
                            className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={val.gradientTo || ''}
                            onChange={(e) => handleChange('gradientTo', e.target.value)}
                            placeholder="#f3e8ff"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Hướng Gradient</label>
                        <select
                            className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={val.gradientDirection || 'to bottom right'}
                            onChange={(e) => handleChange('gradientDirection', e.target.value)}
                        >
                            {GRADIENT_DIRECTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </>
            )}

            {(val.type === 'image' || val.type === 'image_color' || val.type === 'image_gradient') && (
                <div className="flex flex-col gap-1.5 mt-2">
                    <label className="text-sm font-semibold text-gray-700">Hình ảnh</label>
                    <div className="bg-white p-3 border border-gray-200 rounded">
                        <ImageField value={val.imageUrl} onChange={(url) => handleChange('imageUrl', url)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBackgroundField;
