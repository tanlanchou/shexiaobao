import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("captcha", { schema: "sxb" })
export class Captcha {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "phone_number", length: 20 })
  phoneNumber: string;

  @Column("varchar", { name: "code", length: 10 })
  code: string;

  @Column("datetime", { name: "update_time" })
  updateTime: Date;
}
