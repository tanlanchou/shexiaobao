import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("customer_tag", { schema: "sxb" })
export class CustomerTag {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;
}
