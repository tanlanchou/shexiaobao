import { Controller } from '@nestjs/common';
import { SalesChannelsService } from 'src/service/sales.channels.service';
import { SalesChannels } from 'src/connect/SalesChannels';
import CommonController from './common.controller';

@Controller('sales/channels')
export class SalesChannelsController extends CommonController<SalesChannels> {
  constructor(private readonly salesChannelsService: SalesChannelsService) {
    super(salesChannelsService);
  }
}
