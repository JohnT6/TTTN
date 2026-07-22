// Xử lý active state cho Header navigation (MyE Coin thuộc trang Nạp Game)
function initHeaderActive() {
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove(
            'border-bottom-3', 'border-orange-500',
            'pb-1', 'fw-bold', 'text-orange-500'
        );
        if (href === 'Nap_game.html') {
            link.classList.add(
                'border-bottom-3', 'border-orange-500',
                'pb-1', 'fw-bold', 'text-orange-500'
            );
        }
    });
}

// Gắn sự kiện chuyển hướng sang Thong_tin_giao_dich.html khi click gói nạp hoặc nút Mua
function initPackageNavigation() {
    const buyButtons = document.querySelectorAll('.package-card .btn-buy');
    buyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'Thong_tin_giao_dich.html';
        });
    });
}

// User Profile Dropdown Toggle Logic
function initUserDropdown() {
    const toggleBtn = document.getElementById('user-profile-toggle');
    const dropdownMenu = document.getElementById('user-dropdown-menu');
    const wrapper = document.getElementById('user-profile-wrapper');

    if (toggleBtn && dropdownMenu) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (wrapper && !wrapper.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initHeaderActive();
    initPackageNavigation();
    initUserDropdown();
});
