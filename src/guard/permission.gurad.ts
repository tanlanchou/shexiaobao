import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RolePowerService } from 'src/service/role.power.service';
import { RoleService } from 'src/service/role.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly rolePowerService: RolePowerService,
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
    const result = await this.rolePowerService.findByRoleAndPower(
      user.roleId,
      permissionKey,
    );
    if (!result) return false;
    if (result && result.status === 1) return true;
    return false;
  }
}
