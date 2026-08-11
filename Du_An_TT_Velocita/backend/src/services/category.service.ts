import categoryRepository from '../repositories/category.repository';

const toRelativePath = (url?: string | null): string | undefined => {
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

export class CategoryService {
  async getActiveCategories() {
    return await categoryRepository.findAll();
  }

  async createCategory(data: { name: string; slug?: string; description?: string; image?: string; status?: boolean }) {
    if (data.image) {
      data.image = toRelativePath(data.image);
    }
    return await categoryRepository.createCategory(data);
  }

  async updateCategory(id: string, data: { name?: string; slug?: string; description?: string; image?: string; status?: boolean }) {
    if (data.image) {
      data.image = toRelativePath(data.image);
    }
    return await categoryRepository.updateCategory(id, data);
  }

  async deleteCategory(id: string) {
    return await categoryRepository.deleteCategory(id);
  }
}

export default new CategoryService();
