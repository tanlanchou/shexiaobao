import { Controller } from '@nestjs/common';
import { ProductTypeService } from 'src/service/product.type.service';
import { ProductType } from 'src/connect/ProductType';
import CommonController from './common.controller';

@Controller('product/type')
export class ProductTypeController extends CommonController<ProductType> {
  constructor(private readonly productTypeService: ProductTypeService) {
    super(productTypeService);
  }
}
