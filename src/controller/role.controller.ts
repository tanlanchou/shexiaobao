import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from 'src/service/role.service';
import { Logger } from '@nestjs/common';
import { RoleDto } from 'src/dto/role.dto';
import * as resultHelper from 'src/common/resultHelper';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { PermissionGuard } from 'src/guard/permission.gurad';

@Controller('role')
export class RoleController {
  private readonly logger = new Logger(RoleController.name);
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async create(@Body() roleDto: RoleDto) {
    try {
      await this.roleService.create(roleDto.name, roleDto.number);
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
      const result = await this.roleService.findOne(id);
      if (!result) return resultHelper.error(500, '没有找到角色');

      return resultHelper.success(result);
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async findAll() {
    try {
      const results = await this.roleService.findAll();
      if (!results) return resultHelper.error(500, '没有找到角色');

      return resultHelper.success(results);
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async update(@Param('id') id: number, @Body() roleDto: RoleDto) {
    try {
      const result = this.roleService.update(id, {
        name: roleDto.name,
        number: roleDto.number,
      });
      if (!result) return resultHelper.error(500, '没有找到角色');

      return resultHelper.success(result);
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async delete(@Param('id') id: number) {
    try {
      await this.roleService.delete(id);
      return resultHelper.success();
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }
}
