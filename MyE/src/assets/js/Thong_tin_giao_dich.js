// Interactive package selection & payment confirmation for Thong_tin_giao_dich.html
document.addEventListener('DOMContentLoaded', () => {
    const packageCards = document.querySelectorAll('.package-card');
    const coinValueElem = document.querySelector('.transaction-card .text-20px.text-dark');
    const priceValueElem = document.querySelector('.transaction-card .text-32px.text-ff7900');

    // Package card selection logic
    packageCards.forEach(card => {
        card.addEventListener('click', () => {
            packageCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            const coinText = card.querySelector('.package-info p:first-child')?.textContent || '500 MYE Coin';
            const priceText = card.querySelector('.package-info p:last-child')?.textContent || '500.000 VNĐ';

            // Extract numeric coin count
            const coinNum = coinText.replace(/[^0-9.]/g, '');

            if (coinValueElem) coinValueElem.textContent = coinNum;
            if (priceValueElem) priceValueElem.textContent = priceText;
        });
    });

    // User Profile Dropdown Toggle Logic
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

    // Pay button handler
    const payBtn = document.querySelector('.btn-pay-orange');
    if (payBtn) {
        payBtn.addEventListener('click', () => {
            alert('Xác nhận thanh toán thành công!');
        });
    }
});
