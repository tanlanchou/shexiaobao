import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CustomerTagService } from 'src/service/customer.tag.service';
import { CustomerTag } from 'src/connect/CustomerTag';
import CommonController from './common.controller';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { PermissionGuard } from 'src/guard/permission.gurad';
import * as resultHelper from 'src/common/resultHelper';

@Controller('customer/tag/tag')
export class CustomerTagController extends CommonController<CustomerTag> {
  constructor(private readonly customerTagService: CustomerTagService) {
    super(customerTagService);
  }

  
  @Post()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async create(@Body() data: any) {
    try {
      await this.customerTagService.create(data);
      return resultHelper.success();
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

}
