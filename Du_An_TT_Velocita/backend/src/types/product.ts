import { GenderCategory } from '../generated/prisma/enums';

export type productQueryData = {
  categoryId?: string;
  category?: string;
  categories?: string;
  gender?: string;
  search?: string;
  q?: string;
  isNew?: string | boolean;
  isSale?: string | boolean;
  isBest?: string | boolean;
  minPrice?: number | string;
  maxPrice?: number | string;
  size?: string;
  color?: string;
  sort?: string;
  page?: number | string;
  limit?: number | string;
};

export type createProductData = {
  categoryId: string;
  name: string;
  slug: string;
  styleCode?: string;
  colorName?: string;
  image: string;
  hoverImage?: string;
  price: number;
  salePrice?: number;
  description?: string;
  details?: string;
  gender?: GenderCategory;
  isNew?: boolean;
  isBest?: boolean;
  isSale?: boolean;
  status?: boolean;
};

export type updateProductData = Partial<createProductData>;
