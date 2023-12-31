import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PowerService } from 'src/service/power.service';
import { RoleService } from 'src/service/role.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly powerService: PowerService,
    private readonly roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      console.error(`user is null`);
      return false;
    }

    const className = context.getClass().name; // 获取类名
    const methodName = context.getHandler().name; // 获取方法名
    const permissionKey = className + '_' + methodName;
    const result = await this.powerService.findOne(permissionKey);
    if (!result) return false;
    const keyNumber = result.number;
    const role = await this.roleService.findOne(user.roleId);
    if (!role) return false;
    if ((BigInt(role.number) & BigInt(keyNumber)) == BigInt(keyNumber)) {
      return true;
    }
    return false;
  }
}
