import React, { useState, useEffect, useRef } from 'react';
import NewsCard from '../common/NewsCard';
import { getNewsAPI } from '../../services/api';

const NewsSection = ({ title = 'Tin tức', news = [], showDate = false }) => {
  const blogScrollRef = useRef(null);
  const [apiNews, setApiNews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Nạp Tin tức thực tế từ Backend API nếu không được truyền từ props
  useEffect(() => {
    let isMounted = true;
    if (news.length === 0) {
      setLoading(true);
      getNewsAPI()
        .then((res) => {
          if (isMounted && res && res.success && Array.isArray(res.data)) {
            setApiNews(res.data);
          }
        })
        .catch(() => {
          // Ignore
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [news.length]);

  const sourceNews = news.length > 0 ? news : apiNews;

  // Lọc chuẩn CSDL: Chỉ hiển thị các bài viết có status !== false VÀ status !== 0
  const blogsData = sourceNews.filter((blog) => {
    return blog.status !== false && blog.status !== 0 && blog.status !== '0';
  });

  const scrollByAmount = (amount) => {
    if (blogScrollRef.current) {
      blogScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  if (!loading && blogsData.length === 0) {
    return null;
  }

  return (
    <div className="home-container mt-[100px]">
      <div className="home-row flex items-center justify-between mb-5">
        <h2 className="home__heading text-[32px] font-bold">{title}</h2>
        <div className="home__btn-wrap flex gap-2.5">
          <button
            onClick={() => scrollByAmount(-350)}
            className="control-button home-control__btn w-10 h-10 rounded-full border-none bg-[#e5e5e51a] flex justify-center items-center text-sm text-black cursor-pointer transition-all duration-300 hover:bg-[#e5e5e5cc]"
          >
            &#10094;
          </button>
          <button
            onClick={() => scrollByAmount(350)}
            className="control-button home-control__btn w-10 h-10 rounded-full border-none bg-[#e5e5e51a] flex justify-center items-center text-sm text-black cursor-pointer transition-all duration-300 hover:bg-[#e5e5e5cc]"
          >
            &#10095;
          </button>
        </div>
      </div>

      <div
        ref={blogScrollRef}
        className="blog-cate flex flex-nowrap overflow-x-auto scrollbar-none -mx-[15px] pb-4 scroll-smooth"
      >
        {loading ? (
          [1, 2, 3, 4].map((n) => (
            <div key={n} className="col flex-shrink-0 w-1/4 max-lg:w-1/3 max-md:w-1/2 max-sm:w-full px-[15px]">
              <div className="w-full h-48 bg-slate-200 animate-pulse"></div>
            </div>
          ))
        ) : (
          blogsData.map((blog) => (
            <div key={blog.id} className="col flex-shrink-0 w-1/4 max-lg:w-1/3 max-md:w-1/2 max-sm:w-full px-[15px]">
              <NewsCard blog={blog} showDate={showDate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsSection;
