import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RoleDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 15)
  name: string;

  @IsNotEmpty()
  number: bigint;
}
