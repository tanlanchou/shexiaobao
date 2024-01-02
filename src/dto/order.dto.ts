import {
    IsNotEmpty,
    Length,
    IsNumber,
    IsDate,
    IsString,
} from 'class-validator';

export class OrderDto {
    @IsNotEmpty()
    @IsNumber()
    customerId: number;

    @IsNotEmpty()
    @IsNumber()
    salesChannelsId: number;

    @IsNotEmpty()
    @IsNumber()
    sendStatus: number;

    amountReceivable: number | null;

    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    account: string;

    @IsNotEmpty()
    money: number;

    @IsNotEmpty()
    @IsString()
    @Length(3, 300)
    img: string;

    @IsNotEmpty()
    @IsNumber()
    saler: number;

    hepler: number | null;

    @IsNotEmpty()
    @IsDate()
    saleTime: Date;

    desc: string | null;

    status: number;

    @IsNotEmpty()
    @IsString()
    productIds: String;
}