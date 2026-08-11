import { Request, Response, NextFunction } from 'express';
import { productServices } from '../services/product.service';
import { productQueryData, createProductData, updateProductData } from '../types/product';

export const productController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await productServices.getAllProducts(req.query as productQueryData);
      res.status(200).json({
        success: true,
        message: 'Lấy danh sách sản phẩm thành công',
        data: data.items,
        pagination: data.pagination,
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req: Request, res: Response) => {
    try {
      const idOrSlug = req.params.id || req.params.slug || '';
      const product = await productServices.getProductDetail(idOrSlug);
      res.status(200).json({
        success: true,
        message: 'Lấy chi tiết sản phẩm thành công',
        data: product,
      });
    } catch (error) {
      const err = error as Error;
      res.status(404).json({
        success: false,
        message: err.message || 'Không tìm thấy sản phẩm',
        data: null,
      });
    }
  },

  store: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newProduct = await productServices.createProduct(req.body as createProductData);
      res.status(201).json({
        success: true,
        message: 'Tạo sản phẩm thành công',
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id || '';
      const updatedProduct = await productServices.updateProduct(id, req.body as updateProductData);
      res.status(200).json({
        success: true,
        message: 'Cập nhật sản phẩm thành công',
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id || '';
      await productServices.deleteProduct(id);
      res.status(200).json({
        success: true,
        message: 'Xóa sản phẩm thành công',
      });
    } catch (error) {
      next(error);
    }
  },
};
