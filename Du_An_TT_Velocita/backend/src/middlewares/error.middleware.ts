import { Request, Response, NextFunction } from 'express';
import { ErrorWithWStatus } from '../types/error';

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const error: ErrorWithWStatus = new Error(`Đường dẫn API '${req.originalUrl}' không tồn tại.`);
  error.status = 404;
  next(error);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlingMiddleware = (err: ErrorWithWStatus, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Lỗi hệ thống Server';

  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
};