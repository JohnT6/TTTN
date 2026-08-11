/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseRepository } from './base.repository';

export class NewsRepository extends BaseRepository<any> {
  constructor() {
    super('news' as any);
  }

  async findAll() {
    return await (this.model as any).findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllActive() {
    return await (this.model as any).findMany({
      where: { status: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByIdOrSlug(idOrSlug: string) {
    let item = await (this.model as any).findUnique({
      where: { id: idOrSlug },
    });
    if (!item) {
      item = await (this.model as any).findFirst({
        where: { slug: idOrSlug },
      });
    }
    return item;
  }

  async createNews(data: {
    title: string;
    slug?: string;
    category?: 'SHOWS' | 'ART_CULTURE' | 'GUIDE' | 'GENERAL';
    image?: string;
    desc?: string;
    content?: string;
    author?: string;
    showDate?: boolean;
    date?: string;
    status?: boolean;
  }) {
    // Tự động tạo slug nếu không truyền vào
    const generatedSlug =
      data.slug ||
      data.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9_-]+/g, '-')
        .replace(/(^-|-$)+/g, '') +
        '-' +
        Date.now();

    return await (this.model as any).create({
      data: {
        title: data.title,
        slug: generatedSlug,
        category: data.category || 'GENERAL',
        image: data.image || '',
        desc: data.desc || null,
        content: data.content || null,
        author: data.author || 'Velocità Admin',
        showDate: data.showDate ?? false,
        date: data.date || new Date().toLocaleDateString('vi-VN'),
        status: data.status ?? true,
      },
    });
  }

  async updateNews(
    id: string,
    data: {
      title?: string;
      slug?: string;
      category?: 'SHOWS' | 'ART_CULTURE' | 'GUIDE' | 'GENERAL';
      image?: string;
      desc?: string;
      content?: string;
      author?: string;
      showDate?: boolean;
      date?: string;
      status?: boolean;
    }
  ) {
    const updateData: any = {};

    if (data.title !== undefined) {
      updateData.title = data.title;
      if (!data.slug) {
        updateData.slug =
          data.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9_-]+/g, '-')
            .replace(/(^-|-$)+/g, '') +
          '-' +
          Date.now();
      }
    }
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.desc !== undefined) updateData.desc = data.desc;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.author !== undefined) updateData.author = data.author;
    if (data.showDate !== undefined) updateData.showDate = data.showDate;
    if (data.date !== undefined) updateData.date = data.date;
    if (data.status !== undefined) updateData.status = data.status;

    return await (this.model as any).update({
      where: { id },
      data: updateData,
    });
  }

  async deleteNews(id: string) {
    return await (this.model as any).delete({
      where: { id },
    });
  }
}

export default new NewsRepository();
