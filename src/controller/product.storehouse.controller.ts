import { Controller } from '@nestjs/common';
import { ProductStorehouseService } from 'src/service/product.storehouse.service';
import { ProductStorehouse } from 'src/connect/ProductStorehouse';
import CommonController from './common.controller';

@Controller('product/storehouse')
export class ProductStorehouseController extends CommonController<ProductStorehouse> {
  constructor(
    private readonly productStorehouseService: ProductStorehouseService,
  ) {
    super(productStorehouseService);
  }
}
