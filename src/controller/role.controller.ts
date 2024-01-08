import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from 'src/service/role.service';
import { Role } from 'src/connect/Role';
import CommonController from './common.controller';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { PermissionGuard } from 'src/guard/permission.gurad';
import * as resultHelper from 'src/common/resultHelper';
import { RolePowerService } from 'src/service/role.power.service';
import { RolePower } from 'src/connect/RolePower';
import { UserService } from 'src/service/user.service';
import { RoleStatus } from 'src/common/enmu';

@Controller('role')
export class RoleController extends CommonController<Role> {
  constructor(
    private readonly roleService: RoleService,
    private readonly rolePowerService: RolePowerService,
    private readonly userService: UserService,
  ) {
    super(roleService);
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async create(@Body() data: any) {
    const role = new Role();
    role.name = data.name;
    role.createDate = new Date();
    role.status = RoleStatus.other;
    const rolePowers = data.powers;
    try {
      const roleModel = await this.roleService.create(role);
      const rolePowerMoldes: RolePower[] = [];
      for (let i = 0; i < rolePowers.length; i++) {
        const rolePower = new RolePower();
        rolePower.powerName = rolePowers[i];
        rolePower.status = 1;
        rolePower.roleId = roleModel.id;
        rolePowerMoldes.push(rolePower);
      }

      await this.rolePowerService.save(rolePowerMoldes);

      return resultHelper.success();
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async findOne(@Param('id') id: number) {
    try {
      const result = await this.roleService.findOne(id);
      if (!result) return resultHelper.error(500, '没有找到对象');

      const rolePowers = await this.rolePowerService.findByRole(id);

      return resultHelper.success(Object.assign({}, result, { rolePowers }));
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async update(@Param('id') id: number, @Body() data: any) {
    const rolePowers = data.powers;
    try {
      const result = this.roleService.update(id, { name: data.name });

      this.rolePowerService.deleteByRoleId(id);
      const rolePowerMoldes: RolePower[] = [];
      for (let i = 0; i < rolePowers.length; i++) {
        const rolePower = new RolePower();
        rolePower.powerName = rolePowers[i];
        rolePower.status = 1;
        rolePower.roleId = id;
        rolePowerMoldes.push(rolePower);
      }

      await this.rolePowerService.save(rolePowerMoldes);

      return resultHelper.success(result);
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async delete(@Param('id') id: number) {
    try {
      const result = await this.userService.findUserByRoleId(id);
      if (result) {
        return resultHelper.error(500, '删除失败，还有用户在使用这个角色');
      }

      if(result.status == RoleStatus.system) {
        return resultHelper.error(500, '系统角色不能删除');
      }

      await this.rolePowerService.deleteByRoleId(id);
      await this.roleService.delete(id);
      return resultHelper.success();
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }
}
