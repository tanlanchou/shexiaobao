import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("role", { schema: "sxb" })
export class Role {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("datetime", {
    name: "create_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;
}
