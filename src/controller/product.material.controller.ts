import { Controller } from '@nestjs/common';
import { ProductMaterialService } from 'src/service/product.material.service';
import { ProductMaterial } from 'src/connect/ProductMaterial';
import CommonController from './common.controller';

@Controller('product/material')
export class ProductMaterialController extends CommonController<ProductMaterial> {
  constructor(private readonly productMaterialService: ProductMaterialService) {
    super(productMaterialService);
  }
}
