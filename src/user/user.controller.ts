import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../connect/user.entity';
import { UserStatus } from '../common/enmu';
import { JwtCommonService } from 'src/auth/jwt.common.service';
import { ValidateEmailPipe } from 'src/pipe/validate.email.pipe';
import * as resultHelper from 'src/common/resultHelper';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtCommonService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers() {
    const users = this.userService.findAllUsers();
    return resultHelper.success(users);
  }

  // @Get('/:id')
  // @UseGuards(AuthGuard)
  // async getUserById(@Param('id') id: number) {
  //   const user = this.userService.findUserById(id);
  //   return resultHelper.success(user);
  // }

  // @Put(':id')
  // @UseGuards(AuthGuard)
  // async updateUser(@Param('id') id: number, @Body() userData: Partial<User>) {
  //   try {
  //     const user = this.userService.updateUser(id, userData);
  //     return resultHelper.success(user);
  //   } catch (error) {
  //     return resultHelper.error(500, error.message);
  //   }
  // }

  // @Delete(':id')
  // @UseGuards(AuthGuard)
  // async deleteUser(@Param('id') id: number) {
  //   try {
  //     this.userService.deleteUser(id);
  //     return resultHelper.success();
  //   } catch (error) {
  //     return resultHelper.error(500, error.message);
  //   }
  // }

  // @Put(':id/status')
  // @UseGuards(AuthGuard)
  // async updateUserStatus(
  //   @Param('id') id: number,
  //   @Body('status') status: number,
  // ): Promise<User | undefined> {
  //   return this.userService.updateUserStatus(id, status);
  // }

  // @Put(':id/active/time')
  // @UseGuards(AuthGuard)
  // async updateUserActiveTime(
  //   @Param('id') id: number,
  // ): Promise<User | undefined> {
  //   return this.userService.updateUserActiveTime(id);
  // }

  // @Get('check/email/:email')
  // @UsePipes(ValidateEmailPipe)
  // async checkEmail(@Param('email') email: string) {
  //   const user = await this.userService.findUserByEmail(email);
  //   return !user;
  // }
}
