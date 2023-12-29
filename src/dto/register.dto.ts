import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class RegisterDto {
    @Matches(/^1[3456789]\d{9}$/, { message: '手机号不正确' })
    phone: string;

    @IsNotEmpty()
    @IsString()
    @Length(32, 32)
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 4)
    code: string;

    roleId: number;

    nickName: string;
}