import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: Record<string, unknown>;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ success: false, message: 'Vui lòng đăng nhập để thực hiện thao tác này.' });
    return;
  }
  next();
};