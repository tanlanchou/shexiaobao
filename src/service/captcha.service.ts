import { Injectable, Logger } from '@nestjs/common';
import { SmsService } from './sms.service';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Captcha } from '../connect/Captcha';
import { Repository } from 'typeorm';

@Injectable()
export class CaptchaService {
  private readonly logger = new Logger(CaptchaService.name);
  constructor(
    private readonly smsService: SmsService,
    private readonly configService: ConfigService,
    @InjectRepository(Captcha) private captchaRepository: Repository<Captcha>,
  ) {}

  private buildCaptcha() {
    return Math.floor(Math.random() * 9000 + 1000);
  }

  async updateCaptcha(phone: string, code: string): Promise<void> {
    const captchaResult = await this.captchaRepository.findOne({
      where: {
        phoneNumber: phone,
      },
    });

    if (!captchaResult) {
      const newCaptcha = this.captchaRepository.create({
        phoneNumber: phone,
        code: code,
        updateTime: new Date(),
      });
      this.captchaRepository.save(newCaptcha);
    } else {
      captchaResult.code = code;
      captchaResult.updateTime = new Date();
      this.captchaRepository.update(captchaResult.id, captchaResult);
    }
  }

  async buildNumber(phone: string): Promise<number | undefined> {
    const code = this.buildCaptcha();
    await this.updateCaptcha(phone, code.toString());
    return code;
  }

  async buildNumberSmsCode(phone: string): Promise<number | undefined> {
    const code = this.buildCaptcha();

    try {
      this.smsService.createDysmsapiClient();
      this.logger.log(`尝试发送验证码, 基本信息
                phone: ${phone}, 
                code: ${code}, 
                template: ${this.configService.get<string>(
                  'NUMBER_TEMPLATE',
                )}`);

      await this.smsService.sendMessageWithTemplate(
        phone,
        '来自奢小墩',
        this.configService.get<string>('NUMBER_TEMPLATE'),
        `{"code":"${code}"}`,
      );

      await this.updateCaptcha(phone, code.toString());

      return code;
    } catch (ex) {
      this.logger.error(ex.message);
      return;
    }
  }

  async validCode(phone: string, code: string) {
    const result = await this.captchaRepository.findOne({
      where: {
        phoneNumber: phone,
      },
    });

    if (result) {
      if (
        result.code == code &&
        result.updateTime >
          new Date(
            Date.now() -
              this.configService.get<number>('MAX_SMS_TIME') * 60 * 1000,
          )
      ) {
        await this.captchaRepository.delete(result.id);
        return true;
      }
      return false;
    } else {
      return false;
    }
  }
}
