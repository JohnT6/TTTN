/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<any> {
  constructor() {
    super('user' as any);
  }

  async findAll() {
    return await (this.model as any).findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        avatar: true,
        address: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return await (this.model as any).findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return await (this.model as any).findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        avatar: true,
        address: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async createUser(data: {
    fullName: string;
    email: string;
    phone?: string;
    password?: string;
    role?: 'SUPERADMIN' | 'ADMIN' | 'EDITOR' | 'USER';
    avatar?: string;
    address?: string;
    status?: boolean;
  }) {
    const rawPassword = data.password || '123456';
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    return await (this.model as any).create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || null,
        password: hashedPassword,
        role: data.role || 'USER',
        avatar: data.avatar || '/assets/imgs/user_default.jpg',
        address: data.address || null,
        status: data.status ?? true,
      },
    });
  }

  async updateUser(
    id: string,
    data: {
      fullName?: string;
      email?: string;
      phone?: string;
      password?: string;
      role?: 'SUPERADMIN' | 'ADMIN' | 'EDITOR' | 'USER';
      avatar?: string;
      address?: string;
      status?: boolean;
    }
  ) {
    const updateData: any = {};
    if (data.fullName !== undefined) updateData.fullName = data.fullName;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.role !== undefined) updateData.role = data.role;
    if (data.avatar !== undefined) updateData.avatar = data.avatar;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.status !== undefined) updateData.status = data.status;

    if (data.password && data.password.trim() !== '') {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return await (this.model as any).update({
      where: { id },
      data: updateData,
    });
  }

  async deleteUser(id: string) {
    return await (this.model as any).delete({
      where: { id },
    });
  }
}

export default new UserRepository();
