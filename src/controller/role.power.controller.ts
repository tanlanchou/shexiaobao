import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RolePowerService } from 'src/service/role.power.service';
import { RolePower } from 'src/connect/RolePower';
import CommonController from './common.controller';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import * as resultHelper from 'src/common/resultHelper';

@Controller('rolepower')
export class RolePowerController extends CommonController<RolePower> {
  constructor(private readonly rolePowerService: RolePowerService) {
    super(rolePowerService);
  }

  @Get("/find/all/:id")
  @UseGuards(JwtAuthGuard)
  async findAllByRoleId(@Param("id") id: number) {
    try {
      const results = await this.rolePowerService.findByRole(id);
      if (!results) return resultHelper.error(500, '没有找到对象');

      return resultHelper.success(results);
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }
}
