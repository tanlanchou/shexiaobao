import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from 'src/service/order.service';
import { Order } from 'src/connect/Order';
import CommonController from './common.controller';
import * as resultHelper from 'src/common/resultHelper';
import { OrderDto } from 'src/dto/order.dto';
import { ProductInfoService } from 'src/service/product.info.service';
import { OrderProductService } from 'src/service/order.product.service';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { PermissionGuard } from 'src/guard/permission.gurad';
import { OrderProduct } from 'src/connect/OrderProduct';
import { ProductInfo } from 'src/connect/ProductInfo';
import { OrderState, ProductInfoState } from 'src/common/enmu';
import { UserService } from 'src/service/user.service';
import { CustomerService } from 'src/service/customer.service';
import { SalesChannelsService } from 'src/service/sales.channels.service';
import { createPermissionGurad } from 'src/guard/permission.param.guard';

@Controller('order')
export class OrderController extends CommonController<Order> {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductInfoService,
    private readonly orderProductService: OrderProductService,
    private readonly userService: UserService,
    private readonly customerService: CustomerService,
    private readonly salesChannelsService: SalesChannelsService,
  ) {
    super(orderService);
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async create(@Body() data: OrderDto) {
    try {
      //检查产品状态
      const productIdsArray = data.productIds
        .split(',')
        .map((id) => Number(id));
      const productsArray: ProductInfo[] = [];
      for (let i = 0; i < productIdsArray.length; i++) {
        const productId = productIdsArray[i];
        const productModel = await this.productService.findOne(productId);
        if (!productModel) {
          return resultHelper.error(500, '产品不存在');
        } else if (productModel.status !== ProductInfoState.InStoreHouse) {
          return resultHelper.error(500, '产品状态不正确');
        }
        productsArray.push(productModel);
      }

      const order = new Order();
      order.customerId = data.customerId;
      order.salesChannelsId = data.salesChannelsId;
      order.sendStatus = data.sendStatus;
      order.amountReceivable = data.amountReceivable;
      order.account = data.account;
      order.money = data.money;
      order.img = data.img;
      order.saler = data.saler;
      order.hepler = data.hepler;
      order.saleTime = new Date(data.saleTime);
      order.desc = data.desc;
      order.status = OrderState.normal;

      const orderModel = await this.orderService.create(order);

      for (let i = 0; i < productIdsArray.length; i++) {
        const orderProductModel = new OrderProduct();
        orderProductModel.orderId = orderModel.id;
        orderProductModel.productId = productIdsArray[i];
        orderProductModel.createDate = new Date();
        await this.orderProductService.create(orderProductModel);
      }

      for (let i = 0; i < productsArray.length; i++) {
        const productModel = productsArray[i];
        productModel.status = ProductInfoState.OutStoreHouse;
        await this.productService.update(productModel.id, productModel);
      }

      return resultHelper.success();
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async findOne(@Param('id') id: number) {
    try {
      const orderModel = await this.orderService.findOne(id);
      if (!orderModel) {
        return resultHelper.error(500, '订单不存在');
      }

      let result = {};

      const productInfos = [];
      const orderProductModels =
        await this.orderProductService.getProductByOrderId(id);
      if (orderProductModels && orderProductModels.length > 0) {
        const productIds = orderProductModels.map((item) => item.productId);
        for (let i = 0; i < productIds.length; i++) {
          const productInfoModel = await this.productService.findOne(
            productIds[i],
          );
          if (!productInfoModel) {
            this.logger.error(
              `订单找不到产品, 订单ID: ${id}, 产品ID: ${productIds[i]}`,
            );
          } else {
            productInfos.push(productInfoModel);
          }
        }
      }

      result = Object.assign({}, orderModel, { products: productInfos });

      const customerModel = await this.customerService.findOne(
        orderModel.customerId,
      );
      if (!customerModel) {
        this.logger.error(`订单找不到客户, 订单ID: ${id}`);
      } else {
        result = Object.assign({}, result, { customer: customerModel });
      }

      const salesChannelsModel = await this.salesChannelsService.findOne(
        orderModel.salesChannelsId,
      );
      if (!salesChannelsModel) {
        this.logger.error('订单找不到销售渠道, 订单ID: ${id}');
      } else {
        result = Object.assign({}, result, {
          salesChannels: salesChannelsModel,
        });
      }

      const salerModel = await this.userService.findUserById(orderModel.saler);
      if (!salerModel) {
        this.logger.error('订单找不到主要销售人员, 订单ID: ${id}');
      } else {
        result = Object.assign({}, result, { saler: salerModel });
      }

      if (orderModel.hepler !== undefined && orderModel.hepler !== null) {
        const heplerModel = await this.userService.findUserById(
          orderModel.hepler,
        );
        if (!heplerModel) {
          this.logger.error('订单找不到辅助销售人员, 订单ID: ${id}');
        } else {
          result = Object.assign({}, result, { hepler: heplerModel });
        }
      }

      return resultHelper.success(result);
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, createPermissionGurad('PermissionGuard_findAll'))
  async findAllByUser(@Req() request) {
    try {
      const user = request.user;
      if (!user) return resultHelper.error(500, '没有登录');

      const results = await this.orderService.findAllByUser(user.id);
      if (!results) return resultHelper.error(500, '没有找到对象');

      return resultHelper.success(results);
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Get('/find/all/:page')
  @UseGuards(JwtAuthGuard, createPermissionGurad('PermissionGuard_findAll'))
  async findAllOrderByPage(@Param('page') page: number, @Query() params) {
    const result = this.orderService.findAllOrderByPage(page, 20, params);
    return resultHelper.success(result);
  }

  @Put('/status/cancel/:id')
  @UseGuards(JwtAuthGuard, createPermissionGurad('PermissionGuard_update'))
  async cancel(@Param('id') id: number) {
    try {
      const orderModel = await this.orderService.findOne(id);
      if (!orderModel) {
        return resultHelper.error(500, '订单不存在');
      }

      const orderProductModels =
        await this.orderProductService.getProductByOrderId(id);
      if (!orderProductModels) {
        return resultHelper.error(500, '订单产品信息错误');
      }

      if (orderProductModels.length > 0) {
        const productIds = orderProductModels.map((item) => item.productId);
        for (let i = 0; i < productIds.length; i++) {
          const productId = productIds[i];
          const productModel = await this.productService.findOne(productId);
          if (!productModel) {
            return resultHelper.error(500, '关联的产品信息错误');
          }
          productModel.status = ProductInfoState.InStoreHouse;
          await this.productService.update(productModel.id, productModel);
        }
      }

      orderModel.status = OrderState.cancel;
      await this.orderService.update(id, orderModel);
      return resultHelper.success();
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Put('/status/return/:id')
  @UseGuards(JwtAuthGuard, createPermissionGurad('PermissionGuard_update'))
  async returnOrder(@Param('id') id: number) {
    try {
      const orderModel = await this.orderService.findOne(id);
      if (!orderModel) {
        return resultHelper.error(500, '订单不存在');
      }

      const orderProductModels =
        await this.orderProductService.getProductByOrderId(id);
      if (!orderProductModels) {
        return resultHelper.error(500, '订单产品信息错误');
      }

      if (orderProductModels.length > 0) {
        const productIds = orderProductModels.map((item) => item.productId);
        for (let i = 0; i < productIds.length; i++) {
          const productId = productIds[i];
          const productModel = await this.productService.findOne(productId);
          if (!productModel) {
            return resultHelper.error(500, '关联的产品信息错误');
          }
          productModel.status = ProductInfoState.InStoreHouse;
          await this.productService.update(productModel.id, productModel);
        }
      }

      orderModel.status = OrderState.return;
      await this.orderService.update(id, orderModel);
      return resultHelper.success();
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async delete(@Param('id') id: number) {
    try {
      await this.orderService.delete(id);
      await this.orderProductService.deleteAllByOrderId(id);
      return resultHelper.success();
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }
}
