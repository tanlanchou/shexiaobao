import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';

import { Logger } from '@nestjs/common';
import * as resultHelper from 'src/common/resultHelper';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { PermissionGuard } from 'src/guard/permission.gurad';
import CommonService from 'src/service/common.service';

export default class CommonController<T> {
  protected readonly logger = new Logger(CommonController.name);
  private readonly common = null;
  constructor(common: CommonService<T>) {
    this.common = common;
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async create(@Body() data: any) {
    try {
      await this.common.create(data);
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
      const result = await this.common.findOne(id);
      if (!result) return resultHelper.error(500, '没有找到对象');

      return resultHelper.success(result);
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async findAll(@Req() request) {
    try {
      const results = await this.common.findAll(request.query);
      if (!results) return resultHelper.error(500, '没有找到对象');

      return resultHelper.success(results);
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async update(@Param('id') id: number, @Body() data: any) {
    try {
      const result = this.common.update(id, data);
      if (!result) return resultHelper.error(500, '没有找到对象');

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
      await this.common.delete(id);
      return resultHelper.success();
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }
}
