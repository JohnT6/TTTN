import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const sanitizeFilename = (originalName: string) => {
  const ext = path.extname(originalName).toLowerCase() || '.jpg';
  const nameWithoutExt = path.basename(originalName, ext);
  const cleanName = nameWithoutExt
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  return `${cleanName || 'file'}-${Date.now()}${ext}`;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Kiểm tra xem file upload là Ảnh hay Video
    const isVideo =
      file.mimetype.startsWith('video/') ||
      ['.mp4', '.webm', '.mov', '.avi', '.mkv'].includes(path.extname(file.originalname).toLowerCase());

    // Nhận diện folder từ query parameter ?folder=, body, hoặc header 'upload-type'
    const folderParam = (
      req.query.folder ||
      req.body?.folder ||
      req.headers['upload-type'] ||
      req.headers['x-upload-folder'] ||
      'products'
    )
      .toString()
      .toLowerCase();

    let subPath = 'products/imgs';

    if (folderParam.includes('banner')) {
      subPath = isVideo ? 'banners/videos' : 'banners/imgs';
    } else if (folderParam.includes('news') || folderParam.includes('blog')) {
      subPath = isVideo ? 'news/videos' : 'news/imgs';
    } else if (folderParam.includes('categor')) {
      subPath = 'categories';
    } else if (folderParam.includes('avatar') || folderParam.includes('user')) {
      subPath = 'avatars';
    } else if (folderParam.includes('logo')) {
      subPath = 'logos';
    } else {
      subPath = isVideo ? 'products/videos' : 'products/imgs';
    }

    const targetDir = path.join(process.cwd(), 'public', 'uploads', subPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    cb(null, targetDir);
  },
  filename: (_req, file, cb) => {
    const cleanFilename = sanitizeFilename(file.originalname);
    cb(null, cleanFilename);
  },
});

export const uploadSingle = multer({ storage }).single('file');
export const uploadMultiple = multer({ storage }).array('files', 15);
