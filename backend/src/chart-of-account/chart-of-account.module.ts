import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChartOfAccountController } from './chart-of-account.controller';
import { ChartOfAccountService } from './chart-of-account.service';
import { ChartOfAccount } from './entities/chart-of-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChartOfAccount])],
  controllers: [ChartOfAccountController],
  providers: [ChartOfAccountService],
})
export class ChartOfAccountModule {}
