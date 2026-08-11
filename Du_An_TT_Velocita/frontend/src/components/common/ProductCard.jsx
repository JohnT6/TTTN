import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const currentSrc = isHovered && product.hoverImg ? product.hoverImg : product.img;

  // Sử dụng slug hoặc id để tạo đường dẫn động chi tiết sản phẩm chuẩn SEO
  const productDetailUrl = `/product/${product.slug || product.id}`;

  return (
    <article className="product-container flex flex-col h-full pt-[5px] pb-[15px] px-[5px] border border-transparent hover:border-black">
      <div className="product__img-wrap relative pt-[100%] overflow-hidden block bg-[#f6f6f6]">
        <Link to={productDetailUrl}>
          <img
            src={currentSrc}
            alt={product.title || product.name}
            className="product__img absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </Link>
      </div>
      <h2 className="product__heading mt-2.5 text-[18px] font-bold leading-[1.47]">
        <Link to={productDetailUrl} className="hover:cursor-pointer">
          {product.title || product.name}
        </Link>
      </h2>
      <p className="product__desc mt-2.5 text-sm leading-[1.47] text-[#707072] select-none">
        {product.desc || product.description}
      </p>
      <div className="product__price-wrap mt-auto">
        <div className="product__price mt-2.5 text-sm font-bold leading-[1.47] select-none flex items-center gap-2">
          <span className="text-black">{product.price}</span>
          {product.hasSale && product.originalPrice && (
            <span className="line-through text-gray-400 text-xs font-normal">
              {product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
