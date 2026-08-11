import { Request, Response } from 'express';
import { bannerService } from '../services/banner.service';

export const bannerController = {
  index: async (req: Request, res: Response) => {
    try {
      const banners = await bannerService.getAllBanners();
      res.status(200).json({
        success: true,
        data: banners,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        success: false,
        message: err.message || 'Không thể lấy danh sách Banner.',
      });
    }
  },

  show: async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const banner = await bannerService.getBannerById(id);
      if (!banner) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy Banner này.',
        });
      }
      res.status(200).json({
        success: true,
        data: banner,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        success: false,
        message: err.message || 'Lỗi khi lấy thông tin Banner.',
      });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { title, subtitle, image, videoUrl, mediaType, link, buttonText, position, sortOrder, status } = req.body;

      // Banner chỉ cần có 1 trong 2: Ảnh hoặc Video
      if (!image && !videoUrl) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng tải lên ít nhất 1 hình ảnh hoặc 1 video MP4 cho Banner.',
        });
      }

      const banner = await bannerService.createBanner({
        title: title || '',
        subtitle,
        image: image || '',
        videoUrl,
        mediaType,
        link,
        buttonText,
        position: position || 'HOME_HERO',
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : 0,
        status: status !== undefined ? Boolean(status) : true,
      });

      res.status(201).json({
        success: true,
        data: banner,
        message: 'Khởi tạo Banner mới thành công',
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        success: false,
        message: err.message || 'Không thể tạo Banner mới.',
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const { title, subtitle, image, videoUrl, mediaType, link, buttonText, position, sortOrder, status } = req.body;

      const banner = await bannerService.updateBanner(id, {
        title: title !== undefined ? title : undefined,
        subtitle,
        image,
        videoUrl,
        mediaType,
        link,
        buttonText,
        position,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : undefined,
        status: status !== undefined ? Boolean(status) : undefined,
      });

      res.status(200).json({
        success: true,
        data: banner,
        message: 'Cập nhật Banner thành công',
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        success: false,
        message: err.message || 'Không thể cập nhật Banner.',
      });
    }
  },

  destroy: async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      await bannerService.deleteBanner(id);
      res.status(200).json({
        success: true,
        message: 'Xóa Banner thành công',
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        success: false,
        message: err.message || 'Không thể xóa Banner.',
      });
    }
  },
};
