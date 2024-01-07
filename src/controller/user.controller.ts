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

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtCommonService,
    private readonly captchaService: CaptchaService,
    private readonly logService: LogService,
  ) {}

  @Get('/page/:page')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async getAllUsers(@Param('page') page: number) {
    const users = await this.userService.findByPage(page, 20);
    return resultHelper.success(users);
  }

  @Get('info')
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
          roleId: 0,
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
