/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseRepository } from './base.repository';

class BannerRepository extends BaseRepository<any> {
  constructor() {
    super('banner' as any);
  }

  async findAllBanners() {
    return await (this.model as any).findMany({
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  async findById(id: string) {
    return await (this.model as any).findUnique({
      where: { id },
    });
  }

  async findActiveHeroBanners() {
    return await (this.model as any).findMany({
      where: {
        status: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  async createBanner(data: {
    title?: string;
    subtitle?: string;
    image?: string;
    videoUrl?: string;
    mediaType?: 'IMAGE' | 'VIDEO' | 'BOTH';
    link?: string;
    buttonText?: string;
    position?: string;
    sortOrder?: number;
    status?: boolean;
  }) {
    return await (this.model as any).create({
      data: {
        title: data.title || '',
        subtitle: data.subtitle || null,
        image: data.image || '',
        videoUrl: data.videoUrl || null,
        mediaType: data.mediaType || (data.videoUrl && data.image ? 'BOTH' : data.videoUrl ? 'VIDEO' : 'IMAGE'),
        link: data.link || null,
        buttonText: data.buttonText || null,
        position: data.position || 'HOME_HERO',
        sortOrder: data.sortOrder ?? 0,
        status: data.status ?? true,
      },
    });
  }

  async updateBanner(
    id: string,
    data: {
      title?: string;
      subtitle?: string;
      image?: string;
      videoUrl?: string;
      mediaType?: 'IMAGE' | 'VIDEO' | 'BOTH';
      link?: string;
      buttonText?: string;
      position?: string;
      sortOrder?: number;
      status?: boolean;
    }
  ) {
    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.subtitle !== undefined) updateData.subtitle = data.subtitle;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.videoUrl !== undefined) updateData.videoUrl = data.videoUrl;
    if (data.mediaType !== undefined) updateData.mediaType = data.mediaType;
    if (data.link !== undefined) updateData.link = data.link;
    if (data.buttonText !== undefined) updateData.buttonText = data.buttonText;
    if (data.position !== undefined) updateData.position = data.position;
    if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;
    if (data.status !== undefined) updateData.status = data.status;

    return await (this.model as any).update({
      where: { id },
      data: updateData,
    });
  }

  async deleteBanner(id: string) {
    return await (this.model as any).delete({
      where: { id },
    });
  }
}

export default new BannerRepository();
