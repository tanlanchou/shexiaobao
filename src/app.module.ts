import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthModule } from './auth/jwt-auth.module';
import { LoggerService } from './common/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './connect/user.entity';
import { JwtAuthGuard } from './guard/jwt.auth.guard';
import { AuthGuard } from './guard/auth.guard';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpService } from './common/http';
import { JwtCommonService } from './auth/jwt.common.service';
import { TypeOrmConfigService } from './connect/typeof.config';
import { ScheduleModule } from '@nestjs/schedule';
import { MailService } from './common/mail.service';
import { TempTokenService } from './auth/temp.token.service';
import { TempTokenGuard } from './guard/temp.token.guard';
import { SmsService } from './serice/sms.service';
import { CaptchaService } from './serice/captcha.service';

@Module({
  imports: [
    JwtAuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${!!process.env.NODE_ENV ? 'dev' : 'prod'}`,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    AppController,
    UserController,
  ],
  providers: [
    AuthGuard,
    HttpService,
    ConfigService,
    AppService,
    LoggerService,
    JwtCommonService,
    UserService,
    JwtAuthModule,
    JwtAuthGuard,
    MailService,
    TempTokenService,
    TempTokenGuard,
    SmsService,
    CaptchaService
  ],
})
export class AppModule { }
