/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseRepository } from './base.repository';

export class CategoryRepository extends BaseRepository<any> {
  constructor() {
    super('category' as any);
  }

  async findAll() {
    return await (this.model as any).findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async createCategory(data: { name: string; slug?: string; description?: string; image?: string; status?: boolean }) {
    const cleanSlug = data.slug && data.slug.trim()
      ? data.slug.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      : data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    return await (this.model as any).create({
      data: {
        name: data.name,
        slug: cleanSlug,
        description: data.description || null,
        image: data.image || null,
        status: data.status ?? true,
      },
    });
  }

  async updateCategory(id: string, data: { name?: string; slug?: string; description?: string; image?: string; status?: boolean }) {
    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.slug !== undefined && data.slug.trim()) {
      updateData.slug = data.slug.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    } else if (data.name !== undefined) {
      updateData.slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    }
    if (data.description !== undefined) updateData.description = data.description;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.status !== undefined) updateData.status = data.status;

    return await (this.model as any).update({
      where: { id },
      data: updateData,
    });
  }

  async deleteCategory(id: string) {
    return await (this.model as any).delete({
      where: { id },
    });
  }
}

export default new CategoryRepository();
