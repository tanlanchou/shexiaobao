import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LogService } from 'src/service/log.service';
import { Log } from 'src/connect/Log';
import CommonController from './common.controller';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { PermissionGuard } from 'src/guard/permission.gurad';
import * as resultHelper from 'src/common/resultHelper';

@Controller('log')
export class LogController extends CommonController<Log> {
  constructor(private readonly logService: LogService) {
    super(logService);
  }
}
