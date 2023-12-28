import { Injectable, Logger } from '@nestjs/common';
import { SmsService } from './sms.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CaptchaService {
    private readonly logger = new Logger(CaptchaService.name);
    private userNumberCodeData = new Map<string, string>();
    constructor(private readonly smsService: SmsService, private readonly configService: ConfigService) { }

    private buildCaptcha() {
        return Math.floor(Math.random() * 9000 + 1000);
    }

    async buildNumberSmsCode(phone: string): Promise<number | undefined> {
        const code = this.buildCaptcha();
        this.smsService.createDysmsapiClient();
        this.logger.log(`尝试发送验证码, 基本信息
            phone: ${phone}, 
            code: ${code}, 
            template: ${this.configService.get<string>('NUMBER_TEMPLATE')}`
        );

        try {
            const result = await this.smsService.sendMessageWithTemplate(
                phone,
                "奢小墩",
                this.configService.get<string>('NUMBER_TEMPLATE'),
                `{"code":"${code}"}`
            );

            debugger;
            this.userNumberCodeData.set(phone, code.toString());

            return code;
        }
        catch (ex) {
            this.logger.error(ex.message)
            this.logger.error(ex.data["Recommend"])
            return;
        }
    }

    validCode(phone: string, code: string) {
        if (this.userNumberCodeData.has(phone) && this.userNumberCodeData.get(phone) === code) {
            this.userNumberCodeData.delete(phone);
            return true;
        }
        else {
            return false;
        }
    }
}