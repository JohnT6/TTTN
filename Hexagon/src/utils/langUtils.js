/**
 * Tiện ích hỗ trợ đa ngôn ngữ cho hệ thống Puck Builder
 * Có thể tái sử dụng ở bất kỳ dự án nào.
 */

// Cấu hình danh sách ngôn ngữ hỗ trợ (có thể dễ dàng thêm mới)
export const AVAILABLE_LANGUAGES = [
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', label: 'English', flag: '🇬🇧' }
    // Thêm ngôn ngữ mới vào đây: { code: 'ja', label: '日本語', flag: '🇯🇵' }
];

/**
 * Hàm lọc các component của Puck dựa trên ngôn ngữ được chọn.
 * @param {Object} puckData - Dữ liệu JSON chuẩn của Puck (chứa root, zones, content).
 * @param {String} langCode - Mã ngôn ngữ cần lọc (vd: 'vi', 'en').
 * @returns {Object} - Dữ liệu JSON đã được lọc sạch các khối không thuộc ngôn ngữ.
 */
export const filterPuckDataByLang = (puckData, langCode) => {
    if (!puckData || !puckData.content) return puckData;
    
    return {
        ...puckData,
        content: puckData.content.filter(
            // Giữ lại các khối đúng ngôn ngữ, HOẶC không có gắn cờ (all/legacy)
            c => c.props.lang === langCode || !c.props.lang || c.props.lang === 'all'
        )
    };
};
