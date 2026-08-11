import { Request, Response } from 'express';
import categoryService from '../services/category.service';

export class CategoryController {
  async getCategories(req: Request, res: Response) {
    try {
      const categories = await categoryService.getActiveCategories();
      return res.json({
        success: true,
        data: categories,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy danh sách danh mục',
      });
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const { name, slug, description, image, status } = req.body;
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Tên danh mục thương hiệu là bắt buộc',
        });
      }

      const category = await categoryService.createCategory({
        name,
        slug,
        description,
        image,
        status: status !== undefined ? Boolean(status) : true,
      });

      return res.status(201).json({
        success: true,
        data: category,
        message: 'Khởi tạo danh mục mới thành công',
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi tạo danh mục mới',
      });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { name, slug, description, image, status } = req.body;

      const category = await categoryService.updateCategory(id, {
        name,
        slug,
        description,
        image,
        status: status !== undefined ? Boolean(status) : undefined,
      });

      return res.json({
        success: true,
        data: category,
        message: 'Cập nhật danh mục thành công',
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi cập nhật danh mục',
      });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      await categoryService.deleteCategory(id);
      return res.json({
        success: true,
        message: 'Xóa danh mục thành công',
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi xóa danh mục',
      });
    }
  }
}

export default new CategoryController();
