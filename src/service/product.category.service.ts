import { Injectable, Logger } from '@nestjs/common';
import { ProductCategory } from 'src/connect/ProductCategory';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryService extends CommonService<ProductCategory> {
  private readonly logger = new Logger(ProductCategoryService.name);
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {
    super(productCategoryRepository);
  }
}
