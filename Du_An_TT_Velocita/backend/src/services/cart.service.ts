import cartRepository from '../repositories/cart.repository';

export class CartService {
  async getCart(userId?: string, sessionKey?: string) {
    return await cartRepository.getOrCreateCart(userId, sessionKey);
  }

  async addToCart(data: {
    userId?: string;
    sessionKey?: string;
    productId: string;
    variantId?: string;
    size?: string;
    color?: string;
    quantity?: number;
  }) {
    const { userId, sessionKey, productId, variantId, size, color, quantity = 1 } = data;
    const cart = await cartRepository.getOrCreateCart(userId, sessionKey);

    await cartRepository.addItem({
      cartId: cart.id,
      productId,
      variantId,
      size,
      color,
      quantity,
    });

    return await cartRepository.findCart(userId, sessionKey);
  }

  async updateQuantity(itemId: string, quantity: number, userId?: string, sessionKey?: string) {
    await cartRepository.updateItemQuantity(itemId, quantity);
    return await cartRepository.findCart(userId, sessionKey);
  }

  async removeItem(itemId: string, userId?: string, sessionKey?: string) {
    await cartRepository.removeItem(itemId);
    return await cartRepository.findCart(userId, sessionKey);
  }

  async clearCart(userId?: string, sessionKey?: string) {
    const cart = await cartRepository.findCart(userId, sessionKey);
    if (cart) {
      await cartRepository.clearCart(cart.id);
    }
    return await cartRepository.findCart(userId, sessionKey);
  }
}

export default new CartService();
