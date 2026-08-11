import newsRepository from '../repositories/news.repository';

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

const sanitizeHtmlContent = (htmlContent?: string | null): string | null => {
  if (!htmlContent || typeof htmlContent !== 'string') return htmlContent ?? null;
  let clean = htmlContent.replace(/src=["']http:\/\/localhost:3000(\/[^"']*)["']/gi, 'src="$1"');
  clean = clean.replace(/src=["']http:\/\/127.0.0.1:3000(\/[^"']*)["']/gi, 'src="$1"');
  return clean;
};

export class NewsService {
  async getAllNews() {
    return await newsRepository.findAll();
  }

  async getActiveNews() {
    return await newsRepository.findAllActive();
  }

  async getNewsDetail(idOrSlug: string) {
    const item = await newsRepository.findByIdOrSlug(idOrSlug);
    if (!item) {
      throw new Error('Bài viết không tồn tại hoặc đã bị ẩn.');
    }
    return item;
  }

  async createNews(data: any) {
    if (data.image) data.image = toRelativePath(data.image);
    if (data.content) data.content = sanitizeHtmlContent(data.content);
    return await newsRepository.createNews(data);
  }

  async updateNews(id: string, data: any) {
    if (data.image) data.image = toRelativePath(data.image);
    if (data.content) data.content = sanitizeHtmlContent(data.content);
    return await newsRepository.updateNews(id, data);
  }

  async deleteNews(id: string) {
    return await newsRepository.deleteNews(id);
  }
}

export default new NewsService();
