import { Controller } from '@nestjs/common';
import { OriginService } from 'src/service/origin.service';
import { Origin } from 'src/connect/Origin';
import CommonController from './common.controller';

@Controller('origin')
export class OriginController extends CommonController<Origin> {
  constructor(private readonly originService: OriginService) {
    super(originService);
  }
}
