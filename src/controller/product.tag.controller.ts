import { Controller } from '@nestjs/common';
import { ProductTagService } from 'src/service/product.tag.service';
import { ProductTag } from 'src/connect/ProductTag';
import CommonController from './common.controller';

@Controller('product/tag')
export class ProductTagController extends CommonController<ProductTag> {
  constructor(private readonly productTagService: ProductTagService) {
    super(productTagService);
  }
}
