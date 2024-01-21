import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductInfoService } from 'src/service/product.info.service';
import { ProductInfo } from 'src/connect/ProductInfo';
import CommonController from './common.controller';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { PermissionGuard } from 'src/guard/permission.gurad';
import * as resultHelper from 'src/common/resultHelper';
import { ProductInfoDto } from 'src/dto/product.info.dto';
import { createPermissionGurad } from 'src/guard/permission.param.guard';

@Controller('product/info')
export class ProductInfoController extends CommonController<ProductInfo> {
  constructor(private readonly productInfoService: ProductInfoService) {
    super(productInfoService);
  }

  @Post('/search/all/:page')
  @UseGuards(JwtAuthGuard, createPermissionGurad('findAll', true))
  async findAllByPage(@Param('page') page: number, @Body() params) {
    try {
      const results = await this.productInfoService.search(page, 15, params);
      if (!results) return resultHelper.error(500, '没有找到对象');

      return resultHelper.success(results);
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
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
