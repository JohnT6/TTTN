/* eslint-disable @typescript-eslint/no-explicit-any */
import siteSettingRepository from '../repositories/site_setting.repository';
import prisma from '../libs/prisma';

const toRelativePath = (url: any): string | undefined => {
  if (!url || typeof url !== 'string') return undefined;
  let clean = url.trim();
  if (clean.startsWith('http://localhost:3000')) {
    clean = clean.replace('http://localhost:3000', '');
  } else if (clean.startsWith('http://127.0.0.1:3000')) {
    clean = clean.replace('http://127.0.0.1:3000', '');
  } else {
    clean = clean.replace(/^https?:\/\/[^\/]+/i, '');
  }
  return clean;
};

export class SiteSettingService {
  async getSettings() {
    return await siteSettingRepository.getAllSettings();
  }

  /**
   * Cập nhật cấu hình giao diện VÀ đồng bộ trực tiếp cột status = false (0) trong CSDL MySQL cho các sản phẩm / bài viết bị ẩn
   */
  async updateSettings(settings: Record<string, any>) {
    if (settings.logo) settings.logo = toRelativePath(settings.logo);
    if (settings.logoUrl) settings.logoUrl = toRelativePath(settings.logoUrl);

    // 1. Lưu cấu hình key-value vào bảng site_settings
    const results = await siteSettingRepository.updateBatchSettings(settings);

    // 2. Xử lý đồng bộ trực tiếp cột status trong CSDL cho Sản Phẩm & Bài Viết
    try {
      // 2.1 Lấy danh sách ID bị ẩn cụ thể
      let hiddenProductIds: string[] = [];
      if (settings.hiddenProductIds) {
        try {
          hiddenProductIds =
            typeof settings.hiddenProductIds === 'string'
              ? JSON.parse(settings.hiddenProductIds)
              : settings.hiddenProductIds;
        } catch {
          hiddenProductIds = [];
        }
      }

      let hiddenNewsIds: string[] = [];
      if (settings.hiddenNewsIds) {
        try {
          hiddenNewsIds =
            typeof settings.hiddenNewsIds === 'string'
              ? JSON.parse(settings.hiddenNewsIds)
              : settings.hiddenNewsIds;
        } catch {
          hiddenNewsIds = [];
        }
      }

      const isShowNew =
        settings.showNewArrivals === undefined
          ? true
          : settings.showNewArrivals === 'true' || settings.showNewArrivals === true;

      const isShowBest =
        settings.showBestSellers === undefined
          ? true
          : settings.showBestSellers === 'true' || settings.showBestSellers === true;

      const isShowSale =
        settings.showSaleProducts === undefined
          ? true
          : settings.showSaleProducts === 'true' || settings.showSaleProducts === true;

      // 2.2 Đặt tất cả sản phẩm về status = true trước
      await (prisma as any).product.updateMany({
        data: { status: true },
      });

      // Gán status = false cho các sản phẩm bị ẩn cụ thể
      if (Array.isArray(hiddenProductIds) && hiddenProductIds.length > 0) {
        await (prisma as any).product.updateMany({
          where: { id: { in: hiddenProductIds } },
          data: { status: false },
        });
      }

      // Nếu ẩn nguyên khối giảm giá -> Gán status = false cho các sản phẩm đang giảm giá
      if (!isShowSale) {
        await (prisma as any).product.updateMany({
          where: {
            OR: [{ isSale: true }, { salePrice: { gt: 0 } }],
          },
          data: { status: false },
        });
      }

      // Nếu ẩn nguyên khối sản phẩm mới -> Gán status = false cho sản phẩm mới
      if (!isShowNew) {
        await (prisma as any).product.updateMany({
          where: { isNew: true },
          data: { status: false },
        });
      }

      // Nếu ẩn nguyên khối bán chạy -> Gán status = false cho sản phẩm bán chạy
      if (!isShowBest) {
        await (prisma as any).product.updateMany({
          where: { isBest: true },
          data: { status: false },
        });
      }

      // 2.3 Đồng bộ status CSDL cho Bài viết (News)
      await (prisma as any).news.updateMany({
        data: { status: true },
      });

      if (Array.isArray(hiddenNewsIds) && hiddenNewsIds.length > 0) {
        await (prisma as any).news.updateMany({
          where: { id: { in: hiddenNewsIds } },
          data: { status: false },
        });
      }

      if (settings.showNews !== undefined) {
        const isShowNews = settings.showNews === 'true' || settings.showNews === true;
        if (!isShowNews) {
          await (prisma as any).news.updateMany({
            data: { status: false },
          });
        }
      }
    } catch (err: any) {
      throw new Error(`Đồng bộ trạng thái ẩn/hiện CSDL thất bại: ${err?.message || err}`);
    }

    return results;
  }
}

export default new SiteSettingService();
