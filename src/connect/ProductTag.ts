import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_tag", { schema: "sxb" })
export class ProductTag {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 20 })
  name: string;
}
