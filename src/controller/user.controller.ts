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
  Logger,
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserStatus } from '../common/enmu';
import { JwtCommonService } from 'src/auth/jwt.common.service';
import * as resultHelper from 'src/common/resultHelper';
import { AuthGuard } from 'src/guard/auth.guard';
import { CaptchaService } from 'src/service/captcha.service';
import { ValidatePhonePipe } from 'src/pipe/validate.phone.pipe';
import { LoginDto, LoginByCodeDto } from 'src/dto/login.dto';
import { RegisterDto } from 'src/dto/register.dto';
import { LogService } from 'src/service/log.service';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { PermissionGuard } from 'src/guard/permission.gurad';
import { UpdateUserDto } from 'src/dto/update.user.dto';
import { User } from 'src/connect/user';
import { UserSearchDto } from 'src/dto/search.user.dto';
import { request } from 'http';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtCommonService,
    private readonly captchaService: CaptchaService,
    private readonly logService: LogService
  ) { }

  @Get('/page/:page')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async getAllUsers(@Param('page') page: number, @Query() params) {
    const result = await this.userService.findByPage(page, 20, params);
    return resultHelper.success(result);
  }

  @Get('/other/:id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async getUserById(@Param('id') id: number) {
    const result = await this.userService.findUserById(id);
    return resultHelper.success(result);
  }

  @Get('/info')
  @UseGuards(JwtAuthGuard)
  async info(@Req() request) {
    return resultHelper.success(request.user);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.userService.findUserByPhonePWD(
        loginDto.phone,
        loginDto.password,
      );
      if (!user) return resultHelper.error(500, `用户不存在`);

      if (user.status === UserStatus.disable) {
        return resultHelper.error(500, `用户已被禁用`);
      }

      if (user.status === UserStatus.noVerification) {
        return resultHelper.error(500, `请等待管理员通过您的账户`);
      }

      user.lastLoginTime = new Date();
      const newUser = await this.userService.updateUser(user.id, user);
      const token = this.jwtService.generateToken(newUser);

      return resultHelper.success(token, '登录成功');
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Post('/loginByCode')
  async loginByCode(@Body() loginDto: LoginByCodeDto) {
    try {
      const codeResult = await this.captchaService.validCode(
        loginDto.phone,
        loginDto.code,
      );
      if (codeResult) {
        const user = await this.userService.findUserByPhone(loginDto.phone);
        if (!user) return resultHelper.error(500, `用户不存在`);

        if (user.status === UserStatus.disable) {
          return resultHelper.error(500, `用户已被禁用`);
        }

        user.lastLoginTime = new Date();
        const newUser = await this.userService.updateUser(user.id, user);
        const token = this.jwtService.generateToken(newUser);

        return resultHelper.success(token, '登录成功');
      } else {
        return resultHelper.error(500, '验证码错误');
      }
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const codeResult = await this.captchaService.validCode(
        registerDto.phone,
        registerDto.code,
      );
      if (codeResult) {
        let user = await this.userService.findUserByPhone(registerDto.phone);
        if (user) {
          return resultHelper.error(500, '手机号已经注册过, 请更换手机号');
        }

        user = await this.userService.findUserBynickName(registerDto.nickName);
        if (user) {
          return resultHelper.error(500, '昵称已经注册过, 请更换昵称');
        }

        user = await this.userService.createUser({
          phoneNumber: registerDto.phone,
          password: registerDto.password,
          nickname: registerDto.nickName,
          roleId: 99,
          status: UserStatus.noVerification,
        });

        this.logService.create({
          userId: 0,
          name: registerDto.phone,
          desc: `用户${registerDto.phone}注册了`,
          createTime: new Date(),
        });
        return resultHelper.success(user);
      } else {
        return resultHelper.error(500, '验证码错误');
      }
    } catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Put('/other/:id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto, @Req() request) {

    try {
      const userModel = await this.userService.findUserById(id);
      if (!userModel) {
        return resultHelper.error(500, '没有找到用户');
      }

      const userData = new User();
      

      userData.nickname = updateUserDto.nickname;
      if (updateUserDto.icon) userData.icon = updateUserDto.icon;
      if (updateUserDto.status) userData.status = updateUserDto.status;
      if (updateUserDto.roleId) userData.roleId = updateUserDto.roleId;
      this.userService.updateUser(id, userData);

      this.logService.create({
        userId: request.user.id,
        name: request.user.phoneNumber,
        desc: `
        用户(${request.user.nickname}) 更新了用户${userModel.nickname}(${userModel.phoneNumber})的基本信息, 
        包含${userModel.nickname},${userModel.icon},${userModel.phoneNumber},${userModel.roleId}
        `,
        createTime: new Date(),
      });
      return resultHelper.success();
    }
    catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Put('/update')
  @UseGuards(JwtAuthGuard)
  async updateOther(@Req() request, @Body() updateUserDto: UpdateUserDto) {

    const userModel = request.user;
    userModel.nickname = updateUserDto.nickname;
    if (updateUserDto.icon) userModel.icon = updateUserDto.icon;

    this.userService.updateUser(userModel.id, userModel);
  }

  @Post('/forget')
  async forget(@Body() registerDto: RegisterDto) {
    try {
      const codeResult = await this.captchaService.validCode(
        registerDto.phone,
        registerDto.code,
      );
      if (codeResult) {
        const user = await this.userService.findUserByPhone(registerDto.phone);
        if (!user) {
          return resultHelper.error(500, '没有找到用户');
        }

        user.password = registerDto.password;
        this.userService.updateUser(user.id, user);

        this.logService.create({
          userId: 0,
          name: registerDto.phone,
          desc: `用户${registerDto.phone}重置密码`,
          createTime: new Date(),
        });

        return resultHelper.success();
      } else {
        return resultHelper.error(500, '验证码错误');
      }
    } catch (error) {
      return resultHelper.error(500, error.message);
    }
  }

  @Get('/sms/:phone')
  @UsePipes(ValidatePhonePipe)
  async sendNumberSms(@Param('phone') phone: string) {
    this.captchaService.buildNumberSmsCode(phone);
    this.logService.create({
      userId: 0,
      name: phone,
      desc: `用户${phone}发送了短信`,
      createTime: new Date(),
    });
    return resultHelper.success();
  }

  @Get('/number/:phone')
  @UsePipes(ValidatePhonePipe)
  async number(@Param('phone') phone: string) {
    const code = await this.captchaService.buildNumber(phone);
    this.logService.create({
      userId: 0,
      name: phone,
      desc: `用户${phone}发送了短信`,
      createTime: new Date(),
    });
    return resultHelper.success(code);
  }
}
