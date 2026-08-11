/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from '../generated/prisma/client';
import { BaseRepository } from './base.repository';

class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super('product');
  }

  async findDetailById(id: string): Promise<Product | null> {
    return await this.model.findUnique({
      where: { id },
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        variants: true,
        reviews: {
          include: { user: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async findBySlug(slug: string): Promise<Product | null> {
    return await this.model.findFirst({
      where: { slug, status: true },
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        variants: true,
        reviews: {
          include: { user: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async findWithFilter(where: any, skip: number, limit: number): Promise<Product[]> {
    return await this.model.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        variants: true,
      },
    });
  }
}

export default new ProductRepository();
