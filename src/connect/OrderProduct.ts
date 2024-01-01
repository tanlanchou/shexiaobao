import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("order_product", { schema: "sxb" })
export class OrderProduct {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "order_id" })
  orderId: number;

  @Column("int", { name: "product_id" })
  productId: number;

  @Column("datetime", { name: "create_date" })
  createDate: Date;
}
