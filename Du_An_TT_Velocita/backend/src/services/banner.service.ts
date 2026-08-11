import bannerRepository from '../repositories/banner.repository';

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

export const bannerService = {
  getAllBanners: async () => {
    return await bannerRepository.findAllBanners();
  },

  getBannerById: async (id: string) => {
    return await bannerRepository.findById(id);
  },

  getHeroBanners: async () => {
    return await bannerRepository.findActiveHeroBanners();
  },

  createBanner: async (data: any) => {
    if (data.image) data.image = toRelativePath(data.image);
    if (data.videoUrl) data.videoUrl = toRelativePath(data.videoUrl);
    return await bannerRepository.createBanner(data);
  },

  updateBanner: async (id: string, data: any) => {
    if (data.image) data.image = toRelativePath(data.image);
    if (data.videoUrl) data.videoUrl = toRelativePath(data.videoUrl);
    return await bannerRepository.updateBanner(id, data);
  },

  deleteBanner: async (id: string) => {
    return await bannerRepository.deleteBanner(id);
  },
};
