import { Repository } from 'typeorm';

export default class CommonService<T> {
  // 定义mapper属性，由子类具体实现赋值
  constructor(readonly mapper: Repository<T>) {}

  async create(data: any): Promise<T> {
    const result = await this.mapper.save(data);
    return result;
  }

  async save(data: T[]): Promise<T[]> {
    const result = await this.mapper.save(data);
    return result;
  }

  async findOne(id: number): Promise<T | null> {
    return await this.mapper.createQueryBuilder().where({ id }).getOne();
  }

  async findAll(): Promise<T[]> {
    return await this.mapper.find();
  }

  async findByPage(
    page: number,
    limit: number,
  ): Promise<{ results: T[]; total: number }> {
    const [results, total] = await this.mapper.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      results,
      total,
    };
  }

  async update(id: number, data: any): Promise<T> {
    const result = await this.findOne(id);
    if (result) {
      for (const key in data) {
        result[key] = data[key];
      }

      await this.mapper.save(result);
      return result;
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    await this.mapper.delete(id);
  }
}
