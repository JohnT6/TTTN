import prisma from '../libs/prisma';
import { loginData, registerData } from '../types/auth';
import { hashPassword, verifyPassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';

export const authServices = {
  register: async (data: registerData) => {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new Error('Email này đã được đăng ký.');
    }

    const newUser = await prisma.user.create({
      data: {
        fullName: data.name,
        email: data.email,
        password: hashPassword(data.password),
        role: 'USER',
        avatar: '/assets/imgs/user_default.jpg',
      },
    });

    const token = generateToken({ id: newUser.id, email: newUser.email, role: newUser.role });

    return { user: newUser, token };
  },

  existingEmail: async (email: string) => {
    return await prisma.user.count({
      where: { email },
    });
  },

  login: async ({ email, password }: loginData) => {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error('Email hoặc mật khẩu không chính xác.');
    }

    const isMatch = verifyPassword(password, user.password);
    if (!isMatch) {
      throw new Error('Email hoặc mật khẩu không chính xác.');
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    return { user, token };
  },

  profile: async (id: string) => {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        address: true,
        createdAt: true,
      },
    });
  },

  forgotPassword: async (email: string) => {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error('Email này chưa được đăng ký trên hệ thống.');
    }

    return {
      message: 'Yêu cầu đặt lại mật khẩu đã được xử lý. Vui lòng kiểm tra hộp thư email của bạn.',
    };
  },
};
