import { Request, Response } from 'express';
import newsService from '../services/news.service';

export class NewsController {
  async getNews(req: Request, res: Response) {
    try {
      const isAdmin = req.query.admin === 'true';
      const newsList = isAdmin ? await newsService.getAllNews() : await newsService.getActiveNews();
      return res.json({
        success: true,
        data: newsList,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy danh sách tin tức',
      });
    }
  }

  async getNewsDetail(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const newsItem = await newsService.getNewsDetail(id);
      return res.json({
        success: true,
        data: newsItem,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message || 'Không tìm thấy bài viết tin tức',
      });
    }
  }

  async createNews(req: Request, res: Response) {
    try {
      const { title, slug, category, image, desc, content, author, showDate, date, status } = req.body;

      if (!title) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng nhập tiêu đề bài viết tin tức.',
        });
      }

      const newsItem = await newsService.createNews({
        title,
        slug,
        category,
        image,
        desc,
        content,
        author,
        showDate: showDate !== undefined ? Boolean(showDate) : false,
        date,
        status: status !== undefined ? Boolean(status) : true,
      });

      return res.status(201).json({
        success: true,
        data: newsItem,
        message: 'Khởi tạo bài viết tin tức thành công',
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Không thể tạo bài viết tin tức mới.',
      });
    }
  }

  async updateNews(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { title, slug, category, image, desc, content, author, showDate, date, status } = req.body;

      const newsItem = await newsService.updateNews(id, {
        title,
        slug,
        category,
        image,
        desc,
        content,
        author,
        showDate: showDate !== undefined ? Boolean(showDate) : undefined,
        date,
        status: status !== undefined ? Boolean(status) : undefined,
      });

      return res.status(200).json({
        success: true,
        data: newsItem,
        message: 'Cập nhật bài viết tin tức thành công',
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Không thể cập nhật bài viết tin tức.',
      });
    }
  }

  async deleteNews(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      await newsService.deleteNews(id);
      return res.status(200).json({
        success: true,
        message: 'Xóa bài viết tin tức thành công',
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Không thể xóa bài viết tin tức này.',
      });
    }
  }
}

export default new NewsController();
