import { Injectable, Logger } from '@nestjs/common';
import { ProductType } from 'src/connect/ProductType';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductTypeService extends CommonService<ProductType> {
  private readonly logger = new Logger(ProductTypeService.name);
  constructor(
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {
    super(productTypeRepository);
  }
}
