import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_origin", { schema: "sxb" })
export class ProductOrigin {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 30 })
  name: string;
}
