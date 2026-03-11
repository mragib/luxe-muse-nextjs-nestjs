import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChartOfAccountModule } from 'src/chart-of-account/chart-of-account.module';
import { JournalModule } from 'src/journal/journal.module';
import { Transaction } from './entities/transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    JournalModule,
    ChartOfAccountModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
