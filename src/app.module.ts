import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthModule } from './auth/jwt-auth.module';
import { LoggerService } from './common/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './connect/user.entity';
import { JwtAuthGuard } from './guard/jwt.auth.guard';
import { AuthGuard } from './guard/auth.guard';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpService } from './common/http';
import { JwtCommonService } from './auth/jwt.common.service';
import { TypeOrmConfigService } from './connect/typeof.config';
import { ScheduleModule } from '@nestjs/schedule';
import { MailService } from './common/mail.service';
import { TempTokenService } from './auth/temp.token.service';
import { TempTokenGuard } from './guard/temp.token.guard';
import { SmsService } from './service/sms.service';
import { CaptchaService } from './service/captcha.service';
import { Captcha } from './connect/Captcha';
import { ProductAttachment } from './connect/ProductAttachment';
import { ProductAttachmentController } from './controller/product.attachment.controller';
import { ProductAttachmentService } from './service/product.attachment.service';
import { PowerService } from './service/power.service';
import { Role } from './connect/Role';
import { RoleService } from './service/role.service';
import { Power } from './connect/Power';
import { RoleController } from './controller/role.controller';
import { PowerController } from './controller/power.controller';

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
    TypeOrmModule.forFeature([User, Captcha, ProductAttachment, Role, Power]),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    AppController,
    UserController,
    ProductAttachmentController,
    RoleController,
    PowerController,
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
    CaptchaService,
    ProductAttachmentService,
    PowerService,
    RoleService,
  ],
})
export class AppModule {}
