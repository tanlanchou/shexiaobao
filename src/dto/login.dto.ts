import { IsNotEmpty, IsString, Length, IsPhoneNumber, Matches } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @Matches(/^1[3456789]\d{9}$/, { message: '手机号不正确' })
    phone: string;

    @IsNotEmpty()
    @IsString()
    @Length(32, 32)
    password: string;
}

export class LoginByCodeDto {
    @IsNotEmpty()
    @Matches(/^1[3456789]\d{9}$/, { message: '手机号不正确' })
    phone: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 4)
    code: string;
}