import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategoriesAPI } from '../../services/api';
import { formatImageUrl } from '../../helpers/helper';

const BrandSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Nạp danh sách Nhãn Hàng / Categories từ Backend API (XÓA SẠCH MOCK DATA)
  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await getCategoriesAPI();
        if (isMounted) {
          if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
            setCategories(res.data);
          } else {
            setCategories([]);
          }
        }
      } catch (err) {
        if (isMounted) setCategories([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Map ảnh mặc định chuẩn nếu DB chưa có ảnh
  const getBrandImage = (name, img) => {
    if (img) return formatImageUrl(img);
    const n = (name || '').toLowerCase();
    if (n.includes('adidas')) return '/assets/img/brand-adidas.png';
    if (n.includes('nike')) return '/assets/img/brand-nike.png';
    if (n.includes('asics')) return '/assets/img/brand-asics.png';
    if (n.includes('puma')) return '/assets/img/brand-puma.png';
    return '/assets/img/brand-adidas.png';
  };

  if (loading) {
    return (
      <div className="home-container mt-[100px] select-none">
        <div className="brand-cate grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[30px]">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="col h-[320px] bg-slate-200 animate-pulse rounded-none"></div>
          ))}
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="home-container mt-[100px]">
      <div className="brand-cate grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[30px]">
        {categories.map((brand) => (
          <div key={brand.id || brand.name} className="col">
            <Link
              to={`/product-catalog?category=${encodeURIComponent(brand.name)}`}
              className="brand-link block h-full"
            >
              <article className="brand-container flex flex-col h-full">
                <div className="brand__img-wrap relative pt-[100%] overflow-hidden">
                  <img
                    src={getBrandImage(brand.name, brand.image)}
                    alt={brand.name}
                    className="brand__img absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <section className="brand__bottom">
                  <div className="brand__text-wrap">
                    <h2 className="brand__heading text-[24px] font-bold">{brand.name}</h2>
                    <p className="brand__desc mt-3.5 text-sm text-[#707072] leading-[1.47]">
                      {brand.description || `${brand.name} - Thương hiệu giày thể thao cao cấp hàng đầu.`}
                    </p>
                  </div>
                  <div className="brand__btn-wrap mt-5">
                    <span className="btn brand__btn">
                      Cửa hàng
                    </span>
                  </div>
                </section>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandSection;
