import { Injectable, Logger } from '@nestjs/common';
import { ProductInfo } from 'src/connect/ProductInfo';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductInfoService extends CommonService<ProductInfo> {
  private readonly logger = new Logger(ProductInfoService.name);
  constructor(
    @InjectRepository(ProductInfo)
    private productInfoRepository: Repository<ProductInfo>,
  ) {
    super(productInfoRepository);
  }
}
