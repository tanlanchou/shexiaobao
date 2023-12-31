import { Injectable, Logger } from '@nestjs/common';
import { ProductOrigin } from 'src/connect/ProductOrigin';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductOriginService extends CommonService<ProductOrigin> {
  private readonly logger = new Logger(ProductOriginService.name);
  constructor(
    @InjectRepository(ProductOrigin)
    private productOriginRepository: Repository<ProductOrigin>,
  ) {
    super(productOriginRepository);
  }
}
