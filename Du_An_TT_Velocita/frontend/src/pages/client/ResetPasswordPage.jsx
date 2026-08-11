import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPasswordAPI } from '../../services/api';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const validateForm = () => {
    if (!email) {
      setEmailError('Email là bắt buộc');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email không đúng định dạng');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setSuccessMsg('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await forgotPasswordAPI(email);
      if (res && res.success) {
        setSuccessMsg(res.message || 'Yêu cầu đặt lại mật khẩu đã được xử lý. Vui lòng kiểm tra hộp thư email của bạn.');
        setEmail('');
      } else {
        setGeneralError(res?.message || 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.');
      }
    } catch (err) {
      if (err?.errors?.email) {
        setEmailError(err.errors.email);
      }
      setGeneralError(err.message || 'Email này chưa được đăng ký trên hệ thống.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth flex min-h-screen">
      {/* Auth intro */}
      <div className="auth__intro flex-1 relative flex justify-center items-center flex-col gap-[50px] px-[30px] max-md:hidden">
        <img src="/assets/img/forgot-password.png" alt="" className="auth__intro-img w-[min(424px,100%)]" />
      </div>

      {/* Auth content */}
      <div className="auth__content flex-1 px-[30px] bg-white">
        <div className="auth__content-inner flex flex-col items-center text-center w-[min(460px,100%)] mx-auto py-[50px] max-md:py-8">
          {/* Logo */}
          <Link to="/" className="logo inline-block">
            <img src="/assets/icons/logo.svg" alt="VELOCITÀ" className="logo__img w-[50px] h-[50px] object-contain" />
          </Link>
          <h1 className="auth__heading mt-[50px] text-[30px] font-medium leading-[1.47] max-md:mt-10 max-md:text-[22px]">Quên tài khoản / Đặt lại mật khẩu</h1>
          <p className="auth__desc mt-2.5 px-5 text-[#9e9da8] text-center text-[15px] font-medium leading-[1.47] max-md:text-sm">
            Nhập email tài khoản của bạn và chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu.
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
                  placeholder="Email đăng ký tài khoản"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  className={`w-full h-[48px] px-4 rounded-xl border text-sm font-medium transition-all outline-none ${
                    emailError
                      ? 'border-red-500 text-red-600 bg-red-50/20 focus:border-red-500'
                      : 'border-gray-300 text-gray-900 focus:border-black'
                  }`}
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-xs font-semibold mt-1.5 ml-1 animate-fade-in">
                  {emailError}
                </p>
              )}
            </div>

            {/* Button */}
            <div className="form__group auth__btn-group flex flex-col mt-[40px] gap-[20px] max-md:mt-8 max-md:gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`btn btn--primary auth__btn form__submit-btn w-full h-[50px] rounded-[10px] text-[18px] font-medium flex items-center justify-center transition-all ${
                  loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {loading ? 'Đang gửi yêu cầu...' : 'Gửi yêu cầu khôi phục'}
              </button>
            </div>
          </form>

          <p className="auth__text mt-[80px] text-[#9e9da8] text-[18px] leading-[1.44] max-md:mt-8 max-md:text-base">
            <Link to="/sign-in" className="auth__link auth__text-link text-[#0071dc]">Quay lại trang đăng nhập</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
