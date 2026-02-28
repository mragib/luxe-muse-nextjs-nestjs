import { Module } from '@nestjs/common';
import { ChartOfAccountingService } from './chart-of-accounting.service';
import { ChartOfAccountingController } from './chart-of-accounting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chartofaccounting } from './entities/chart-of-accounting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chartofaccounting])],
  controllers: [ChartOfAccountingController],
  providers: [ChartOfAccountingService],
})
export class ChartOfAccountingModule {}
