import { Injectable, Logger } from '@nestjs/common';
import { ProductStorehouse } from 'src/connect/ProductStorehouse';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductStorehouseService extends CommonService<ProductStorehouse> {
  private readonly logger = new Logger(ProductStorehouseService.name);
  constructor(
    @InjectRepository(ProductStorehouse)
    private productStorehouseRepository: Repository<ProductStorehouse>,
  ) {
    super(productStorehouseRepository);
  }
}
