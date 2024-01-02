import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductInfoService } from 'src/service/product.info.service';
import { ProductInfo } from 'src/connect/ProductInfo';
import CommonController from './common.controller';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { PermissionGuard } from 'src/guard/permission.gurad';
import * as resultHelper from 'src/common/resultHelper';
import { Logger } from 'winston';
import { ProductInfoDto } from 'src/dto/product.info.dto';

@Controller('product/info')
export class ProductInfoController extends CommonController<ProductInfo> {
  constructor(private readonly productInfoService: ProductInfoService) {
    super(productInfoService);
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async create(@Body() data: ProductInfoDto) {
    try {
      const model = new ProductInfo();
      for (const key in data) {
        if (key == 'arrivalTime' || key == 'inTime') {
          model[key] = new Date(data[key]);
        } else {
          model[key] = data[key];
        }
      }
      const result = await this.productInfoService.create(model);
      return resultHelper.success(result);
    } catch (ex) {
      return resultHelper.error(500, ex.message);
    }
  }


  @Put(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async update(@Param('id') id: number, @Body() data: ProductInfoDto) {
    try {
      const model = new ProductInfo();
      for (const key in data) {
        if (key == 'arrivalTime' || key == 'inTime') {
          model[key] = new Date(data[key]);
        } else {
          model[key] = data[key];
        }
      }
      const result = this.productInfoService.update(id, model);
      if (!result) return resultHelper.error(500, '没有找到对象');

      return resultHelper.success(result);
    } catch (ex) {
      return resultHelper.error(500, ex.message);
    }
  }
}
