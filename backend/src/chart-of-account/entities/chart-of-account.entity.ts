import { AccountType } from 'src/common/common.enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('materialized-path')
export class ChartOfAccount {
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
  parent: ChartOfAccount;

  @Column()
  parentId: number;

  @TreeChildren()
  child: ChartOfAccount[];

  @CreateDateColumn()
  created_at: Date;
}
