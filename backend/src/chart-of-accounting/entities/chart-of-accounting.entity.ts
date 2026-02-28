import { AccountType } from 'src/common/common.enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
@Entity('ledger')
@Tree('materialized-path')
export class Chartofaccounting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  gl_type: AccountType;

  @Column({ default: true })
  is_leaf: boolean;

  @Column('double precision', { default: 0 })
  dr_amount: number;

  @Column('double precision', { default: 0 })
  cr_amount: number;

  @TreeParent({ onDelete: 'CASCADE' })
  parent: Chartofaccounting;

  @TreeChildren()
  child: Chartofaccounting[];

  @CreateDateColumn()
  created_at: Date;
}
