import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Power } from 'src/connect/Power';
import { Repository } from 'typeorm';

@Injectable()
export class PowerService {
  private readonly logger = new Logger(PowerService.name);
  constructor(
    @InjectRepository(Power)
    private powerRepository: Repository<Power>,
  ) {}

  async create(name: string, n: bigint, key: string): Promise<Power> {
    const power = new Power();
    power.name = name;
    power.key = key;
    power.number = n;
    await this.powerRepository.save(power);
    return power;
  }

  async findOne(key: string): Promise<Power | null> {
    return this.powerRepository.findOne({ where: { key } });
  }

  async findAll(): Promise<Power[]> {
    return this.powerRepository.find();
  }

  async update(id: string, data: any): Promise<Power> {
    const power = await this.findOne(id);
    if (power) {
      for (const key in data) {
        power.name = data[key];
      }

      await this.powerRepository.save(power);
      return power;
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    await this.powerRepository.delete(id);
  }
}
