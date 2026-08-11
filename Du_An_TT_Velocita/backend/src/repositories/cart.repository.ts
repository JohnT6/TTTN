import prisma from '../libs/prisma';

export class CartRepository {
  async findCart(userId?: string, sessionKey?: string) {
    if (!userId && !sessionKey) return null;

    let cart = await prisma.cart.findFirst({
      where: userId ? { userId } : { sessionKey },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                image: true,
                price: true,
                salePrice: true,
                isSale: true,
              },
            },
            variant: {
              select: {
                id: true,
                size: true,
                sku: true,
                stock: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return cart;
  }

  async getOrCreateCart(userId?: string, sessionKey?: string) {
    let cart = await this.findCart(userId, sessionKey);

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: userId || null,
          sessionKey: sessionKey || null,
        },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  image: true,
                  price: true,
                  salePrice: true,
                  isSale: true,
                },
              },
              variant: {
                select: {
                  id: true,
                  size: true,
                  sku: true,
                  stock: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
          },
        },
      });
    }

    return cart;
  }

  async addItem(data: {
    cartId: string;
    productId: string;
    variantId?: string | null;
    size?: string | null;
    color?: string | null;
    quantity: number;
  }) {
    const { cartId, productId, variantId, size, color, quantity } = data;

    // Tìm item đã tồn tại trong giỏ hàng
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId,
        productId,
        ...(variantId ? { variantId } : { size: size || null, color: color || null }),
      },
    });

    if (existingItem) {
      return await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    }

    return await prisma.cartItem.create({
      data: {
        cartId,
        productId,
        variantId: variantId || null,
        size: size || null,
        color: color || null,
        quantity,
      },
    });
  }

  async updateItemQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      return await prisma.cartItem.delete({
        where: { id: itemId },
      });
    }

    return await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }

  async removeItem(itemId: string) {
    return await prisma.cartItem.delete({
      where: { id: itemId },
    });
  }

  async clearCart(cartId: string) {
    return await prisma.cartItem.deleteMany({
      where: { cartId },
    });
  }
}

export default new CartRepository();
