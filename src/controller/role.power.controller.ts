import { Controller } from '@nestjs/common';
import { RolePowerService } from 'src/service/role.power.service';
import { RolePower } from 'src/connect/RolePower';
import CommonController from './common.controller';

@Controller('rolepower')
export class RolePowerController extends CommonController<RolePower> {
  constructor(private readonly rolePowerService: RolePowerService) {
    super(rolePowerService);
  }
}
