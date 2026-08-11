/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseRepository } from './base.repository';

export class SiteSettingRepository extends BaseRepository<any> {
  constructor() {
    super('siteSetting' as any);
  }

  async getAllSettings() {
    const list = await (this.model as any).findMany();
    const settingsMap: Record<string, string> = {
      logo: '/assets/logos/logo.svg',
      primaryColor: '#000000',
      accentColor: '#003882',
      themeMode: 'light',
      showNewArrivals: 'true',
      showBestSellers: 'true',
      showSaleProducts: 'true',
      showNews: 'true',
    };

    list.forEach((item: any) => {
      settingsMap[item.key] = item.value;
    });

    return settingsMap;
  }

  async upsertSetting(key: string, value: string, group = 'interface', description?: string) {
    return await (this.model as any).upsert({
      where: { key },
      update: { value, group, description },
      create: { key, value, group, description },
    });
  }

  async updateBatchSettings(settings: Record<string, any>) {
    const results = [];
    for (const [key, val] of Object.entries(settings)) {
      const stringValue = typeof val === 'object' ? JSON.stringify(val) : String(val);
      const updated = await this.upsertSetting(key, stringValue);
      results.push(updated);
    }
    return results;
  }
}

export default new SiteSettingRepository();
