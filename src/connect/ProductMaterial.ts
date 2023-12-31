import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_material", { schema: "sxb" })
export class ProductMaterial {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 20 })
  name: string;
}
