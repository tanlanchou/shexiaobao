import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductInfoService } from 'src/service/product.info.service';
import { ProductInfo } from 'src/connect/ProductInfo';
import CommonController from './common.controller';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { PermissionGuard } from 'src/guard/permission.gurad';
import * as resultHelper from 'src/common/resultHelper';
import { ProductInfoDto } from 'src/dto/product.info.dto';
import { createPermissionGurad } from 'src/guard/permission.param.guard';
import { ProductTypeService } from 'src/service/product.type.service';
import { ProductCategoryService } from 'src/service/product.category.service';
import { ProductQualityService } from 'src/service/product.quality.service';
import { ProductOriginService } from 'src/service/product.origin.service';
import { ProductStorehouseService } from 'src/service/product.storehouse.service';
import { UserService } from 'src/service/user.service';

let arr = ["productMaterial", "productTag", "productAttach"]
@Controller('product/info')
export class ProductInfoController extends CommonController<ProductInfo> {
  constructor(private readonly productInfoService: ProductInfoService, private readonly productTypeService: ProductTypeService, private readonly productCategoryService: ProductCategoryService, private readonly productQualityService: ProductQualityService, private readonly productOriginService: ProductOriginService, private readonly productStorehouseService: ProductStorehouseService, private readonly userService: UserService) {
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

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async findOne(@Param('id') id: number) {
    try {
      const result = await this.productInfoService.findOne(id);
      if (!result) return resultHelper.error(500, '没有找到对象');

      let obj: any = {};
      if (result.productTypeId !== undefined)
        obj.productType = await this.productTypeService.findOne(result.productTypeId);

      if (result.productCategoryId !== undefined)
        obj.productCategory = await this.productCategoryService.findOne(result.productCategoryId);

      if (result.productQualityId !== undefined)
        obj.productQuality = await this.productQualityService.findOne(result.productQualityId);

      if (result.productOriginId !== undefined)
        obj.productOrigin = await this.productOriginService.findOne(result.productOriginId);

      if (result.productStoreId !== undefined)
        obj.productStore = await this.productStorehouseService.findOne(result.productStoreId);

      if (result.buyer !== undefined)
        obj.user = await this.userService.findUserById(result.buyer);

      return resultHelper.success(Object.assign({}, result, obj));
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
        } else if (arr.includes(key)) {
          model[key] = typeof data[key] == 'string' ? data[key] : data[key].join(',');
        } else {
          model[key] = data[key];
        }
      }
      model.workflow = 2;
      model.status = 1;
      const result = await this.productInfoService.create(model);
      return resultHelper.success(result);
    } catch (ex) {
      return resultHelper.error(500, ex.message);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async update(@Param('id') id: number, @Body() data: any) {
    try {
      const model = new ProductInfo();

      for (const key in data) {
        if (data[key] === null || data[key] === undefined) continue;
        if (key == 'arrivalTime' || key == 'inTime') {
          model[key] = new Date(data[key]);
        }
        else if (arr.includes(key)) {
          model[key] = typeof data[key] == 'string' ? data[key] : data[key].join(',');
        }
        else {
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
