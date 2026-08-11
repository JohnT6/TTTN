import React, { useState, useEffect } from 'react';
import HeroSlider from '../../components/home/HeroSlider';
import BrandSection from '../../components/home/BrandSection';
import ProductSection from '../../components/home/ProductSection';
import NewsSection from '../../components/home/NewsSection';
import AboutUsSection from '../../components/home/AboutUsSection';
import JoinNewsletterSection from '../../components/home/JoinNewsletterSection';
import { getSiteSettingsAPI } from '../../services/api';

const HomePage = () => {
  const [settings, setSettings] = useState({
    showNewArrivals: true,
    showBestSellers: true,
    showSaleProducts: true,
    showNews: true,
    hiddenProductIds: [],
    hiddenNewsIds: [],
  });

  useEffect(() => {
    getSiteSettingsAPI()
      .then((res) => {
        if (res && res.success && res.data) {
          const s = res.data;
          const showNew = s.showNewArrivals === undefined ? true : (s.showNewArrivals === 'true' || s.showNewArrivals === true);
          const showBest = s.showBestSellers === undefined ? true : (s.showBestSellers === 'true' || s.showBestSellers === true);
          const showSale = s.showSaleProducts === undefined ? true : (s.showSaleProducts === 'true' || s.showSaleProducts === true);
          const showNewsSection = s.showNews === undefined ? true : (s.showNews === 'true' || s.showNews === true);

          let hiddenProds = [];
          if (s.hiddenProductIds) {
            try { hiddenProds = JSON.parse(s.hiddenProductIds); } catch { hiddenProds = []; }
          }

          let hiddenNewsList = [];
          if (s.hiddenNewsIds) {
            try { hiddenNewsList = JSON.parse(s.hiddenNewsIds); } catch { hiddenNewsList = []; }
          }

          setSettings({
            showNewArrivals: showNew,
            showBestSellers: showBest,
            showSaleProducts: showSale,
            showNews: showNewsSection,
            hiddenProductIds: Array.isArray(hiddenProds) ? hiddenProds : [],
            hiddenNewsIds: Array.isArray(hiddenNewsList) ? hiddenNewsList : [],
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main className="pb-16 transition-colors duration-300">
      {/* 1. Banner Quảng Cáo Slide */}
      <HeroSlider />

      {/* Main Container */}
      <div className="container home max-w-[1440px] w-full mx-auto px-5">
        {/* 2. Danh mục sản phẩm (Thương hiệu) */}
        <BrandSection />

        {/* 3. Sản phẩm mới (New Arrivals) */}
        {settings.showNewArrivals && (
          <ProductSection
            title="Sản Phẩm Mới"
            isNew={true}
            sectionId="sanpham-moi"
            hiddenProductIds={settings.hiddenProductIds}
          />
        )}

        {/* 4. Sản phẩm bán chạy (Best Sellers) */}
        {settings.showBestSellers && (
          <ProductSection
            title="Sản Phẩm Bán Chạy"
            isBest={true}
            sectionId="sanpham-ban-chay"
            hiddenProductIds={settings.hiddenProductIds}
          />
        )}

        {/* 5. Sản phẩm giảm giá (On Sale / Discounted) */}
        {settings.showSaleProducts && (
          <ProductSection
            title="Sản Phẩm Giảm Giá"
            isSale={true}
            sectionId="sanpham-giam-gia"
            hiddenProductIds={settings.hiddenProductIds}
          />
        )}

        {/* 6. Tin tức mới */}
        {settings.showNews && (
          <NewsSection hiddenNewsIds={settings.hiddenNewsIds} />
        )}
      </div>

      {/* Giới thiệu & Đăng ký nhận tin */}
      <AboutUsSection />
      <JoinNewsletterSection />
    </main>
  );
};

export default HomePage;
