import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/common/ScrollToTop';
import { getSiteSettingsAPI } from '../services/api';

export default function ClientLayout() {
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    // Dọn dẹp inline style của body để không ảnh hưởng sang trang Admin
    document.body.style.backgroundColor = '';

    const applySiteColors = async () => {
      try {
        const res = await getSiteSettingsAPI();
        if (res && res.success && res.data) {
          const { backgroundColor } = res.data;
          if (backgroundColor && backgroundColor.trim() !== '') {
            setBgColor(backgroundColor);
          }
        }
      } catch (err) {
        // Ignore
      }
    };

    applySiteColors();

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div
      className="flex flex-col min-h-screen transition-colors duration-300"
      style={bgColor ? { backgroundColor: bgColor } : {}}
    >
      <ScrollToTop />
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
