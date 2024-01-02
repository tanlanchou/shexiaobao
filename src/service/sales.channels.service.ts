import { Injectable, Logger } from '@nestjs/common';
import { SalesChannels } from 'src/connect/SalesChannels';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SalesChannelsService extends CommonService<SalesChannels> {
  private readonly logger = new Logger(SalesChannelsService.name);
  constructor(
    @InjectRepository(SalesChannels)
    private salesChannelsRepository: Repository<SalesChannels>,
  ) {
    super(salesChannelsRepository);
  }
}
