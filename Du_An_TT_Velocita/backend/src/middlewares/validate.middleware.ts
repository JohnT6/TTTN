import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateBody = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path.length > 0) {
            const fieldName = String(issue.path[0]);
            if (!fieldErrors[fieldName]) {
              fieldErrors[fieldName] = issue.message;
            }
          }
        });

        const firstErrorMsg = Object.values(fieldErrors)[0] || 'Dữ liệu không hợp lệ';

        res.status(400).json({
          success: false,
          message: firstErrorMsg,
          errors: fieldErrors,
        });
        return;
      }
      next(error);
    }
  };
};
