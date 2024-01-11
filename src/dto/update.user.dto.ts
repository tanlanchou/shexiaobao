import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UpdateUserDto {

    roleId: number;

    @IsNotEmpty()
    nickname: string;

    icon: string;

    status: number;
}