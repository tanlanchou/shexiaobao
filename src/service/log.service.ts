import { Injectable, Logger } from '@nestjs/common';
import { Log } from 'src/connect/Log';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LogService extends CommonService<Log> {
  private readonly logger = new Logger(LogService.name);
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {
    super(logRepository);
  }
}
