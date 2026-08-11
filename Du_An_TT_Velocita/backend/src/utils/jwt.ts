import jwt from 'jsonwebtoken';

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('Thiếu cấu hình biến môi trường JWT_SECRET trong file .env!');
  }
  return secret;
};

const JWT_EXPIRES_IN = '7d';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): unknown => {
  try {
    return jwt.verify(token, getJwtSecret());
  } catch {
    return null;
  }
};
