import { Injectable, Logger } from '@nestjs/common';
import { ProductMaterial } from 'src/connect/ProductMaterial';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductMaterialService extends CommonService<ProductMaterial> {
  private readonly logger = new Logger(ProductMaterialService.name);
  constructor(
    @InjectRepository(ProductMaterial)
    private productMaterialRepository: Repository<ProductMaterial>,
  ) {
    super(productMaterialRepository);
  }
}
