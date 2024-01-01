import {
  IsNotEmpty,
  IsString,
  Length,
  IsPhoneNumber,
  Matches,
} from 'class-validator';

export class ProductInfoDto {
  title: string;
  productTypeId: number;
  productCategoryId: number;
  productQualityId: number;
  productOriginId: number;
  originName: string;
  originId: number | null;
  productStoreId: number;
  no: string | null;
  costPrice: number | null;
  sellingPrice: number | null;
  peerPrice: number | null;
  liveBroadcastPrice: number | null;
  counterPrice: number | null;
  type: number | null;
  laserMarking: string | null;
  forPeople: number | null;
  size: number | null;
  productMaterial: string | null;
  color: string | null;
  count: number | null;
  arrivalTime: Date;
  inTime: Date;
  buyer: number;
  productTag: string | null;
  productAttach: string | null;
  description: string | null;
  status: number | null;
  workflow: number;
  staticList: string | null;
}
