import { IsNotEmpty, IsString, Length, IsPhoneNumber } from 'class-validator';

export class LoginDto {
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @Length(32, 32)
    password: string;
}

export class LoginByCodeDto {
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 4)
    code: string;
}