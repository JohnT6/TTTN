/* eslint-disable @typescript-eslint/no-explicit-any */
import { Review } from '../generated/prisma/client';
import { BaseRepository } from './base.repository';

class ReviewRepository extends BaseRepository<Review> {
  constructor() {
    super('review');
  }

  async findByProductId(productId: string): Promise<Review[]> {
    return await this.model.findMany({
      where: { productId },
      include: {
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createReview(data: any): Promise<Review> {
    return await this.model.create({
      data,
      include: {
        user: true,
      },
    });
  }
}

export default new ReviewRepository();
