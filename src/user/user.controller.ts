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
  Logger
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../connect/user.entity';
import { UserStatus } from '../common/enmu';
import { JwtCommonService } from 'src/auth/jwt.common.service';
import * as resultHelper from 'src/common/resultHelper';
import { AuthGuard } from 'src/guard/auth.guard';
import { CaptchaService } from 'src/serice/captcha.service';
import { ValidatePhonePipe } from 'src/pipe/validate.phone.pipe';
import { LoginDto, LoginByCodeDto } from 'src/dto/login.dto';
import { RegisterDto } from 'src/dto/register.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtCommonService,
    private readonly captchaService: CaptchaService
  ) { }

  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers() {
    const users = this.userService.findAllUsers();
    return resultHelper.success(users);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.userService.findUserByPhonePWD(loginDto.phone, loginDto.password);
      if (!user) return resultHelper.error(500, `用户不存在`);

      if (user.status === UserStatus.disable) {
        return resultHelper.error(500, `用户已被禁用`);
      }

      user.lastLoginTime = new Date();
      const newUser = await this.userService.updateUser(user.id, user);
      const token = this.jwtService.generateToken(newUser);

      return resultHelper.success(token, '登录成功');
    }
    catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Post('/loginByCode')
  async loginByCode(@Body() loginDto: LoginByCodeDto) {
    try {
      if (this.captchaService.validCode(loginDto.phone, loginDto.code)) {
        const user = await this.userService.findUserByPhone(loginDto.phone);
        if (!user) return resultHelper.error(500, `用户不存在`);

        if (user.status === UserStatus.disable) {
          return resultHelper.error(500, `用户已被禁用`);
        }

        user.lastLoginTime = new Date();
        const newUser = await this.userService.updateUser(user.id, user);
        const token = this.jwtService.generateToken(newUser);

        return resultHelper.success(token, '登录成功');
      }
      else {
        return resultHelper.error(500, '验证码错误');
      }
    }
    catch (ex) {
      this.logger.error(ex.message);
      return resultHelper.error(500, ex.message);
    }
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      if (this.captchaService.validCode(registerDto.phone, registerDto.code)) {
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
        });
        return resultHelper.success(user);
      }
      else {
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
      if (this.captchaService.validCode(registerDto.phone, registerDto.code)) {
        let user = await this.userService.findUserByPhone(registerDto.phone);
        if (!user) {
          return resultHelper.error(500, '没有找到用户');
        }

        user.password = registerDto.password;
        this.userService.updateUser(user.id, user);

        return resultHelper.success();
      }
      else {
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
    return resultHelper.success();
  }
}
