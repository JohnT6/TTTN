/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseRepository } from './base.repository';

class FavoriteRepository extends BaseRepository<any> {
  constructor() {
    super('favorite' as any);
  }

  async findByUserAndProduct(userId: string, productId: string) {
    return await (this.model as any).findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
  }

  async getUserFavorites(userId: string) {
    return await (this.model as any).findMany({
      where: { userId },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addFavorite(userId: string, productId: string) {
    return await (this.model as any).create({
      data: {
        userId,
        productId,
      },
    });
  }

  async removeFavorite(userId: string, productId: string) {
    return await (this.model as any).delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
  }
}

export default new FavoriteRepository();
