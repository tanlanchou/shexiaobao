import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidatePhonePipe implements PipeTransform {
  transform(value: any) {
    const chinesePhoneNumberRegex = /^1[3456789]\d{9}$/;

    if (!chinesePhoneNumberRegex.test(value)) {
      throw new BadRequestException('Invalid phone format');
    }
    return value;
  }
}
