import { Controller } from '@nestjs/common';
import { RoleService } from 'src/service/role.service';
import { Role } from 'src/connect/Role';
import CommonController from './common.controller';

@Controller('role')
export class RoleController extends CommonController<Role> {
  constructor(private readonly roleService: RoleService) {
    super(roleService);
  }
}
