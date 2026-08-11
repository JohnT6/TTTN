import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAPI } from '../../services/api';
import { loginSuccess } from '../../store/authSlice';
import { setCookie } from '../../helpers/cookie';

// SVG Icon Mắt mở (khi hiển thị text)
const EyeOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 fill-current text-gray-500 hover:text-black transition-colors cursor-pointer">
    <path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z" />
  </svg>
);

// SVG Icon Mắt nhắm (Mắt gạch - khi dạng password)
const EyeClosedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 fill-current text-gray-500 hover:text-black transition-colors cursor-pointer">
    <path d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM236.5 202.7C260 185.9 288.9 176 320 176C399.5 176 464 240.5 464 320C464 351.1 454.1 379.9 437.3 403.5L402.6 368.8C415.3 347.4 419.6 321.1 412.7 295.1C399 243.9 346.3 213.5 295.1 227.2C286.5 229.5 278.4 232.9 271.1 237.2L236.4 202.5zM357.3 459.1C345.4 462.3 332.9 464 320 464C240.5 464 176 399.5 176 320C176 307.1 177.7 294.6 180.9 282.7L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L357.4 459.2z" />
  </svg>
);

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
  const [successMsg, setSuccessMsg] = useState('');

  // Validate ở Client trước khi gửi API
  const validateForm = () => {
    const errors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      errors.email = 'Email là bắt buộc';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email không đúng định dạng';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Mật khẩu là bắt buộc';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setSuccessMsg('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await loginAPI(email, password);
      if (res && res.success && res.data) {
        const { user, token } = res.data;

        // Lưu thông tin vào Cookie Client
        const days = remember ? 30 : 1;
        setCookie('access_token', token, days);
        setCookie('user_info', user, days);

        // Cập nhật Redux store
        dispatch(loginSuccess({ user, token }));

        setSuccessMsg('Đăng nhập thành công! Đang chuyển hướng...');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setGeneralError(res?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      // Nhận phản hồi Zod validator từ Backend (err.errors)
      if (err?.errors) {
        setFieldErrors((prev) => ({ ...prev, ...err.errors }));
      }
      setGeneralError(err.message || 'Email hoặc mật khẩu không chính xác.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth flex min-h-screen">
      {/* Auth intro */}
      <div className="auth__intro flex-1 relative flex justify-center items-center flex-col gap-[50px] px-[30px] max-md:hidden">
        <img src="/assets/icons/intro.svg" alt="" className="auth__intro-img w-[min(424px,100%)]" />
        <p className="auth__intro-text max-w-[412px] text-[18px] font-medium leading-[1.44] text-center text-white">
          VELOCITÀ - Nơi chắp cánh phong cách, đồng hành cùng bạn trên mọi bước đi đỉnh cao
        </p>
      </div>

      {/* Auth content */}
      <div className="auth__content flex-1 px-[30px] bg-white">
        <div className="auth__content-inner flex flex-col items-center text-center w-[min(460px,100%)] mx-auto py-[50px] max-md:py-8">
          {/* Logo */}
          <Link to="/" className="logo inline-block">
            <img src="/assets/icons/logo.svg" alt="VELOCITÀ" className="logo__img w-[50px] h-[50px] object-contain" />
          </Link>
          <h1 className="auth__heading mt-[50px] text-[30px] font-medium leading-[1.47] max-md:mt-10 max-md:text-[22px]">Đăng nhập</h1>
          <p className="auth__desc mt-2.5 px-5 text-[#9e9da8] text-center text-[15px] font-medium leading-[1.47] max-md:text-sm">
            Chào mừng bạn quay lại để đăng nhập. Là khách hàng thân thiết, bạn có quyền truy cập vào tất cả thông tin đã lưu trước đây của mình.
          </p>

          {/* Thông báo Lỗi chung / Thành công */}
          {generalError && (
            <div className="mt-4 px-4 py-2.5 w-full bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-lg text-center animate-fade-in">
              {generalError}
            </div>
          )}
          {successMsg && (
            <div className="mt-4 px-4 py-2.5 w-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold rounded-lg text-center animate-fade-in">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form auth__form mt-[30px] w-full max-md:mt-0" noValidate>
            {/* Email Input */}
            <div className="form__group mt-[24px] max-md:mt-4 text-left">
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                  }}
                  className={`w-full h-[48px] px-4 rounded-xl border text-sm font-medium transition-all outline-none ${fieldErrors.email
                      ? 'border-red-500 text-red-600 bg-red-50/20 focus:border-red-500'
                      : 'border-gray-300 text-gray-900 focus:border-black'
                    }`}
                />
              </div>
              {/* Chữ đỏ báo lỗi bên dưới Input */}
              {fieldErrors.email && (
                <p className="text-red-500 text-xs font-semibold mt-1.5 ml-1 animate-fade-in">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password Input có Nút Mắt Mở/Nhắm duy nhất bên phải */}
            <div className="form__group mt-[20px] max-md:mt-4 text-left">
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: '' });
                  }}
                  className={`w-full h-[48px] pl-4 pr-12 rounded-xl border text-sm font-medium transition-all outline-none ${fieldErrors.password
                      ? 'border-red-500 text-red-600 bg-red-50/20 focus:border-red-500'
                      : 'border-gray-300 text-gray-900 focus:border-black'
                    }`}
                />

                {/* SVG Icon Mắt ẩn/hiện mật khẩu duy nhất không bao giờ bị đè */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 flex items-center justify-center cursor-pointer focus:outline-none select-none z-10"
                  title={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              </div>
              {/* Chữ đỏ báo lỗi bên dưới Input */}
              {fieldErrors.password && (
                <p className="text-red-500 text-xs font-semibold mt-1.5 ml-1 animate-fade-in">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="form__group form__group--inline mt-[24px] max-md:mt-4 flex items-center">
              <label className="form__checkbox relative flex items-center gap-2.5 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="auth__checkbox-input"
                />
                <span className="form__checkbox-label text-[#9e9da8] text-[15px] font-medium leading-[1.47] max-md:text-sm">Ghi nhớ</span>
              </label>
              <Link to="/reset-password" className="auth__link ml-auto text-[#0071dc] text-[15px] font-medium leading-[1.47] max-md:text-sm">Quên mật khẩu?</Link>
            </div>

            {/* Buttons */}
            <div className="form__group auth__btn-group flex flex-col mt-[40px] gap-[20px] max-md:mt-8 max-md:gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`btn btn--primary auth__btn form__submit-btn w-full h-[50px] rounded-[10px] text-[18px] font-medium flex items-center justify-center transition-all ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                  }`}
              >
                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
              </button>
              {/* <button type="button" className="btn btn--outline auth__btn w-full h-[50px] rounded-[10px] text-[18px] font-medium flex items-center justify-center gap-2.5 cursor-pointer">
                <img src="/assets/icons/google.svg" alt="" className="btn__icon w-5" />
                Đăng nhập với Google
              </button> */}
            </div>
          </form>

          <p className="auth__text mt-[80px] text-[#9e9da8] text-[18px] leading-[1.44] max-md:mt-8 max-md:text-base">
            Bạn chưa có tài khoản?
            <Link to="/sign-up" className="auth__link auth__text-link text-[#0071dc] ml-1">Đăng ký</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
