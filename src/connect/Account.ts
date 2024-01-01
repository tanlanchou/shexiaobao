import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account', { schema: 'sxb' })
export class Account {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', comment: '账户名称', length: 100 })
  name: string;

  @Column('tinyint', { name: 'type', comment: '账户类型' })
  type: number;
}
