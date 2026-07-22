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

// ===== ĐĂNG NHẬP - LOGIC =====

// ---- SVG ICONS (dùng cho toggle mật khẩu) ----
const EYE_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9BB0CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
const EYE_SHOW_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9BB0CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;

// ---- VALIDATION RULES ----
const validationRules = {
    username: [
        { test: (v) => v.trim().length > 0, msg: "Vui lòng nhập tên đăng nhập hoặc email" },
        { test: (v) => v.trim().length >= 3, msg: "Tên đăng nhập phải từ 3 ký tự trở lên" },
    ],
    password: [
        { test: (v) => v.length > 0, msg: "Mật khẩu không được để trống" },
        { test: (v) => v.length >= 6, msg: "Mật khẩu phải có ít nhất 6 ký tự" },
    ],
};

// ---- VALIDATION LOGIC ----
function validateField(name, value) {
    const rules = validationRules[name];
    if (!rules) return { valid: true };
    for (const rule of rules) {
        if (!rule.test(value)) return { valid: false, msg: rule.msg };
    }
    return { valid: true };
}

function showFieldError(name, msg) {
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

function clearFieldError(name) {
    const input = document.querySelector(`[name="${name}"]`);
    const errorEl = document.getElementById(`error-${name}`);
    if (input) {
        input.classList.remove("error");
        input.classList.add("success");
    }
    if (errorEl) errorEl.classList.remove("show");
}

function clearAllErrors() {
    document.querySelectorAll(".field-error").forEach((el) => el.classList.remove("show"));
    document.querySelectorAll(".form-input").forEach((el) => el.classList.remove("error", "success"));
}

// ---- TOAST ----
function showToast(msg, type = "success") {
    let toast = document.getElementById("toast-msg");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-msg";
        toast.className = "toast";
        document.body.appendChild(toast);
    }
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === "success" ? "✅" : "❌"}</span> ${msg}`;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3500);
}

// ---- FORM INITIALIZATION ----
function initFormBehavior() {
    const form = document.getElementById("dang-nhap-form");
    const submitBtn = document.getElementById("btn-submit-login");

    // Xác thực khi blur
    form.querySelectorAll(".form-input").forEach((input) => {
        input.addEventListener("blur", () => {
            const result = validateField(input.name, input.value);
            if (!result.valid) showFieldError(input.name, result.msg);
            else clearFieldError(input.name);
        });

        input.addEventListener("input", () => {
            if (input.classList.contains("error")) {
                const result = validateField(input.name, input.value);
                if (result.valid) clearFieldError(input.name);
            }
        });
    });

    // Toggle hiện/ẩn mật khẩu
    const toggleBtn = document.getElementById("toggle-input-password");
    const passwordInput = document.getElementById("input-password");
    if (toggleBtn && passwordInput) {
        let visible = false;
        toggleBtn.addEventListener("click", () => {
            visible = !visible;
            passwordInput.type = visible ? "text" : "password";
            toggleBtn.innerHTML = visible ? EYE_SHOW_SVG : EYE_SVG;
        });
    }

    // Xử lý submit form
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearAllErrors();

        const formData = new FormData(form);
        let isValid = true;

        // Xác thực tất cả trường
        const fieldNames = ['username', 'password'];
        fieldNames.forEach((name) => {
            const value = formData.get(name) || "";
            const result = validateField(name, value);
            if (!result.valid) {
                showFieldError(name, result.msg);
                isValid = false;
            }
        });

        if (!isValid) {
            showToast("Vui lòng kiểm tra lại thông tin!", "error");
            return;
        }

        // Loading
        submitBtn.classList.add("loading");
        submitBtn.disabled = true;
        await new Promise((r) => setTimeout(r, 1500));
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
        showToast("Đăng nhập thành công! Đang chuyển hướng...", "success");
    });
}

// ---- BOOT ----
document.addEventListener("DOMContentLoaded", () => {
    initFormBehavior();
});
