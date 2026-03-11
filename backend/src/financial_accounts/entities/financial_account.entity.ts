import { ChartOfAccount } from 'src/chart-of-account/entities/chart-of-account.entity';
import { PaymentMethodType } from 'src/common/common.enums';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['name', 'account_number'])
export class FinancialAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  name: string;

  @Column({ unique: true })
  code: number;

  @Column({ nullable: true, length: 80 })
  account_number: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true, type: 'text' })
  type: PaymentMethodType;

  @Column('decimal', { precision: 14, scale: 2, default: 0 })
  balance: number;

  // Many-to-one relation with Chartofaccounting
  @ManyToOne(() => ChartOfAccount, (chart) => chart.financialAccounts, {
    cascade: true,
  })
  chartOfAccount: ChartOfAccount;

  // Bi derections realtion
  //   @OneToMany(() => Payment, (item) => item.account)
  //   payment: Payment;

  //   @OneToMany(() => SaleRevenue, (item) => item.account)
  //   saleRevenue: SaleRevenue[];

  @ManyToOne(() => User)
  created_by: User;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  updated_by: User;

  @UpdateDateColumn()
  updated_at: Date;
}
