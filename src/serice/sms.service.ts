import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Util, * as $Util from '@alicloud/tea-util';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  constructor(private readonly configService: ConfigService) { }

  private client: Dysmsapi20170525 = null;
  createDysmsapiClient() {
    if (this.client === null) {

      this.logger.log(`开始创建短信发送客户端`);
      this.logger.log(`环境变量`);
      this.logger.log(`ACCESS_KEY_ID: ${this.configService.get<string>('ACCESS_KEY_ID')}`);
      this.logger.log(`ACCESS_KEY_SECRET: ${this.configService.get<string>('ACCESS_KEY_SECRET')}`);

      let config = new $OpenApi.Config({
        accessKeyId: this.configService.get<string>('ACCESS_KEY_ID'),
        accessKeySecret: this.configService.get<string>('ACCESS_KEY_SECRET'),
      });
      config.endpoint = 'dysmsapi.aliyuncs.com';
      this.client = new Dysmsapi20170525(config);

      this.logger.log(`创建短信发送客户端成功`);

    }
  }

  async sendMessageWithTemplate(
    to: string,
    signName: string,
    templateCode: string,
    templateParam: string,
  ) {
    this.logger.log(`开始发送短信`);
    this.logger.log(`参数`);
    this.logger.log(`to: ${to}`);
    this.logger.log(`signName: ${signName}`);
    this.logger.log(`templateCode: ${templateCode}`);
    this.logger.log(`templateParam: ${templateParam}`);

    let sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      phoneNumbers: to,
      signName: signName,
      templateCode: templateCode,
      templateParam: templateParam,
    });

    let runtime = new $Util.RuntimeOptions({});
    await this.client.sendSmsWithOptions(sendSmsRequest, runtime);

  }
}
