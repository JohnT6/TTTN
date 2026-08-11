/* eslint-disable @typescript-eslint/no-explicit-any */
import reviewRepository from '../repositories/review.repository';
import productRepository from '../repositories/product.repository';

export interface CreateReviewInput {
  productId: string;
  userId?: string;
  userName?: string;
  rating: number;
  comment: string;
}

export const reviewService = {
  createReview: async (input: CreateReviewInput) => {
    let { productId } = input;
    const { userId, userName, rating, comment } = input;

    if (!productId) {
      throw new Error('Mã sản phẩm không được để trống.');
    }

    if (!rating || rating < 1 || rating > 5) {
      throw new Error('Số sao đánh giá phải từ 1 đến 5 sao.');
    }

    if (!comment || comment.trim().length === 0) {
      throw new Error('Nội dung nhận xét không được để trống.');
    }

    // Tìm sản phẩm trong DB xem có tồn tại hay không (thử theo ID hoặc Slug)
    let product = await productRepository.findById(productId);
    if (!product) {
      product = await productRepository.findBySlug(productId);
    }

    if (!product) {
      throw new Error('Sản phẩm không tồn tại để đánh giá.');
    }

    // Gán lại productId chính xác theo ID UUID trong CSDL
    productId = product.id;

    const reviewData: any = {
      productId,
      rating: Number(rating),
      comment: comment.trim(),
      userName: userName?.trim() || 'Khách hàng',
    };

    if (userId) {
      reviewData.userId = userId;
    }

    const newReview = await reviewRepository.createReview(reviewData);
    return newReview;
  },

  getReviewsByProduct: async (productId: string) => {
    let product = await productRepository.findById(productId);
    if (!product) {
      product = await productRepository.findBySlug(productId);
    }
    const targetId = product ? product.id : productId;
    return await reviewRepository.findByProductId(targetId);
  },
};
