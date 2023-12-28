import { IsNotEmpty, IsString, Length, IsPhoneNumber } from 'class-validator';

export class RegisterDto {
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @Length(32, 32)
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 4)
    code: string;

    nickName: string
}