import { Controller } from '@nestjs/common';
import { ProductCategoryService } from 'src/service/product.category.service';
import { ProductCategory } from 'src/connect/ProductCategory';
import CommonController from './common.controller';

@Controller('product/category')
export class ProductCategoryController extends CommonController<ProductCategory> {
  constructor(private readonly productCategoryService: ProductCategoryService) {
    super(productCategoryService);
  }
}
