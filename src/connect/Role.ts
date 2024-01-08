import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

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

  @Column("tinyint", { name: "status", comment: "1. 系统字段, 2. 其他字段" })
  status: number;
}
