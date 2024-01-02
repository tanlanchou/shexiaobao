import { Injectable, Logger } from '@nestjs/common';
import { Power } from 'src/connect/Power';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PowerService extends CommonService<Power> {
  private readonly logger = new Logger(PowerService.name);
  constructor(
    @InjectRepository(Power)
    private powerRepository: Repository<Power>,
  ) {
    super(powerRepository);
  }

  findByKey(key: string): Promise<Power> {
    return this.powerRepository.findOne({ where: { key } });
  }
}
