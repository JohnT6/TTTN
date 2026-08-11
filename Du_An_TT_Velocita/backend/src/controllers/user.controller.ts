import { Request, Response } from 'express';
import userServices from '../services/user.services';

export class UserController {
  async getUsers(_req: Request, res: Response) {
    try {
      const users = await userServices.getUsers();
      return res.json({
        success: true,
        data: users,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy danh sách người dùng',
      });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const user = await userServices.getUserById(id);
      return res.json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message || 'Không tìm thấy thông tin người dùng',
      });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { fullName, email, phone, password, role, avatar, address, status } = req.body;

      if (!fullName || !email) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng nhập Họ tên và Email người dùng.',
        });
      }

      const newUser = await userServices.createUser({
        fullName,
        email,
        phone,
        password,
        role,
        avatar,
        address,
        status: status !== undefined ? Boolean(status) : true,
      });

      return res.status(201).json({
        success: true,
        data: newUser,
        message: 'Tạo tài khoản người dùng mới thành công',
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Không thể tạo tài khoản người dùng mới.',
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { fullName, email, phone, password, role, avatar, address, status } = req.body;

      const updatedUser = await userServices.updateUser(id, {
        fullName,
        email,
        phone,
        password,
        role,
        avatar,
        address,
        status: status !== undefined ? Boolean(status) : undefined,
      });

      return res.status(200).json({
        success: true,
        data: updatedUser,
        message: 'Cập nhật tài khoản người dùng thành công',
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Không thể cập nhật tài khoản người dùng.',
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      await userServices.deleteUser(id);
      return res.status(200).json({
        success: true,
        message: 'Xóa tài khoản người dùng thành công',
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Không thể xóa tài khoản người dùng này.',
      });
    }
  }
}

export default new UserController();
