import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("order", { schema: "sxb" })
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "customer_id", comment: "客户ID" })
  customerId: number;

  @Column("int", { name: "sales_channels_id", comment: "销售途径ID" })
  salesChannelsId: number;

  @Column("tinyint", { name: "send_status", comment: "发货状态" })
  sendStatus: number;

  @Column("float", {
    name: "amount_receivable",
    nullable: true,
    comment: "应收金额",
    precision: 12,
  })
  amountReceivable: number | null;

  @Column("varchar", { name: "account", comment: "收款账户", length: 100 })
  account: string;

  @Column("float", { name: "money", comment: "收到金额", precision: 12 })
  money: number;

  @Column("varchar", {
    name: "img",
    nullable: true,
    comment: "凭证图片，逗号分隔",
    length: 300,
  })
  img: string | null;

  @Column("int", { name: "saler", comment: "主要销售人员" })
  saler: number;

  @Column("int", { name: "hepler", nullable: true, comment: "辅助销售人员" })
  hepler: number | null;

  @Column("datetime", { name: "sale_time", comment: "销售时间" })
  saleTime: Date;

  @Column("varchar", {
    name: "desc",
    nullable: true,
    comment: "备注",
    length: 200,
  })
  desc: string | null;

  @Column("tinyint", {
    name: "status",
    comment: "1. 开单，运输中 2. 完成 3. 撤销订单",
  })
  status: number;
}
