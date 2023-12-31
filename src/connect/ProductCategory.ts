import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_category", { schema: "sxb" })
export class ProductCategory {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("int", { name: "parent_id" })
  parentId: number;

  @Column("int", { name: "status", default: () => "'1'" })
  status: number;
}
