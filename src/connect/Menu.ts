import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("menu", { schema: "sxb" })
export class Menu {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", comment: "菜单标题", length: 10 })
  name: string;

  @Column("varchar", { name: "url", comment: "菜单链接", length: 100 })
  url: string;

  @Column("varchar", { name: "icon", comment: "icon css", length: 20 })
  icon: string;

  @Column("tinyint", { name: "common", comment: "是否是常用菜单" })
  common: number;

  @Column("int", { name: "order", comment: "排序" })
  order: number;

  @Column("datetime", {
    name: "create_time",
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date;
}
