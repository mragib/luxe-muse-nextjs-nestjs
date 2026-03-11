import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChartOfAccountModule } from 'src/chart-of-account/chart-of-account.module';
import { Journal } from './entities/journal.entity';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';

@Module({
  imports: [TypeOrmModule.forFeature([Journal]), ChartOfAccountModule],
  controllers: [JournalController],
  providers: [JournalService],
  exports: [JournalService],
})
export class JournalModule {}
