import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialAccount } from './entities/financial_account.entity';
import { FinancialAccountsController } from './financial_accounts.controller';
import { FinancialAccountsService } from './financial_accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialAccount])],
  controllers: [FinancialAccountsController],
  providers: [FinancialAccountsService],
})
export class FinancialAccountsModule {}
