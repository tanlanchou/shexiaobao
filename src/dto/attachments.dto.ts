import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ProductAttachmentsDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 15)
  name: string;
}
