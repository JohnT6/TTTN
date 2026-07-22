// ===== LOAD HEADER & FOOTER =====
fetch('../components/Header.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('header-container').innerHTML = html;
    });

fetch('../components/Footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer-container').innerHTML = html;
    });

// ===== ĐĂNG KÝ - LOGIC =====

// ---- SVG ICONS (dùng cho toggle mật khẩu) ----
const EYE_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9BB0CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
const EYE_SHOW_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9BB0CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;

// ---- CAPTCHA ----
const CAPTCHA_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
let currentCaptcha = '';

function generateCaptcha() {
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)];
    }
    currentCaptcha = result;
    return result;
}

function renderCaptchaCanvas(code) {
    const canvas = document.getElementById('captcha-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 130;
    canvas.height = 44;

    // Nền
    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Đường nhiễu
    for (let i = 0; i < 6; i++) {
        ctx.strokeStyle = `rgba(${Math.random() * 150},${Math.random() * 150},${Math.random() * 150},0.4)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }

    // Chấm nhiễu
    for (let i = 0; i < 80; i++) {
        ctx.fillStyle = `rgba(${Math.random() * 200},${Math.random() * 200},${Math.random() * 200},0.5)`;
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }

    // Vẽ từng ký tự với độ xoay nhẹ
    const charWidth = canvas.width / (code.length + 1);
    const fonts = ['Arial', 'Georgia', 'Courier New', 'Trebuchet MS'];
    for (let i = 0; i < code.length; i++) {
        ctx.save();
        const x = charWidth * (i + 0.8);
        const y = canvas.height / 2 + 6;
        ctx.translate(x, y);
        ctx.rotate((Math.random() - 0.5) * 0.4);
        ctx.font = `bold ${18 + Math.floor(Math.random() * 4)}px ${fonts[i % fonts.length]}`;
        ctx.fillStyle = `rgb(${Math.floor(Math.random() * 100)},${Math.floor(Math.random() * 100)},${Math.floor(Math.random() * 150 + 50)})`;
        ctx.fillText(code[i], 0, 0);
        ctx.restore();
    }
}

function refreshCaptcha() {
    const newCode = generateCaptcha();
    renderCaptchaCanvas(newCode);
    const input = document.getElementById('input-captcha');
    if (input) {
        input.value = '';
        input.classList.remove('error', 'success');
    }
    const err = document.getElementById('error-captcha');
    if (err) err.classList.remove('show');
}

// ---- VALIDATION RULES ----
const validationRulesKy = {
    username: [
        { test: (v) => v.trim().length > 0, msg: "Vui lòng nhập tên đăng nhập hoặc email" },
        { test: (v) => v.trim().length >= 3, msg: "Tên đăng nhập phải từ 3 ký tự trở lên" },
    ],
    password: [
        { test: (v) => v.length > 0, msg: "Mật khẩu không được để trống" },
        { test: (v) => v.length >= 6, msg: "Mật khẩu phải có ít nhất 6 ký tự" },
    ],
    confirmPassword: [
        { test: (v) => v.length > 0, msg: "Vui lòng nhập lại mật khẩu" },
        {
            test: (v) => {
                const pw = document.getElementById("input-password-ky");
                return pw && v === pw.value;
            },
            msg: "Mật khẩu xác nhận không khớp",
        },
    ],
    fullname: [
        { test: (v) => v.trim().length > 0, msg: "Vui lòng nhập họ và tên" },
        { test: (v) => v.trim().length >= 2, msg: "Họ tên phải có ít nhất 2 ký tự" },
    ],
    gender: [
        { test: (v) => v !== '', msg: "Vui lòng chọn giới tính" },
    ],
    birthday: [
        { test: (v) => v.trim().length > 0, msg: "Vui lòng chọn ngày sinh" },
    ],
    address: [
        { test: (v) => v.trim().length > 0, msg: "Vui lòng nhập địa chỉ" },
    ],
    email: [
        { test: (v) => v.trim().length > 0, msg: "Vui lòng nhập email" },
        { test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: "Email không đúng định dạng" },
    ],
    phone: [
        { test: (v) => v.trim().length > 0, msg: "Vui lòng nhập số điện thoại" },
        { test: (v) => /^(0|\+84)[0-9]{9,10}$/.test(v.trim()), msg: "Số điện thoại không đúng định dạng (VD: 0912345678)" },
    ],
    captcha: [
        { test: (v) => v.trim().length > 0, msg: "Vui lòng nhập mã xác nhận" },
        { test: (v) => v.trim() === currentCaptcha, msg: "Mã xác nhận không đúng, vui lòng thử lại" },
    ],
};

// ---- VALIDATION LOGIC ----
function validateFieldKy(name, value) {
    const rules = validationRulesKy[name];
    if (!rules) return { valid: true };
    for (const rule of rules) {
        if (!rule.test(value)) return { valid: false, msg: rule.msg };
    }
    return { valid: true };
}

function showFieldErrorKy(name, msg) {
    const input = document.querySelector(`[name="${name}"]`);
    const errorEl = document.getElementById(`error-${name}`);
    if (input) {
        input.classList.remove("success");
        input.classList.add("error");
    }
    if (errorEl) {
        errorEl.textContent = msg;
        errorEl.classList.add("show");
    }
}

function clearFieldErrorKy(name) {
    const input = document.querySelector(`[name="${name}"]`);
    const errorEl = document.getElementById(`error-${name}`);
    if (input) {
        input.classList.remove("error");
        input.classList.add("success");
    }
    if (errorEl) errorEl.classList.remove("show");
}

function clearAllErrorsKy() {
    document.querySelectorAll(".field-error").forEach((el) => el.classList.remove("show"));
    document.querySelectorAll(".form-input").forEach((el) => el.classList.remove("error", "success"));
}

// ---- TOAST ----
function showToastKy(msg, type = "success") {
    let toast = document.getElementById("toast-msg-ky");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-msg-ky";
        toast.className = "toast";
        document.body.appendChild(toast);
    }
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === "success" ? "✅" : "❌"}</span> ${msg}`;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3500);
}

// ---- FORM INITIALIZATION ----
function initFormBehaviorKy() {
    const form = document.getElementById("dang-ky-form");
    const submitBtn = document.getElementById("btn-submit-ky");

    // Xác thực khi blur cho tất cả input text/email/tel
    form.querySelectorAll(".form-input").forEach((input) => {
        input.addEventListener("blur", () => {
            const result = validateFieldKy(input.name, input.value);
            if (!result.valid) showFieldErrorKy(input.name, result.msg);
            else clearFieldErrorKy(input.name);
        });

        input.addEventListener("input", () => {
            if (input.classList.contains("error")) {
                const result = validateFieldKy(input.name, input.value);
                if (result.valid) clearFieldErrorKy(input.name);
            }
        });
    });

    // Cũng xác thực input card 1 khi blur
    document.querySelectorAll("#card-account .form-input").forEach((input) => {
        input.addEventListener("blur", () => {
            const result = validateFieldKy(input.name, input.value);
            if (!result.valid) showFieldErrorKy(input.name, result.msg);
            else clearFieldErrorKy(input.name);
        });

        input.addEventListener("input", () => {
            if (input.classList.contains("error")) {
                const result = validateFieldKy(input.name, input.value);
                if (result.valid) clearFieldErrorKy(input.name);
            }
        });
    });

    // Toggle hiện/ẩn mật khẩu card 1
    const pwToggle = document.getElementById("toggle-password");
    const pwInput = document.getElementById("input-password-ky");
    if (pwToggle && pwInput) {
        let vis = false;
        pwToggle.addEventListener("click", () => {
            vis = !vis;
            pwInput.type = vis ? "text" : "password";
            pwToggle.innerHTML = vis ? EYE_SHOW_SVG : EYE_SVG;
        });
    }

    const confirmToggle = document.getElementById("toggle-confirm-pw");
    const confirmInput = document.getElementById("input-confirm-pw");
    if (confirmToggle && confirmInput) {
        let vis = false;
        confirmToggle.addEventListener("click", () => {
            vis = !vis;
            confirmInput.type = vis ? "text" : "password";
            confirmToggle.innerHTML = vis ? EYE_SHOW_SVG : EYE_SVG;
        });
    }

    // Kiểm tra xác nhận mật khẩu realtime
    if (confirmInput && pwInput) {
        confirmInput.addEventListener("input", () => {
            if (confirmInput.value && pwInput.value) {
                if (confirmInput.value === pwInput.value) {
                    clearFieldErrorKy("confirmPassword");
                }
            }
        });
    }

    // Làm mới captcha
    const refreshBtn = document.getElementById("btn-refresh-captcha");
    if (refreshBtn) {
        refreshBtn.addEventListener("click", refreshCaptcha);
    }

    // Xử lý submit form
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearAllErrorsKy();

        let isValid = true;

        // Xác thực các trường card 1
        const card1Fields = ['username', 'password', 'confirmPassword'];
        card1Fields.forEach((name) => {
            const input = document.querySelector(`[name="${name}"]`);
            if (input) {
                const result = validateFieldKy(name, input.value);
                if (!result.valid) {
                    showFieldErrorKy(name, result.msg);
                    isValid = false;
                }
            }
        });

        // Xác thực các trường card 2
        const card2Fields = ['fullname', 'birthday', 'address', 'email', 'phone', 'captcha'];
        card2Fields.forEach((name) => {
            const input = document.querySelector(`[name="${name}"]`);
            if (input) {
                const result = validateFieldKy(name, input.value);
                if (!result.valid) {
                    showFieldErrorKy(name, result.msg);
                    isValid = false;
                }
            }
        });

        // Xác thực giới tính (radio)
        const genderVal = document.querySelector('input[name="gender"]:checked')?.value || '';
        const genderResult = validateFieldKy('gender', genderVal);
        if (!genderResult.valid) {
            showFieldErrorKy('gender', genderResult.msg);
            isValid = false;
        }

        if (!isValid) {
            showToastKy("Vui lòng kiểm tra lại thông tin!", "error");
            return;
        }

        // Loading
        submitBtn.classList.add("loading");
        submitBtn.disabled = true;
        await new Promise((r) => setTimeout(r, 1800));
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;

        showToastKy("Tạo tài khoản thành công! Đang chuyển hướng...", "success");
        setTimeout(() => {
            window.location.href = 'Dang_nhap.html';
        }, 2000);
    });
}

// ---- BOOT ----
document.addEventListener("DOMContentLoaded", () => {
    initFormBehaviorKy();

    // Khởi tạo captcha
    const code = generateCaptcha();
    renderCaptchaCanvas(code);
});
