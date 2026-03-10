import { ChartOfAccount } from 'src/chart-of-account/entities/chart-of-account.entity';
import { PaymentMethodType } from 'src/common/common.enums';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FinancialAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  name: string;

  @Column({ unique: true, nullable: true })
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
  @ManyToOne(() => ChartOfAccount, (chart) => chart.financialAccounts)
  chartOfAccount: ChartOfAccount;

  // Bi derections realtion
  //   @OneToMany(() => Payment, (item) => item.account)
  //   payment: Payment;

  //   @OneToMany(() => SaleRevenue, (item) => item.account)
  //   saleRevenue: SaleRevenue[];

  //   @ManyToOne(() => User, { eager: true })
  //   created_by: User;

  //   @CreateDateColumn()
  //   created_at: Date;

  //   @ManyToOne(() => User, { eager: true })
  //   updated_by: User;

  //   @UpdateDateColumn()
  //   updated_at: Date;
}
