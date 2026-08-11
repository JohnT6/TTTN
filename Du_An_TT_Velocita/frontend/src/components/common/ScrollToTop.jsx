import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Tự động đưa thanh cuộn chuột về vị trí ĐẦU TRANG (top: 0) khi chuyển trang hoặc đổi query URL
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Cuộn lập tức lên đầu trang để người dùng thấy đầu trang ngay
    });
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
