import userRepository from '../repositories/user.repository';

const toRelativePath = (url: any): string | undefined => {
  if (!url || typeof url !== 'string') return undefined;
  let clean = url.trim();
  if (clean.startsWith('http://localhost:3000')) {
    clean = clean.replace('http://localhost:3000', '');
  } else if (clean.startsWith('http://127.0.0.1:3000')) {
    clean = clean.replace('http://127.0.0.1:3000', '');
  } else {
    clean = clean.replace(/^https?:\/\/[^\/]+/i, '');
  }
  return clean;
};

export const userServices = {
  getUsers: async () => {
    return await userRepository.findAll();
  },
  getUserById: async (id: string) => {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('Người dùng không tồn tại.');
    }
    return user;
  },
  getUserByEmail: async (email: string) => {
    return await userRepository.findByEmail(email);
  },
  createUser: async (data: any) => {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error('Email này đã được sử dụng bởi người dùng khác.');
    }
    if (data.avatar) data.avatar = toRelativePath(data.avatar);
    return await userRepository.createUser(data);
  },
  updateUser: async (id: string, data: any) => {
    if (data.avatar) data.avatar = toRelativePath(data.avatar);
    return await userRepository.updateUser(id, data);
  },
  deleteUser: async (id: string) => {
    return await userRepository.deleteUser(id);
  },
};

export default userServices;
