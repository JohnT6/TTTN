const DB_KEY = 'hexagon_pages_db';

// Khởi tạo DB nếu chưa có
const initDB = () => {
    if (!localStorage.getItem(DB_KEY)) {
        localStorage.setItem(DB_KEY, JSON.stringify([]));
    }
};

export const getAllPages = () => {
    initDB();
    return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
};

export const getPageById = (id) => {
    const pages = getAllPages();
    return pages.find(p => p.id === id);
};

export const getPageBySlugAndLang = (slug, lang) => {
    const pages = getAllPages();
    return pages.find(p => p.slug === slug && p.lang === lang && p.status === 'published');
};

export const savePage = (pageData) => {
    const pages = getAllPages();
    const index = pages.findIndex(p => p.id === pageData.id);
    
    const now = new Date().toLocaleDateString('vi-VN');
    
    if (index >= 0) {
        pages[index] = { ...pages[index], ...pageData, updatedAt: now };
    } else {
        pages.push({ 
            ...pageData, 
            id: Date.now().toString(),
            updatedAt: now,
            status: pageData.status || 'draft'
        });
    }
    
    localStorage.setItem(DB_KEY, JSON.stringify(pages));
    return pageData.id || pages[pages.length - 1].id;
};

// Hàm nhân bản dữ liệu bên trong 1 Page (Component-level)
export const duplicatePageToLang = (id, sourceLang, targetLang) => {
    const page = getPageById(id);
    if (!page || !page.data || !page.data.content) return null;
    
    const sourceComponents = page.data.content.filter(
        c => c.props.lang === sourceLang || !c.props.lang
    );
    
    // Tạo bản sao cho các component đó
    const newComponents = sourceComponents.map(c => ({
        ...c,
        // Tạo ID ngẫu nhiên cho component mới để tránh trùng lặp trong Puck
        props: {
            ...c.props,
            id: 'CPN-' + Math.random().toString(36).substr(2, 9),
            lang: targetLang
        }
    }));
    
    // Ghép vào cục JSON hiện tại
    const updatedPage = {
        ...page,
        data: {
            ...page.data,
            content: [...page.data.content, ...newComponents]
        },
        updatedAt: new Date().toLocaleDateString('vi-VN')
    };
    
    // Lưu lại
    savePage(updatedPage);
    return id;
};

export const deletePage = (id) => {
    let pages = getAllPages();
    pages = pages.filter(p => p.id !== id);
    localStorage.setItem(DB_KEY, JSON.stringify(pages));
};

// Xoá 1 ngôn ngữ cụ thể bên trong JSON
export const deleteLangFromPage = (id, langToDelete) => {
    const page = getPageById(id);
    if (!page || !page.data || !page.data.content) return;
    
    // Lọc bỏ các component thuộc ngôn ngữ cần xoá
    const remainingContent = page.data.content.filter(
        c => c.props.lang !== langToDelete
    );
    
    // Kiểm tra xem còn ngôn ngữ nào khác không
    const hasVi = remainingContent.some(c => c.props.lang === 'vi' || !c.props.lang);
    const hasEn = remainingContent.some(c => c.props.lang === 'en');
    
    if (!hasVi && !hasEn) {
        // Nếu không còn bản dịch nào, tự động xoá luôn page
        deletePage(id);
    } else {
        const updatedPage = {
            ...page,
            data: {
                ...page.data,
                content: remainingContent
            },
            updatedAt: new Date().toLocaleDateString('vi-VN')
        };
        savePage(updatedPage);
    }
};
