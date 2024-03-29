import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_type", { schema: "sxb" })
export class ProductType {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;
}
