import prisma from '../libs/prisma';

export const adminServices = {
  getStats: async () => {
    // 1. Tổng số sản phẩm
    const totalProducts = await prisma.product.count();

    // 2. Tổng số danh mục
    const totalCategories = await prisma.category.count();

    // 3. Tổng số đơn hàng
    const totalOrders = await prisma.order.count();

    // 4. Tổng số người dùng CHỈ CÓ ROLE LÀ USER (không tính ADMIN)
    const totalUsers = await prisma.user.count({
      where: {
        role: 'USER',
      },
    });

    // 5. Thống kê số lượng theo isNew, isBest, isSale từ DB MySQL (map từ is_new, is_best, is_sale)
    const newArrivals = await prisma.product.count({
      where: { isNew: true },
    });

    const bestSellers = await prisma.product.count({
      where: { isBest: true },
    });

    const onSale = await prisma.product.count({
      where: { isSale: true },
    });

    // 6. Lấy 4 sản phẩm mới nhất thực tế từ DB
    const recentProducts = await prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
      },
    });

    return {
      totalProducts,
      totalCategories,
      totalOrders,
      totalUsers,
      newArrivals,
      bestSellers,
      onSale,
      recentProducts,
    };
  },
};
