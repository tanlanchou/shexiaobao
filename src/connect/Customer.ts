import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("customer", { schema: "sxb" })
export class Customer {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 10 })
  name: string;

  @Column("varchar", {
    name: "no",
    nullable: true,
    comment: "客户编号",
    length: 10,
  })
  no: string | null;

  @Column("int", { name: "maintenance_man", comment: "维护人" })
  maintenanceMan: number;

  @Column("varchar", {
    name: "intention",
    nullable: true,
    comment: "业务意向",
    length: 100,
  })
  intention: string | null;

  @Column("tinyint", {
    name: "type",
    nullable: true,
    comment: "1. 直客 2. 同行",
  })
  type: number | null;

  @Column("tinyint", { name: "sex", nullable: true, comment: "1 男 2 女" })
  sex: number | null;

  @Column("varchar", {
    name: "customer_tag",
    nullable: true,
    comment: "客户标签",
    length: 100,
  })
  customerTag: string | null;

  @Column("tinyint", { name: "customer_origin_id", comment: "客户来源" })
  customerOriginId: number;

  @Column("varchar", { name: "img", nullable: true, length: 100 })
  img: string | null;

  @Column("varchar", { name: "desc", nullable: true, length: 100 })
  desc: string | null;

  @Column("tinyint", {
    name: "intention_type",
    nullable: true,
    comment: "业务意向 1. 消费, 2. 回收 3. 寄卖",
  })
  intentionType: number | null;
}
