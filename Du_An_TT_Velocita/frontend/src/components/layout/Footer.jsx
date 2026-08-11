import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSiteSettingsAPI } from '../../services/api';
import { formatImageUrl } from '../../helpers/helper';

const Footer = () => {
  const [siteLogo, setSiteLogo] = useState('/assets/icons/logo.svg');

  useEffect(() => {
    getSiteSettingsAPI()
      .then((res) => {
        if (res && res.data && res.data.logo) {
          setSiteLogo(formatImageUrl(res.data.logo));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="footer py-[50px] bg-white text-sm">
      <div className="container max-w-[1440px] w-full mx-auto px-5">
        {/* Footer Top: 5 Columns */}
        <div className="footer__row grid grid-cols-[2fr_1.3fr_1fr_1fr_1.5fr] max-lg:grid-cols-1 gap-[60px]">
          {/* Cột 1: Logo + Description */}
          <div className="footer__col">
            <Link to="/" className="footer__logo inline-block w-[50px] h-[50px]">
              <img
                src={siteLogo}
                alt="VELOCITÀ"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/icons/logo.svg';
                }}
                className="footer__logo-img w-full h-full object-contain"
              />
            </Link>
            <p className="footer__desc mt-[30px] leading-[1.5] text-justify max-lg:w-[min(400px,100%)]">
              Chúng tôi tự hào là nhà phân phối giày chính hãng uy tín tại Việt Nam. Với hơn 10 năm kinh nghiệm, chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng nhất.
            </p>
          </div>

          {/* Cột 2: Cửa hàng links */}
          <div className="footer__col">
            <h3 className="footer__heading uppercase font-black text-[18px]">Cửa hàng</h3>
            <ul className="footer__list mt-[18px]">
              <li><Link to="/" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">Trang Chủ</Link></li>
              <li><Link to="/product-catalog" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">Sản Phẩm</Link></li>
              <li><Link to="/product-catalog" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">Xu Hướng</Link></li>
              <li><Link to="/product-catalog" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">Bộ Sưu Tập</Link></li>
              <li><Link to="/" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">Về Chúng Tôi</Link></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ Trợ links */}
          <div className="footer__col">
            <h3 className="footer__heading uppercase font-black text-[18px]">Hỗ Trợ</h3>
            <ul className="footer__list mt-[18px]">
              <li><Link to="#!" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">FAQ</Link></li>
              <li><Link to="#!" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">Chính Sách Đổi Trả</Link></li>
              <li><Link to="#!" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">Hướng Dẫn Chọn Size</Link></li>
              <li><Link to="#!" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">Kiểm Tra Đơn Hàng</Link></li>
              <li><Link to="#!" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">Liên Hệ</Link></li>
            </ul>
          </div>

          {/* Cột 4: Công ty links */}
          <div className="footer__col">
            <h3 className="footer__heading uppercase font-black text-[18px]">Công ty</h3>
            <ul className="footer__list mt-[18px]">
              <li><Link to="#!" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">Dịch vụ khách hàng</Link></li>
              <li><Link to="#!" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">Điều khoản sử dụng</Link></li>
              <li><Link to="#!" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">Chính sách bảo mật</Link></li>
              <li><Link to="#!" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">Tuyển dụng</Link></li>
              <li><Link to="#!" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">Giới thiệu</Link></li>
              <li><Link to="#!" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">Đối tác</Link></li>
            </ul>
          </div>

          {/* Cột 5: Liên hệ */}
          <div className="footer__col">
            <h3 className="footer__heading uppercase font-black text-[18px]">Liên hệ</h3>
            <ul className="footer__list mt-[18px]">
              <li>
                <p className="footer__label mt-5 font-medium">Email</p>
                <a href="mailto:contact@velocita.com" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">contact@velocita.com</a>
              </li>
              <li>
                <p className="footer__label mt-5 font-medium">Hotline</p>
                <a href="tel:18009999" className="footer__link inline-block py-2 leading-[1.4] hover:text-[#0071dc]">18009999</a>
              </li>
              <li>
                <p className="footer__label mt-5 font-medium">Địa chỉ</p>
                <p className="footer__text py-2 leading-[1.4]">117 Hai Bà Trưng, Bến Nghé, Quận 1, Hồ Chí Minh, Việt Nam</p>
              </li>
              <li>
                <p className="footer__label mt-5 font-medium">Giờ mở cửa</p>
                <p className="footer__text py-2 leading-[1.4]">9:00 - 21:00, Thứ 2 - Chủ Nhật</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer__bottom mt-[50px] flex items-center justify-between max-md:flex-col-reverse max-md:gap-[50px]">
          <p className="footer__copyright">
            © 2010 - 2025 VELOCITÀ. Tất cả quyền được bảo lưu.
          </p>
          <div className="footer__socials flex items-center gap-5 mr-[18px] max-xl:mr-0">
            <a href="#!" className="footer__social-link footer__social-link--facebook">
              <img src="/assets/icons/facebook.svg" alt="Facebook" className="footer__social-icon" />
            </a>
            <a href="#!" className="footer__social-link footer__social-link--youtube">
              <img src="/assets/icons/youtube.svg" alt="YouTube" className="footer__social-icon" />
            </a>
            <a href="#!" className="footer__social-link footer__social-link--tiktok">
              <img src="/assets/icons/tiktok.svg" alt="TikTok" className="footer__social-icon" />
            </a>
            <a href="#!" className="footer__social-link footer__social-link--twitter">
              <img src="/assets/icons/twitter.svg" alt="Twitter" className="footer__social-icon" />
            </a>
            <a href="#!" className="footer__social-link footer__social-link--linkedin">
              <img src="/assets/icons/linkedin.svg" alt="LinkedIn" className="footer__social-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
