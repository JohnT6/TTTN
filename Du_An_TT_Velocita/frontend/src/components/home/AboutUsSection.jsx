import React from 'react';

const AboutUsSection = () => {
  return (
    <div className="about-us mt-[100px] py-[70px] bg-black">
      <div className="about-us__inner w-[632px] max-w-full mx-auto text-center px-5">
        <h1 className="about-us__heading text-[32px] font-bold uppercase text-white">
          Một điểm đến hàng đầu cho các thương hiệu thể thao
        </h1>
        <p className="about-us__desc mt-5 text-[17px] text-[#b9babe] text-justify leading-[2]">
          VELOCITÀ là cửa hàng chuyên cung cấp các sản phẩm từ những thương hiệu thể thao danh tiếng như
          Nike, Adidas, Puma và Asics. Chúng tôi tự hào mang đến cho khách hàng những lựa chọn đa dạng từ
          giày chạy bộ, giày bóng đá, trang phục thể thao đến phụ kiện hiện đại. Tại VELOCITÀ, chúng tôi
          không ngừng nâng cao trải nghiệm mua sắm, trở thành nơi lý tưởng cho mọi tín đồ thể thao và thời
          trang.
          <br />
          <br />
          Với sứ mệnh phục vụ đam mê và phong cách của bạn, VELOCITÀ cam kết mang đến các sản phẩm chất
          lượng, giúp bạn tự tin trên mọi chặng đường, từ sân chơi đến đời sống thường ngày.
        </p>
        <div className="about-us__logo-wrap mt-[30px]">
          <img
            src="/assets/icons/logo.svg"
            alt="VELOCITÀ"
            className="about-us__logo inline-block w-[50px] brightness-[100]"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
