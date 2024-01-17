import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("origin", { schema: "sxb" })
export class Origin {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;
}
