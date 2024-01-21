import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './Role';

@Index('user_role_FK', ['roleId'], {})
@Entity('user', { schema: 'sxb' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'phone_number', length: 20 })
  phoneNumber: string;

  @Column('varchar', { name: 'nickname', length: 50 })
  nickname: string;

  @Column('int', { name: 'role_id' })
  roleId: number;

  @Column('varchar', { name: 'password', nullable: true, length: 32 })
  password: string | null;

  @Column('timestamp', { name: 'creation_time' })
  creationTime: Date;

  @Column('timestamp', { name: 'last_login_time' })
  lastLoginTime: Date;

  @Column('int', { name: 'status' })
  status: number;

  @Column('varchar', {
    name: 'icon',
    nullable: true,
    comment: '头像链接',
    length: 100,
  })
  icon: string | null;

  @ManyToOne(() => Role)
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: Role;
}
