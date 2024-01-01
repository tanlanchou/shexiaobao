import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('power', { schema: 'sxb' })
export class Power {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'name', length: 20 })
  name: string;

  @Column('bigint', { name: 'number' })
  number: bigint;

  @Column('varchar', { name: 'key', length: 50 })
  key: string;
}
