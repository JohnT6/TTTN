/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../libs/prisma';

export abstract class BaseRepository<T> {
  protected modelName: string;

  constructor(modelName: string) {
    this.modelName = modelName;
  }

  protected get model(): any {
    return (prisma as any)[this.modelName];
  }

  async findAll(options?: any): Promise<T[]> {
    return await this.model.findMany(options);
  }

  async findById(id: string, options?: any): Promise<T | null> {
    return await this.model.findUnique({
      where: { id },
      ...options,
    });
  }

  async create(data: any): Promise<T> {
    return await this.model.create({ data });
  }

  async update(id: string, data: any): Promise<T> {
    return await this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<T> {
    return await this.model.delete({
      where: { id },
    });
  }

  async count(options?: any): Promise<number> {
    return await this.model.count(options);
  }
}
