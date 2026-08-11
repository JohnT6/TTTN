import React from 'react';
import { Link } from 'react-router-dom';
import { formatImageUrl } from '../../helpers/helper';

const NewsCard = ({ blog, showDate = false }) => {
  if (!blog) return null;

  const imgSrc = formatImageUrl(blog.image || blog.img || '/assets/img/blog-clean-shoes.png');
  const blogTitle = blog.title || 'Bài viết tin tức';
  const blogDesc = blog.desc || blog.description || '';
  const blogDate = blog.date || (blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '');

  return (
    <Link to={`/news/${blog.id || 1}`} className="block h-full">
      <article className="blog-container flex flex-col h-full bg-white transition-all duration-300">
        <div className="blog__img-wrap relative pt-[100%] overflow-hidden block">
          <img
            src={imgSrc}
            alt={blogTitle}
            className="blog__img absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="blog__bottom p-2.5 block flex-1">
          <h2 className="blog__heading mt-2.5 text-[18px] font-bold leading-[1.47] line-clamp-2 hover:underline text-gray-900">
            {blogTitle}
          </h2>
          
          {/* Tuỳ chọn hiển thị Ngày tháng đăng (showDate=true) hoặc Mô tả ngắn (showDate=false) */}
          {showDate ? (
            <p className="blog__date mt-2 text-xs font-bold text-[#707072] uppercase tracking-wider">
              {blogDate}
            </p>
          ) : (
            <p className="blog__desc mt-2.5 text-sm text-[#707072] leading-[1.47] line-clamp-3">
              {blogDesc}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;
