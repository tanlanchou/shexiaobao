import { CanActivate, ExecutionContext, Injectable, mixin } from '@nestjs/common';
import { RolePowerService } from 'src/service/role.power.service';

export const createPermissionGurad = (powerString: string, isPlus: boolean = false) => {
  
  @Injectable()
  class PermissionGuard implements CanActivate {
    constructor(public readonly rolePowerService: RolePowerService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      try {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
          console.error(`user is null`);
          return false;
        }

        let permissionKey = powerString;
        if(isPlus) {
          const className = context.getClass().name; // 获取类名
          permissionKey = className + "_" + powerString;
        }
        const result = await this.rolePowerService.findByRoleAndPower(
          user.roleId,
          permissionKey,
        );
        if (!result) return false;
        if (result && result.status === 1) return true;
        return false;
      }
      catch (error) {
        throw error;
      }
    }
  }
  const gurad = mixin(PermissionGuard);
  return gurad;
};
// @Injectable()
// export
// }
