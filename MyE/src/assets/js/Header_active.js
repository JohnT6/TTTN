// Xử lý active state cho Header navigation
// Tự động xác định trang hiện tại và thêm class active cho nav link tương ứng

function initHeaderActive() {
    // Lấy tên file từ URL hiện tại
    const path = window.location.pathname;
    const fileName = path.substring(path.lastIndexOf('/') + 1);

    // Duyệt tất cả nav link trong header
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Xóa class active cũ
        link.classList.remove(
            'border-b-[3px]', 'border-orange-500',
            'pb-1', 'font-bold', 'text-orange-500'
        );

        // Thêm class active nếu khớp trang hiện tại
        if (href === fileName) {
            link.classList.add(
                'border-b-[3px]', 'border-orange-500',
                'pb-1', 'font-bold', 'text-orange-500'
            );
        }
    });
}

// Chạy khi DOM sẵn sàng (dành cho trường hợp header có sẵn trong HTML)
document.addEventListener('DOMContentLoaded', initHeaderActive);
