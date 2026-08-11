import React from 'react';

const JoinNewsletterSection = () => {
  return (
    <div className="join py-[40px] px-5 bg-[#e8f2fb]">
      <div className="container max-w-[1100px] w-full mx-auto px-5">
        <div className="join-cate grid grid-cols-[1fr_1.5fr] max-xl:grid-cols-1 gap-10 items-start">
          <div className="text-center">
            <h2 className="join__title text-[30px] font-bold max-xl:text-left max-sm:text-[22px]">Tham gia với chúng tôi</h2>
            <p className="join__desc mt-4 text-sm text-[#666] leading-[1.5] max-xl:text-left">
              Nhận ưu đãi mới nhất và sản phẩm mới về
            </p>
          </div>
          <div>
            <form className="form form-join flex items-center gap-2.5 max-w-[800px] h-[46px] max-sm:flex-col max-sm:h-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                name="email"
                placeholder="Nhập email của bạn"
                className="form-input w-full h-full px-[15px] text-base rounded-[5px] border border-[#ccc] outline-none max-sm:h-[46px]"
                required
              />
              <button
                id="email-button"
                type="submit"
                className="form__btn flex-shrink-0 px-5 h-full bg-black text-white rounded-[5px] text-[15px] font-bold cursor-pointer max-sm:w-full max-sm:h-[46px]"
              >
                Đăng ký
              </button>
            </form>
            <p className="join__cancel-email mt-[15px] text-xs text-[#666] text-left leading-[1.5]">
              Bằng việc đăng ký, bạn đồng ý với{' '}
              <a href="#!" className="join__link underline text-black">
                Điều khoản &amp; Chính sách Bảo mật
              </a>{' '}
              của VELOCITÀ. Bạn có thể hủy đăng ký bất kỳ lúc nào thông qua tài khoản của bạn hoặc bằng cách sử dụng liên
              kết hủy ở cuối email từ VELOCITÀ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinNewsletterSection;
