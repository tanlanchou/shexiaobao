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
import { ProductAttachmentService } from 'src/service/product.attachment.service';
import { Logger } from '@nestjs/common';
import { ProductAttachmentsDto } from 'src/dto/attachments.dto';
import * as resultHelper from 'src/common/resultHelper';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { PermissionGuard } from 'src/guard/permission.gurad';

@Controller('product/attachments')
export class ProductAttachmentController {
  private readonly logger = new Logger(ProductAttachmentController.name);
  constructor(
    private readonly productAttachmentService: ProductAttachmentService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async create(@Body() aroductAttachmentsDto: ProductAttachmentsDto) {
    try {
      await this.productAttachmentService.create(aroductAttachmentsDto.name);
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
      const result = await this.productAttachmentService.findOne(id);
      if (!result) return resultHelper.error(500, '没有找到附件');

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
      const results = await this.productAttachmentService.findAll();
      if (!results) return resultHelper.error(500, '没有找到附件');

      return resultHelper.success(results);
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async update(
    @Param('id') id: number,
    @Body() aroductAttachmentsDto: ProductAttachmentsDto,
  ) {
    try {
      const result = this.productAttachmentService.update(id, {
        name: aroductAttachmentsDto.name,
      });
      if (!result) return resultHelper.error(500, '没有找到附件');

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
      await this.productAttachmentService.delete(id);
      return resultHelper.success();
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }
}
