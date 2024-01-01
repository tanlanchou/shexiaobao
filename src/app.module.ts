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
import { ProductCategoryController } from './controller/product.category.controller';
import { ProductCategoryService } from './service/product.category.service';
import { ProductCategory } from './connect/ProductCategory';
import { ProductMaterial } from './connect/ProductMaterial';
import { ProductMaterialController } from './controller/product.material.controller';
import { ProductMaterialService } from './service/product.material.service';
import { ProductOriginService } from './service/product.origin.service';
import { ProductQualityService } from './service/product.quality.service';
import { ProductStorehouseService } from './service/product.storehouse.service';
import { ProductTagService } from './service/product.tag.service';
import { ProductTypeService } from './service/product.type.service';
import { ProductOrigin } from './connect/ProductOrigin';
import { ProductQuality } from './connect/ProductQuality';
import { ProductStorehouse } from './connect/ProductStorehouse';
import { ProductTag } from './connect/ProductTag';
import { ProductType } from './connect/ProductType';
import { ProductOriginController } from './controller/product.origin.controller';
import { ProductQualityController } from './controller/product.quality.controller';
import { ProductStorehouseController } from './controller/product.storehouse.controller';
import { ProductTagController } from './controller/product.tag.controller';
import { ProductTypeController } from './controller/product.type.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { StaticController } from './controller/static.controller';
import { ServeStaticModule } from '@nestjs/serve-static';

console.log(path.join(__dirname, '..', '/uploads'));
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
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '/uploads'),
      serveRoot: '/static',
    }),
    TypeOrmModule.forFeature([
      User,
      Captcha,
      Role,
      Power,
      ProductAttachment,
      ProductCategory,
      ProductMaterial,
      ProductOrigin,
      ProductQuality,
      ProductStorehouse,
      ProductTag,
      ProductType,
    ]),
    ScheduleModule.forRoot(),
    MulterModule.register({
      storage: diskStorage({
        // 指定文件存储目录
        destination: path.join(__dirname, '..', '/uploads'),
        // 通过时间戳来重命名上传的文件名
        filename: (_, file, callback) => {
          const fileName = `${
            new Date().getTime() + path.extname(file.originalname)
          }`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [
    AppController,
    UserController,
    RoleController,
    PowerController,
    ProductAttachmentController,
    ProductCategoryController,
    ProductMaterialController,
    ProductOriginController,
    ProductQualityController,
    ProductStorehouseController,
    ProductTagController,
    ProductTypeController,
    StaticController,
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
    PowerService,
    RoleService,
    ProductAttachmentService,
    ProductCategoryService,
    ProductMaterialService,
    ProductOriginService,
    ProductQualityService,
    ProductStorehouseService,
    ProductTagService,
    ProductTypeService,
  ],
})
export class AppModule {}
