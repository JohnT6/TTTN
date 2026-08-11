import favoriteRepository from '../repositories/favorite.repository';
import productRepository from '../repositories/product.repository';

export const favoriteService = {
  toggleFavorite: async (userId: string, productIdOrSlug: string) => {
    if (!userId) {
      throw new Error('Vui lòng đăng nhập để thả tim sản phẩm.');
    }

    if (!productIdOrSlug) {
      throw new Error('Mã sản phẩm không hợp lệ.');
    }

    // Tìm mã sản phẩm chuẩn theo UUID
    let product = await productRepository.findById(productIdOrSlug);
    if (!product) {
      product = await productRepository.findBySlug(productIdOrSlug);
    }

    if (!product) {
      throw new Error('Sản phẩm không tồn tại.');
    }

    const targetProductId = product.id;

    // Kiểm tra xem user đã thích sản phẩm này chưa
    const existing = await favoriteRepository.findByUserAndProduct(userId, targetProductId);

    if (existing) {
      // Đã thích -> Bỏ thích
      await favoriteRepository.removeFavorite(userId, targetProductId);
      return { isFavorite: false, message: 'Đã xóa khỏi danh sách yêu thích.' };
    } else {
      // Chưa thích -> Thêm vào danh sách yêu thích
      await favoriteRepository.addFavorite(userId, targetProductId);
      return { isFavorite: true, message: 'Đã thêm vào danh sách yêu thích.' };
    }
  },

  getUserFavorites: async (userId: string) => {
    if (!userId) {
      throw new Error('Vui lòng đăng nhập để xem danh sách yêu thích.');
    }
    return await favoriteRepository.getUserFavorites(userId);
  },

  checkIsFavorite: async (userId: string, productIdOrSlug: string) => {
    if (!userId || !productIdOrSlug) return false;
    let product = await productRepository.findById(productIdOrSlug);
    if (!product) {
      product = await productRepository.findBySlug(productIdOrSlug);
    }
    if (!product) return false;
    const existing = await favoriteRepository.findByUserAndProduct(userId, product.id);
    return Boolean(existing);
  },
};
