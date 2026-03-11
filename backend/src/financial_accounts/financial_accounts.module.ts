import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChartOfAccountModule } from 'src/chart-of-account/chart-of-account.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { FinancialAccount } from './entities/financial_account.entity';
import { FinancialAccountsController } from './financial_accounts.controller';
import { FinancialAccountsService } from './financial_accounts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FinancialAccount]),
    TransactionModule,
    ChartOfAccountModule,
  ],
  controllers: [FinancialAccountsController],
  providers: [FinancialAccountsService],
})
export class FinancialAccountsModule {}
