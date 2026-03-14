import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChartOfAccountService } from 'src/chart-of-account/chart-of-account.service';
import { OPENING_BALANCE_EQUITY_CODE } from 'src/common/common.enums';
import { JournalService } from 'src/journal/journal.service';
import { EntityManager, Repository } from 'typeorm';
import { CreateFinancialAccountTransactionDto } from './dto/create-financial-account-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly journalService: JournalService,
    private readonly chartOfAccountService: ChartOfAccountService,
  ) {}
  async createFinancialAccountTransaction(
    transactionData: CreateFinancialAccountTransactionDto,
    manager: EntityManager,
  ) {
    const transaction = manager.create(Transaction, {
      transaction_date: new Date(),
      description: transactionData.description,
      created_by: transactionData.financialAccount.created_by,
      total_amount: transactionData.total_amount,
      transaction_type: transactionData.transaction_type,
    } as Partial<Transaction>);

    const savedTransaction = await manager.save(transaction);

    const cr_gl = await this.chartOfAccountService.findOneByCode(
      OPENING_BALANCE_EQUITY_CODE,
    );
    if (!cr_gl)
      throw new InternalServerErrorException(
        'Opening Balance Equity account not found!',
      );
    await this.journalService.createJournalEntryForFinncialAccount(
      [
        {
          transaction: savedTransaction,
          dr_amount: savedTransaction.total_amount,
          gl: transactionData.financialAccount.chartOfAccount,
          created_by: transactionData.financialAccount.created_by,
        },
        {
          cr_amount: savedTransaction.total_amount,
          transaction: savedTransaction,
          gl: cr_gl,
          created_by: transactionData.financialAccount.created_by,
        },
      ],
      manager,
    );
    return savedTransaction;
  }

  async findAll() {
    const [transactions, count] = await this.transactionRepository.findAndCount(
      {
        order: {
          created_at: 'DESC',
        },
      },
    );
    return { data: transactions, count, status: 'success', statuscode: 200 };
  }
}
