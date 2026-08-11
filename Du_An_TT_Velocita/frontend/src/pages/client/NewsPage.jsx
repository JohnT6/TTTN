import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import JoinNewsletterSection from '../../components/home/JoinNewsletterSection';
import NewsBannerSection from '../../components/news/NewsBannerSection';
import { getBannersAPI, getNewsAPI } from '../../services/api';
import { formatImageUrl } from '../../helpers/helper';

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  // State Banner & News từ API
  const [newsBanners, setNewsBanners] = useState([]);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [allNews, setAllNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  // State giới hạn số lượng bài viết hiển thị cho từng section
  const [sectionLimits, setSectionLimits] = useState({
    shows: 3,
    art: 3,
    guide: 3,
    general: 3,
  });

  // Nạp danh sách Banner vị trí NEWS_HERO / NEWS_BANNER từ Backend CSDL MySQL
  useEffect(() => {
    let isMounted = true;
    const fetchNewsBanners = async () => {
      setBannerLoading(true);
      try {
        const res = await getBannersAPI();
        if (isMounted && res && res.success && res.data) {
          const list = res.data.filter((b) => {
            if (b.status === false || b.status === 0) return false;
            if (!b.position) return false;
            const pos = String(b.position).toUpperCase();
            return pos === 'NEWS_HERO' || pos === 'NEWS_BANNER' || pos === 'NEWS';
          });
          setNewsBanners(list);
        }
      } catch (err) {
        // Ignore
      } finally {
        if (isMounted) setBannerLoading(false);
      }
    };

    fetchNewsBanners();
    return () => {
      isMounted = false;
    };
  }, []);

  // Nạp danh sách Bài Viết Tin Tức từ Backend API
  useEffect(() => {
    let isMounted = true;
    const fetchNewsList = async () => {
      setNewsLoading(true);
      try {
        const res = await getNewsAPI();
        if (isMounted) {
          if (res && res.success && Array.isArray(res.data)) {
            setAllNews(res.data);
          } else {
            setAllNews([]);
          }
        }
      } catch (err) {
        if (isMounted) setAllNews([]);
      } finally {
        if (isMounted) setNewsLoading(false);
      }
    };

    fetchNewsList();
    return () => {
      isMounted = false;
    };
  }, []);

  // Phân nhóm danh sách bài viết theo 4 NewsCategory Enum chuẩn
  const sectionsData = useMemo(() => {
    if (!allNews || allNews.length === 0) {
      return { shows: [], art: [], guide: [], general: [] };
    }

    const formatted = allNews.map((item) => {
      const catEnum = String(item.category || 'GENERAL').toUpperCase();
      let catLabel = 'TIN TỨC';
      if (catEnum === 'SHOWS') catLabel = 'SHOW THỜI TRANG';
      else if (catEnum === 'ART_CULTURE') catLabel = 'NGHỆ THUẬT & VĂN HÓA';
      else if (catEnum === 'GUIDE') catLabel = 'HƯỚNG DẪN';
      else if (typeof item.category === 'string' && item.category !== 'GENERAL') catLabel = item.category.toUpperCase();

      return {
        id: item.id,
        categoryEnum: catEnum,
        category: catLabel,
        title: item.title || 'Bài viết mới',
        img: formatImageUrl(item.image || item.img || '/assets/img/blog-clean-shoes.png'),
        date: item.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '2026'),
      };
    });

    return {
      shows: formatted.filter((item) => item.categoryEnum === 'SHOWS'),
      art: formatted.filter((item) => item.categoryEnum === 'ART_CULTURE'),
      guide: formatted.filter((item) => item.categoryEnum === 'GUIDE'),
      general: formatted.filter((item) => item.categoryEnum === 'GENERAL'),
    };
  }, [allNews]);

  // Cấu hình các Section hiển thị động
  const sectionsList = useMemo(() => {
    const list = [
      { id: 'shows', title: 'Buổi trình diễn thời trang.', data: sectionsData.shows, btnText: 'KHÁM PHÁ CÁC SHOW DIỄN' },
      { id: 'art', title: 'Nghệ thuật & Văn hóa.', data: sectionsData.art, btnText: 'KHÁM PHÁ NGHỆ THUẬT' },
      { id: 'guide', title: 'Hướng dẫn & Phong cách.', data: sectionsData.guide, btnText: 'KHÁM PHÁ HƯỚNG DẪN' },
      { id: 'general', title: 'Tin tức chung.', data: sectionsData.general, btnText: 'KHÁM PHÁ TIN TỨC CHUNG' },
    ];
    // Chỉ giữ lại các section CÓ DỮ LIỆU bài viết
    return list.filter((s) => s.data.length > 0);
  }, [sectionsData]);

  // Danh mục tin tức cho Sub-nav
  const categoriesNav = useMemo(() => {
    const nav = [{ id: 'all', name: 'Tất cả' }];
    sectionsList.forEach((s) => {
      nav.push({ id: s.id, name: s.title.replace('.', '') });
    });
    return nav;
  }, [sectionsList]);

  const scrollToSection = (sectionId) => {
    setActiveCategory(sectionId);
    if (sectionId === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const toggleSectionLimit = (sectionId, totalCount) => {
    setSectionLimits((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId] < totalCount ? totalCount : 3,
    }));
  };

  return (
    <main className="bg-white text-gray-900 font-sans pt-[100px] pb-16">
      
      {/* 1. Header Title & Sub-navigation */}
      <div className="max-w-[1360px] mx-auto px-6 text-center space-y-6 mb-10">
        <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-gray-900">
          Maison VELOCITÀ
        </h1>

        {/* Category Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm font-semibold tracking-wide border-b border-gray-200 pb-4">
          {categoriesNav.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToSection(cat.id)}
              className={`transition-colors cursor-pointer pb-1 border-b-2 ${
                activeCategory === cat.id
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>


      {/* 2. Hero Banner Trang Tin Tức (Slider mượt từ Backend CSDL MySQL) */}
      <NewsBannerSection banners={newsBanners} loading={bannerLoading} />


      {/* 3. Danh Sách Các Thể Loại Bài Viết (TỰ ĐỘNG ÂN KHI KHÔNG CÓ BÀI VIẾT) */}
      <div className="max-w-[1360px] mx-auto px-6 space-y-20">

        {newsLoading ? (
          <div className="space-y-8">
            <div className="h-8 w-64 bg-slate-200 animate-pulse"></div>
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-64 bg-slate-200 animate-pulse"></div>
              ))}
            </div>
          </div>
        ) : sectionsList.length > 0 ? (
          sectionsList.map((sec) => {
            const currentLimit = sectionLimits[sec.id] || 3;
            const displayItems = sec.data.slice(0, currentLimit);
            const hasMore = sec.data.length > 3;

            return (
              <section key={sec.id} id={sec.id} className="space-y-8 scroll-mt-28">
                <h2 className="text-3xl font-serif font-bold text-gray-900 border-b border-gray-100 pb-3">
                  {sec.title}
                </h2>

                {/* Lưới 3 Cards (Grid 3 Cột) - Giữ nguyên 100% Layout & CSS cũ */}
                <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6 transition-all duration-500 ease-in-out">
                  {displayItems.map((item, index) => (
                    <Link
                      key={item.id}
                      to={`/news/${item.id}`}
                      className="group space-y-3 block transition-all duration-500 ease-out transform opacity-100 translate-y-0 animate-fade-in"
                      style={{
                        animationDelay: `${(index % 3) * 100}ms`,
                      }}
                    >
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">{item.category}</span>
                        <h3 className="text-base font-bold text-gray-900 group-hover:underline line-clamp-2 leading-snug">{item.title}</h3>
                        <span className="text-xs font-medium text-gray-500 block">{item.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Nút Khám Phá / Thu Gọn */}
                {hasMore && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => toggleSectionLimit(sec.id, sec.data.length)}
                      className="px-8 py-3 bg-black text-white border border-black rounded-full font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 active:scale-95 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      {currentLimit < sec.data.length ? sec.btnText : 'THU GỌN'}
                    </button>
                  </div>
                )}
              </section>
            );
          })
        ) : (
          <div className="py-20 text-center text-gray-500 font-medium">
            Hiện chưa có bài viết tin tức nào được xuất bản.
          </div>
        )}

      </div>


      {/* 4. Join Newsletter Footer Section */}
      <div className="mt-24">
        <JoinNewsletterSection />
      </div>

    </main>
  );
}
