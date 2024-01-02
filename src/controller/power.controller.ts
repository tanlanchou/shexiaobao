import { Controller } from '@nestjs/common';
import { PowerService } from 'src/service/power.service';
import { Power } from 'src/connect/Power';
import CommonController from './common.controller';

@Controller('power')
export class PowerController extends CommonController<Power> {
  constructor(private readonly powerService: PowerService) {
    super(powerService);
  }
}
