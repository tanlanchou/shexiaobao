import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_attachment", { schema: "sxb" })
export class ProductAttachment {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", comment: "附件名称", length: 15 })
  name: string;
}
