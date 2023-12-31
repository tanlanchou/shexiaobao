import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_quality", { schema: "sxb" })
export class ProductQuality {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("varchar", { name: "desc", length: 100 })
  desc: string;
}
