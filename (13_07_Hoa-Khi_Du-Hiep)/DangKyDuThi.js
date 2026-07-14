// LdpMissMister.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('Form Đăng Ký Dự Thi loaded!');

    const fileInputs = document.querySelectorAll('.file-input-hidden');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                const parentBox = this.parentElement;
                const img = parentBox.querySelector('img.preview-img');
                
                reader.onload = function(e) {
                    // Đặt ảnh nền cho box chứa
                    parentBox.style.backgroundImage = `url(${e.target.result})`;
                    parentBox.style.backgroundSize = 'contain';
                    parentBox.style.backgroundPosition = 'center';
                    parentBox.style.backgroundRepeat = 'no-repeat';
                }
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    });

    // Handle Modal Popups via JS
    const btnTheLe = document.getElementById('btn-the-le');
    if (btnTheLe) {
        btnTheLe.addEventListener('click', function(e) {
            e.preventDefault();
            const modalTheLe = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalTheLe'));
            modalTheLe.show();
        });
    }

    const btnHuongDan = document.getElementById('btn-huong-dan');
    if (btnHuongDan) {
        btnHuongDan.addEventListener('click', function(e) {
            e.preventDefault();
            const modalHuongDan = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalHuongDan'));
            modalHuongDan.show();
        });
    }

    const btnDongY = document.getElementById('btn-dong-y');
    if (btnDongY) {
        btnDongY.addEventListener('click', function(e) {
            e.preventDefault();
            const modalDongY = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalDongY'));
            modalDongY.show();
        });
    }
});
