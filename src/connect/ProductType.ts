import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_type", { schema: "sxb" })
export class ProductType {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "type_name", length: 100 })
  typeName: string;
}
