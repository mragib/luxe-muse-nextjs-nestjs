import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journal } from './entities/journal.entity';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';

@Module({
  imports: [TypeOrmModule.forFeature([Journal])],
  controllers: [JournalController],
  providers: [JournalService],
})
export class JournalModule {}
