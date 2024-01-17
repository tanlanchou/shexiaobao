import { Injectable, Logger } from '@nestjs/common';
import { CustomerTag } from 'src/connect/CustomerTag';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerTagService extends CommonService<CustomerTag> {
  private readonly logger = new Logger(CustomerTagService.name);
  constructor(
    @InjectRepository(CustomerTag)
    private customerTagRepository: Repository<CustomerTag>,
  ) {
    super(customerTagRepository);
  }
}
