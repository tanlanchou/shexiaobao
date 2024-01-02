import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from 'src/service/customer.service';
import { Customer } from 'src/connect/Customer';
import CommonController from './common.controller';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { PermissionGuard } from 'src/guard/permission.gurad';
import * as resultHelper from 'src/common/resultHelper';

@Controller('customer')
export class CustomerController extends CommonController<Customer> {
  constructor(private readonly customerService: CustomerService) {
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

}
