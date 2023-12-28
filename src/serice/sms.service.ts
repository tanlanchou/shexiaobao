import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Dysmsapi, * as $Dysmsapi from '@alicloud/dysmsapi20180501';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  constructor(private readonly configService: ConfigService) { }

  private dysmsapi: Dysmsapi = null;
  createDysmsapiClient() {
    if (this.dysmsapi === null) {
      this.logger.log(`开始创建短信发送客户端`);
      this.logger.log(`环境变量`);
      this.logger.log(`ACCESS_KEY_ID: ${this.configService.get<string>('ACCESS_KEY_ID')}`);
      this.logger.log(`ACCESS_KEY_SECRET: ${this.configService.get<string>('ACCESS_KEY_SECRET')}`);

      let config = new $OpenApi.Config({
        accessKeyId: this.configService.get<string>('ACCESS_KEY_ID'),
        accessKeySecret: this.configService.get<string>('ACCESS_KEY_SECRET'),
      });
      config.endpoint = 'dysmsapi.aliyuncs.com';
      this.dysmsapi = new Dysmsapi(config);

      this.logger.log(`创建短信发送客户端成功`);
    }
  }

  sendMessageWithTemplate(
    to: string,
    from: string,
    templateCode: string,
    templateParam: string,
  ): Promise<$Dysmsapi.SendMessageWithTemplateResponse> {
    this.logger.log(`开始发送短信`);
    this.logger.log(`参数`);
    this.logger.log(`to: ${to}`);
    this.logger.log(`from: ${from}`);
    this.logger.log(`templateCode: ${templateCode}`);
    this.logger.log(`templateParam: ${templateParam}`);

    let req = new $Dysmsapi.SendMessageWithTemplateRequest({
      to: to,
      templateCode: templateCode,
      templateParam: templateParam,
    });

    return this.dysmsapi.sendMessageWithTemplate(req);
  }
}
