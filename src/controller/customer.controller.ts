import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from 'src/service/customer.service';
import { Customer } from 'src/connect/Customer';
import CommonController from './common.controller';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { PermissionGuard } from 'src/guard/permission.gurad';
import * as resultHelper from 'src/common/resultHelper';
import { OriginService } from 'src/service/origin.service';
import { UserService } from 'src/service/user.service';

@Controller('customer')
export class CustomerController extends CommonController<Customer> {
  constructor(private readonly customerService: CustomerService, private readonly originService: OriginService, private readonly userService: UserService) {
    super(customerService);
  }


  @Post()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async create(@Body() data: any) {
    try {
      await this.customerService.create(data);
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
      let result = await this.customerService.findOne(id);
      if (!result) return resultHelper.error(500, '没有找到对象');

      if (result.customerOriginId !== undefined && result.customerOriginId !== null) {
        const m = await this.originService.findOne(result.customerOriginId);
        if (m) {
          result = Object.assign({}, result, { customerOrigin: m });
        }

      }

      if (result.maintenanceMan !== undefined && result.maintenanceMan !== null) {
        const m = await this.userService.findUserById(result.maintenanceMan);
        if (m) {
          result = Object.assign({}, result, { user: m });
        }
      }

      return resultHelper.success(result);
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }
}
