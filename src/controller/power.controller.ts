import { Controller, Get, UseGuards } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as resultHelper from 'src/common/resultHelper';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { PowerService } from 'src/service/power.service';

@Controller('power')
export class PowerController {
  private readonly logger = new Logger(PowerController.name);
  constructor(private readonly powerService: PowerService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      const results = await this.powerService.findAll();
      if (!results) return resultHelper.error(500, '没有找到权限');

      return resultHelper.success(results);
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }
}
