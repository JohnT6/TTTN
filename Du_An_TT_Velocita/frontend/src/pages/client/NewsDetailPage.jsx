import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NewsSection from '../../components/home/NewsSection';
import JoinNewsletterSection from '../../components/home/JoinNewsletterSection';
import { getNewsDetailAPI } from '../../services/api';
import { formatImageUrl, formatHtmlContent } from '../../helpers/helper';

// SVG Icon Mũi tên xuống
const DownloadArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    className="w-4 h-4 fill-current transition-colors"
  >
    <path d="M297.4 566.6C309.9 579.1 330.2 579.1 342.7 566.6L502.7 406.6C515.2 394.1 515.2 373.8 502.7 361.3C490.2 348.8 469.9 348.8 457.4 361.3L352 466.7L352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 466.7L182.6 361.3C170.1 348.8 149.8 348.8 137.3 361.3C124.8 373.8 124.8 394.1 137.3 406.6L297.3 566.6z" />
  </svg>
);

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State nạp bài viết từ API Backend (XÓA SẠCH MOCK DATA)
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailInput, setEmailInput] = useState('');

  // State Modal Fullscreen Lightbox Preview Ảnh
  const [previewIndex, setPreviewIndex] = useState(null);
  const [slideDirection, setSlideDirection] = useState('next');
  const [isSliding, setIsSliding] = useState(false);

  // Nạp dữ liệu bài viết thực từ Backend API
  useEffect(() => {
    let isMounted = true;
    const fetchArticleDetail = async () => {
      setLoading(true);
      try {
        const res = await getNewsDetailAPI(id);
        if (isMounted && res && res.success && res.data) {
          setArticle(res.data);
        }
      } catch (err) {
        // Ignore
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArticleDetail();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Bóc tách tự động duy nhất hình ảnh có trong nội dung WYSIWYG HTML (article.content)
  const mediaImages = useMemo(() => {
    const images = [];
    if (!article || !article.content) return images;

    const contentHtml = article.content || '';
    if (contentHtml && typeof window !== 'undefined') {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(contentHtml, 'text/html');
        const imgTags = doc.querySelectorAll('img');

        imgTags.forEach((img) => {
          const src = img.getAttribute('src');
          if (src) {
            let fullUrl = src;
            // Chuẩn hóa đường dẫn: nếu là link tương đối (/uploads, /assets) ➔ qua formatImageUrl
            if (!src.startsWith('data:image/') && !src.startsWith('http://') && !src.startsWith('https://')) {
              fullUrl = formatImageUrl(src);
            }
            if (!images.includes(fullUrl)) {
              images.push(fullUrl);
            }
          }
        });
      } catch (err) {
        // Ignore
      }
    }

    return images;
  }, [article]);

  // Tải đơn lẻ 1 hình ảnh về máy mà không bị mở sang tab mới (Blob Fetching)
  const handleDownloadSingle = async (imgUrl, idx) => {
    try {
      if (imgUrl.startsWith('data:image/')) {
        // Xử lý ảnh Base64
        const link = document.createElement('a');
        link.href = imgUrl;
        link.download = `media-image-${idx + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      const res = await fetch(imgUrl);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `media-image-${idx + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Fallback mở link trực tiếp nếu dính CORS
      window.open(imgUrl, '_blank');
    }
  };

  // Tải xuống toàn bộ danh sách hình ảnh (DOWNLOAD ALL)
  const handleDownloadAll = async () => {
    for (let i = 0; i < mediaImages.length; i++) {
      await handleDownloadSingle(mediaImages[i], i);
    }
  };



  // Điều hướng Modal Preview Ảnh Next/Prev (Slide Animation)
  const handlePrevImage = () => {
    if (isSliding) return;
    setSlideDirection('prev');
    setIsSliding(true);
    setTimeout(() => {
      setPreviewIndex((prev) => (prev === 0 ? mediaImages.length - 1 : prev - 1));
      setIsSliding(false);
    }, 150);
  };

  const handleNextImage = () => {
    if (isSliding) return;
    setSlideDirection('next');
    setIsSliding(true);
    setTimeout(() => {
      setPreviewIndex((prev) => (prev === mediaImages.length - 1 ? 0 : prev + 1));
      setIsSliding(false);
    }, 150);
  };

  const handleSelectThumb = (idx) => {
    if (isSliding || idx === previewIndex) return;
    setSlideDirection(idx > previewIndex ? 'next' : 'prev');
    setIsSliding(true);
    setTimeout(() => {
      setPreviewIndex(idx);
      setIsSliding(false);
    }, 150);
  };

  if (loading) {
    return (
      <main className="max-w-[1000px] w-full mx-auto px-5 pt-[140px] pb-[100px] text-center">
        <div className="py-20 space-y-4">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 font-medium text-sm">Đang tải bài viết...</p>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="max-w-[1000px] w-full mx-auto px-5 pt-[140px] pb-[100px] text-center">
        <div className="py-20 space-y-4">
          <p className="text-xl font-bold text-gray-800">Không tìm thấy bài viết tin tức</p>
          <button
            onClick={() => navigate('/news')}
            className="px-6 py-2.5 bg-black text-white text-xs font-bold uppercase rounded-full hover:bg-gray-800 transition-colors"
          >
            Quay lại trang tin tức
          </button>
        </div>
      </main>
    );
  }

  // Tên thể loại tiếng Việt chuẩn
  const categoryTitle =
    article.category === 'SHOWS' ? 'SHOW THỜI TRANG' :
      article.category === 'ART_CULTURE' ? 'NGHỆ THUẬT & VĂN HÓA' :
        article.category === 'GUIDE' ? 'HƯỚNG DẪN' : (article.category || 'TIN TỨC');

  const formattedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : article.date || 'Gần đây';

  return (
    <main className="bg-white text-gray-900 font-sans pt-[100px] pb-16">
      <div className="max-w-[1360px] mx-auto px-6">

        {/* 1. Breadcrumb */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 font-medium">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"
          >
            <span>↵</span>
            <span className="underline font-bold">Trở lại</span>
          </button>
          <span className="text-gray-300">/</span>
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-black transition-colors">Trang Chủ</Link>
            <span>/</span>
            <Link to="/news" className="hover:text-black transition-colors">Tin Tức</Link>
            <span>/</span>
            <span className="font-bold text-black line-clamp-1 max-w-md">{article.title}</span>
          </div>
        </div>

        {/* 2. Tiêu đề bài viết */}
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-gray-900 leading-[1.1] max-w-5xl mb-4">
          {article.title}
        </h1>

        {/* 3. Thông tin ngày đăng & Tác giả */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-gray-500 mb-10 pb-6 border-b border-gray-200">
          <span>{formattedDate}</span>
          <span>|</span>
          <span>{categoryTitle}</span>
          {article.author && (
            <>
              <span>|</span>
              <span>Tác giả: {article.author}</span>
            </>
          )}
        </div>

        {/* 4. Layout 2 Cột: Main Article & Cột Phải Sidebar Media */}
        <div className="grid grid-cols-12 gap-10 items-start">

          {/* ==================== CỘT BÊN TRÁI: NỘI DUNG BÀI VIẾT ==================== */}
          <div className="col-span-8 max-lg:col-span-12 relative flex gap-6">

            {/* Nội dung chính bài viết (Hiển thị trực tiếp nội dung WYSIWYG HTML) */}
            <div className="space-y-8 flex-1 text-sm md:text-base leading-relaxed text-gray-800">
              {article.content ? (
                <div
                  className="news-content-body space-y-4 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatHtmlContent(article.content) }}
                />
              ) : (
                <p className="text-gray-600">Nội dung chi tiết bài viết đang được cập nhật...</p>
              )}
            </div>
          </div>


          {/* ==================== CỘT BÊN PHẢI: KHỐI DOWNLOAD MEDIA ==================== */}
          <div className="col-span-4 max-lg:col-span-12 space-y-8">

            {/* Khối DOWNLOAD MEDIA (Hiển thị 100% Ảnh bóc tách từ bài viết) */}
            <div className="bg-[#f5f5f5] p-5 space-y-4">
              <h2 className="text-lg font-black uppercase tracking-tight text-gray-900">
                DOWNLOAD MEDIA
              </h2>

              <div className="flex items-center justify-between border-b border-gray-300 pb-3">
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  IMAGES ({mediaImages.length})
                </span>

                {/* Nút DOWNLOAD ALL */}
                {mediaImages.length > 0 && (
                  <button
                    onClick={handleDownloadAll}
                    className="text-xs font-black uppercase tracking-wider text-gray-900 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    DOWNLOAD ALL
                  </button>
                )}
              </div>

              {/* Lưới 6 ô ảnh preview */}
              {mediaImages.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {mediaImages.slice(0, 5).map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square bg-gray-200 overflow-hidden group select-none cursor-pointer"
                    >
                      <img
                        src={imgUrl}
                        alt={`Media preview ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Overlay khi Hover: 2 Nút (Con Mắt & Tải Xuống) */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="hidden group-hover:flex items-center gap-3">

                          {/* Nút 1: Con Mắt Preview Icon */}
                          <button
                            title="Xem trước"
                            onClick={() => setPreviewIndex(idx)}
                            className="w-10 h-10 rounded-full bg-black text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center cursor-pointer shadow-md"
                          >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                            </svg>
                          </button>

                          {/* Nút 2: Download Arrow SVG */}
                          <button
                            title="Tải xuống ảnh này"
                            onClick={() => handleDownloadSingle(imgUrl, idx)}
                            className="w-10 h-10 rounded-full bg-black text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center cursor-pointer shadow-md"
                          >
                            <DownloadArrowIcon />
                          </button>

                        </div>

                        {/* Icon mắt đơn khi chưa hover */}
                        <div className="w-9 h-9 rounded-full bg-black/80 text-white flex items-center justify-center group-hover:hidden shadow-md">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Ô thứ 6: Ô Overlay xem thêm nếu hơn 5 ảnh */}
                  {mediaImages.length > 5 && (
                    <div
                      onClick={() => setPreviewIndex(5)}
                      className="relative aspect-square bg-gray-900 overflow-hidden cursor-pointer group"
                    >
                      <img
                        src={mediaImages[5]}
                        alt="Xem thêm media"
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-black text-white tracking-wider">
                          +{mediaImages.length - 5}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-gray-500 py-2">Chưa có hình ảnh đi kèm bài viết.</p>
              )}
            </div>

            {/*  Khối Đăng ký thông báo Sidebar */}
            <div className="bg-black text-white p-6 text-center space-y-4">
              <h3 className="text-base font-black uppercase tracking-tight leading-tight">
                ĐĂNG KÝ NHẬN THÔNG BÁO TIN TỨC VÀ CẬP NHẬT MỚI NHẤT.
              </h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <input
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full h-10 px-3 bg-white text-black text-xs font-medium outline-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full h-10 bg-white text-black text-xs font-black uppercase tracking-wider hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  ĐĂNG KÝ
                </button>
              </form>
            </div>

          </div>

        </div>


        {/* ==================== 5. TIN TỨC LIÊN QUAN ==================== */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <NewsSection title="TIN TỨC LIÊN QUAN" showDate={true} />
        </div>

      </div>


      {/* ==================== MODAL PREVIEW ẢNH FULLSCREEN LIGHTBOX (z-[9999]) ==================== */}
      {previewIndex !== null && mediaImages.length > 0 && (
        <div className="fixed inset-0 z-[9999] bg-[#ebedee] flex flex-col justify-between p-6 select-none animate-fade-in">

          {/* Top Bar: Nút Đóng Close Box */}
          <div className="flex justify-end w-full">
            <button
              onClick={() => setPreviewIndex(null)}
              className="w-10 h-10 bg-white border border-gray-300 text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
              title="Đóng xem ảnh"
            >
              <span className="text-lg font-normal">✕</span>
            </button>
          </div>

          {/* Center Content: Ảnh chính lớn & 2 Nút Prev / Next */}
          <div className="relative flex-1 flex items-center justify-between px-4 max-h-[75vh]">

            {/* Nút Qua Trái (←) */}
            <button
              onClick={handlePrevImage}
              className="w-10 h-10 bg-white border border-gray-300 text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer z-10"
              title="Ảnh trước"
            >
              <span className="text-lg font-normal">←</span>
            </button>

            {/* Khung chứa ảnh chính */}
            <div className="flex-1 h-full flex items-center justify-center px-6 overflow-hidden">
              <img
                src={mediaImages[previewIndex]}
                alt={`Media full preview ${previewIndex + 1}`}
                className={`max-h-full max-w-full object-contain transition-all duration-300 ease-in-out ${isSliding
                    ? slideDirection === 'next'
                      ? 'translate-x-12 opacity-0'
                      : '-translate-x-12 opacity-0'
                    : 'translate-x-0 opacity-100 scale-100'
                  }`}
              />
            </div>

            {/* Nút Qua Phải (→) */}
            <button
              onClick={handleNextImage}
              className="w-10 h-10 bg-white border border-gray-300 text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer z-10"
              title="Ảnh tiếp theo"
            >
              <span className="text-lg font-normal">→</span>
            </button>
          </div>

          {/* Bottom Bar: Dải Thumbnail các ảnh nhỏ */}
          <div className="w-full max-w-5xl mx-auto pt-4 border-t border-gray-300">
            <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-none py-2 px-2">
              {mediaImages.map((thumbUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectThumb(idx)}
                  className={`relative flex-shrink-0 w-14 h-14 bg-white overflow-hidden border transition-all cursor-pointer ${previewIndex === idx
                      ? 'border-b-4 border-black scale-105 opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                >
                  <img
                    src={thumbUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

        </div>
      )}


      {/* ==================== 6. CHÂN TRANG: JoinNewsletterSection ==================== */}
      <div className="mt-16">
        <JoinNewsletterSection />
      </div>
    </main>
  );
}
