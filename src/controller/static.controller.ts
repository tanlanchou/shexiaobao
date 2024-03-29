import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { PermissionGuard } from 'src/guard/permission.gurad';
import { ConfigService } from '@nestjs/config';

@Controller('static')
export class StaticController {
  private readonly logger = new Logger(StaticController.name);

  constructor(private readonly configService: ConfigService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return {
      data: `${this.configService.get<string>('HOST')}/${this.configService.get<string>('STATIC_NAME') || "static"}/${file.filename}`,
      errno: 0
    };
  }
}
