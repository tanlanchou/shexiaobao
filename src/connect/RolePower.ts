import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("role_power", { schema: "sxb" })
export class RolePower {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "power_name", comment: "权限名称", length: 50 })
  powerName: string;

  @Column("tinyint", { name: "status", comment: "状态 1 || 0" })
  status: number;

  @Column("int", { name: "role_id", comment: "角色ID" })
  roleId: number;
}
