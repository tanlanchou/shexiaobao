import { Repository } from 'typeorm';

export default class CommonService<T> {
  // 定义mapper属性，由子类具体实现赋值
  constructor(readonly mapper: Repository<T>) { }

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

  async findAll(params?: any): Promise<T[]> {
    let query = this.mapper.createQueryBuilder();

    if (params && params.name) {
      // 如果 params 中有 name 属性，则执行 like 查询
      query = query.andWhere('name like :name', { name: `%${params.name}%` });
    }

    // 执行查询
    return await query.getMany();
  }

  async findByPage(
    page: number,
    limit: number,
    params: { key: string; value: any; isLike: boolean }[] = [],
  ): Promise<{ results: T[]; total: number }> {
    const queryBuilder = this.mapper.createQueryBuilder();

    // 遍历 params 的数组，根据 isLike 判断是否使用 like 查询
    params.forEach(({ key, value, isLike }) => {
      if (isLike) {
        queryBuilder.andWhere(`${key} LIKE :${key}`, { [key]: `%${value}%` });
      } else {
        queryBuilder.andWhere(`${key} = :${key}`, { [key]: value });
      }
    });

    const [results, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

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
