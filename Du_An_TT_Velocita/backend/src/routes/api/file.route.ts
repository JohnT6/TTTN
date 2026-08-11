import express, { Request, Response } from 'express';
import path from 'path';
import { uploadMultiple } from '../../middlewares/upload.middleware';

const router = express.Router();

router.post('/upload-multiple', uploadMultiple, (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Vui lòng chọn ít nhất một tệp hình ảnh hoặc video',
      });
      return;
    }

    // Tự động tính toán đường dẫn URL tĩnh tương đối từ thư mục public/ của Backend
    const publicPath = path.join(process.cwd(), 'public');
    const fileUrls = files.map((f) => {
      const relPath = path.relative(publicPath, path.join(f.destination, f.filename));
      return '/' + relPath.replace(/\\/g, '/');
    });

    res.status(200).json({
      success: true,
      message: 'Tải tập tin lên thành công',
      data: fileUrls,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: err.message || 'Lỗi khi tải tập tin lên server',
    });
  }
});

export default router;
