import { Request, Response, NextFunction } from 'express';
import { authServices } from '../services/auth.services';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { loginData, registerData } from '../types/auth';

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const body = req.body as registerData;
      const result = await authServices.register(body);

      res.status(201).json({
        success: true,
        message: 'Đăng ký tài khoản thành công',
        data: result,
      });
    } catch (error) {
      const err = error as Error;
      res.status(400).json({
        success: false,
        message: err.message || 'Đăng ký thất bại',
      });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const body = req.body as loginData;
      const result = await authServices.login(body);

      res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công',
        data: result,
      });
    } catch (error) {
      const err = error as Error;
      res.status(400).json({
        success: false,
        message: err.message || 'Đăng nhập thất bại',
      });
    }
  },

  profile: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = (req.user?.id as string) || '';
      const user = await authServices.profile(userId);

      res.status(200).json({
        success: true,
        message: 'Lấy thông tin tài khoản thành công',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  logout: async (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'Đăng xuất thành công',
    });
  },

  forgotPassword: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({
          success: false,
          message: 'Vui lòng nhập địa chỉ Email',
        });
        return;
      }

      const result = await authServices.forgotPassword(email);
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      const err = error as Error;
      res.status(400).json({
        success: false,
        message: err.message || 'Quên mật khẩu thất bại',
      });
    }
  },
};