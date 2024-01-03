import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("log", { schema: "sxb" })
export class Log {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("varchar", { name: "desc", length: 200 })
  desc: string;

  @Column("datetime", { name: "create_time" })
  createTime: Date;

  @Column("varchar", { name: "name", length: 20 })
  name: string;
}
