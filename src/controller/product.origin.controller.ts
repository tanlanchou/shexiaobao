import { Controller } from '@nestjs/common';
import { ProductOriginService } from 'src/service/product.origin.service';
import { ProductOrigin } from 'src/connect/ProductOrigin';
import CommonController from './common.controller';

@Controller('product/origin')
export class ProductOriginController extends CommonController<ProductOrigin> {
  constructor(private readonly productOriginService: ProductOriginService) {
    super(productOriginService);
  }
}
