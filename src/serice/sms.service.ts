import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Dysmsapi, * as $Dysmsapi from '@alicloud/dysmsapi20180501';

@Injectable()
export class SmsService {
  constructor(private readonly configService: ConfigService) {}

  private dysmsapi: Dysmsapi = null;
  createDysmsapiClient() {
    if (this.dysmsapi === null) {
      let config = new $OpenApi.Config({
        accessKeyId: this.configService.get<string>('ACCESS_KEY_ID'),
        accessKeySecret: this.configService.get<string>('ACCESS_KEY_SECRET'),
      });
      config.endpoint = 'dysmsapi.ap-southeast-1.aliyuncs.com';
      this.dysmsapi = new Dysmsapi(config);
    }
  }

  sendMessageWithTemplate(
    to: string,
    from: string,
    templateCode: string,
    templateParam: string,
  ): Promise<$Dysmsapi.SendMessageWithTemplateResponse> {
    let req = new $Dysmsapi.SendMessageWithTemplateRequest({
      to: to,
      from: from,
      templateCode: templateCode,
      templateParam: templateParam,
    });

    return this.dysmsapi.sendMessageWithTemplate(req);
  }
}
