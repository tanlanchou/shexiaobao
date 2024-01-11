import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MenuService } from 'src/service/menu.service';
import { Menu } from 'src/connect/Menu';
import CommonController from './common.controller';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { PermissionGuard } from 'src/guard/permission.gurad';
import * as resultHelper from 'src/common/resultHelper';

@Controller('menu')
export class MenuController extends CommonController<Menu> {
  constructor(private readonly menuService: MenuService) {
    super(menuService);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      const results = await this.menuService.findAll();
      if (!results) return resultHelper.error(500, '没有找到对象');

      return resultHelper.success(results);
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }
}
