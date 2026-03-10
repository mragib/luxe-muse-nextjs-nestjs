import { ChartOfAccount } from 'src/chart-of-account/entities/chart-of-account.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Journal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Transaction, (item) => item.journal, { onDelete: 'CASCADE' })
  transaction: Transaction;

  @ManyToOne(() => ChartOfAccount, (item) => item.journal)
  gl: ChartOfAccount;

  @Column('decimal', { precision: 14, scale: 2, default: 0 })
  dr_amount: number;

  @Column('decimal', { precision: 14, scale: 2, default: 0 })
  cr_amount: number;

  @CreateDateColumn()
  created_at: Date;
}
