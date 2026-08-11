import { Request, Response } from 'express';
import siteSettingService from '../services/site_setting.service';

export class SiteSettingController {
  async getSettings(_req: Request, res: Response) {
    try {
      const settings = await siteSettingService.getSettings();
      return res.json({
        success: true,
        data: settings,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy cấu hình giao diện',
      });
    }
  }

  async updateSettings(req: Request, res: Response) {
    try {
      const settings = req.body;
      if (!settings || typeof settings !== 'object') {
        return res.status(400).json({
          success: false,
          message: 'Dữ liệu cấu hình gửi lên không hợp lệ.',
        });
      }

      await siteSettingService.updateSettings(settings);

      const updatedSettings = await siteSettingService.getSettings();

      return res.json({
        success: true,
        data: updatedSettings,
        message: 'Cập nhật cấu hình giao diện thành công',
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi cập nhật cấu hình giao diện',
      });
    }
  }
}

export default new SiteSettingController();
