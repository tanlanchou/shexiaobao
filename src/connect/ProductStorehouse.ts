import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_storehouse", { schema: "sxb" })
export class ProductStorehouse {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", comment: "仓库名称", length: 100 })
  name: string;

  @Column("varchar", {
    name: "desc",
    nullable: true,
    comment: "描述",
    length: 100,
  })
  desc: string | null;
}
