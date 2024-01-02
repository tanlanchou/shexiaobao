import { Injectable, Logger } from '@nestjs/common';
import { Role } from 'src/connect/Role';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService extends CommonService<Role> {
  private readonly logger = new Logger(RoleService.name);
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }
}
