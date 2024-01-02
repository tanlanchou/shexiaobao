import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sales_channels", { schema: "sxb" })
export class SalesChannels {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", comment: "名称", length: 10 })
  name: string;

  @Column("int", { name: "parent_id" })
  parentId: number;
}
