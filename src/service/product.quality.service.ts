import { Injectable, Logger } from '@nestjs/common';
import { ProductQuality } from 'src/connect/ProductQuality';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductQualityService extends CommonService<ProductQuality> {
  private readonly logger = new Logger(ProductQualityService.name);
  constructor(
    @InjectRepository(ProductQuality)
    private productQualityRepository: Repository<ProductQuality>,
  ) {
    super(productQualityRepository);
  }
}
