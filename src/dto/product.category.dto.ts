import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class ProductCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 15)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  parentId: number;
}
