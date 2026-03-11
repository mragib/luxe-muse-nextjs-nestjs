import { Injectable } from '@nestjs/common';
import { ChartOfAccountService } from 'src/chart-of-account/chart-of-account.service';
import { EntityManager } from 'typeorm';
import { CreateJournalDto } from './dto/create-journal.dto';
import { Journal } from './entities/journal.entity';

@Injectable()
export class JournalService {
  constructor(private readonly chartOfAccountService: ChartOfAccountService) {}

  async createJournalEntryForFinncialAccount(
    journalData: CreateJournalDto[],
    manager: EntityManager,
  ) {
    //1. loop the journal data.
    for (const data of journalData) {
      // Find the chart of account for the financial account.
      const chartOfAccount = await this.chartOfAccountService.findOneByCode(
        data.gl.code,
      );
      const journalEntry = manager.create(Journal, {
        transaction: data.transaction,
        dr_amount: data.dr_amount,
        cr_amount: data.cr_amount,
        gl: data.gl,
        created_by: data.created_by,
      } as any);
      const savedJournalEntry = await manager.save(journalEntry);

      // Update the balance of the chart of account.
      if (chartOfAccount) {
        await this.chartOfAccountService.updateBalance(
          chartOfAccount,
          {
            dr_amount: data.dr_amount || 0,
            cr_amount: data.cr_amount || 0,
          },
          manager,
        );
      }
    }
  }
}
