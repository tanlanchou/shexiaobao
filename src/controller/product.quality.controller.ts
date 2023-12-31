import { Controller } from '@nestjs/common';
import { ProductQualityService } from 'src/service/product.quality.service';
import { ProductQuality } from 'src/connect/ProductQuality';
import CommonController from './common.controller';

@Controller('product/quality')
export class ProductQualityController extends CommonController<ProductQuality> {
  constructor(private readonly productQualityService: ProductQualityService) {
    super(productQualityService);
  }
}
