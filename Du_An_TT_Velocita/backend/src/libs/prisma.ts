import { PrismaClient } from '../generated/prisma/client';

// Khởi tạo Prisma Client Singleton dùng chung cho toàn bộ Repository Layer
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
