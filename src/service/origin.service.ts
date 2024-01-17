import { Injectable, Logger } from '@nestjs/common';
import { Origin } from 'src/connect/Origin';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OriginService extends CommonService<Origin> {
  private readonly logger = new Logger(OriginService.name);
  constructor(
    @InjectRepository(Origin)
    private originRepository: Repository<Origin>,
  ) {
    super(originRepository);
  }
}
