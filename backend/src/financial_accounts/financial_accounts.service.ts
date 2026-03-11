import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChartOfAccountService } from 'src/chart-of-account/chart-of-account.service';
import { ChartOfAccount } from 'src/chart-of-account/entities/chart-of-account.entity';
import {
  AccountType,
  CASH_IN_BANK_CODE,
  CASH_IN_HAND_CODE,
  PaymentMethodType,
  TransactionType,
} from 'src/common/common.enums';
import { CreateFinancialAccountTransactionDto } from 'src/transaction/dto/create-financial-account-transaction.dto';
import { TransactionService } from 'src/transaction/transaction.service';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { CreateFinancialAccountDto } from './dto/create-financial_account.dto';
import { UpdateFinancialAccountDto } from './dto/update-financial_account.dto';
import { FinancialAccount } from './entities/financial_account.entity';

@Injectable()
export class FinancialAccountsService {
  constructor(
    @InjectRepository(FinancialAccount)
    private readonly financeAccountRepo: Repository<FinancialAccount>,
    private readonly transactionService: TransactionService,
    private readonly chartOfAccountService: ChartOfAccountService,
    private readonly dataSource: DataSource,
  ) {}
  async create(createFinancialAccountDto: CreateFinancialAccountDto) {
    const { name, type, balance, code } = createFinancialAccountDto;
    try {
      return this.dataSource.transaction(async (manager) => {
        const parent = await this.chartOfAccountService.findOneByCode(
          type === PaymentMethodType.Cash
            ? CASH_IN_HAND_CODE
            : CASH_IN_BANK_CODE,
        );

        const chart = manager.create(ChartOfAccount, {
          code,
          name: name.toLowerCase(),
          gl_type: AccountType.Asset,
          is_leaf: true,
          parent,
        } as DeepPartial<ChartOfAccount>);
        const savedChart = await manager.save(chart);
        const financialAccount = manager.create(FinancialAccount, {
          ...createFinancialAccountDto,
          chartOfAccount: savedChart,
        });

        const savedFinancialAccount = await manager.save(financialAccount);

        if (balance && balance > 0) {
          await this.transactionService.createFinancialAccountTransaction(
            {
              total_amount: balance,
              transaction_type: TransactionType.OPENING_BALANCE,
              description: `Initial balance for ${name} account`,
              financialAccount: savedFinancialAccount,
            } as CreateFinancialAccountTransactionDto,
            manager,
          );
        }

        return savedFinancialAccount;
      });
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Something went wrong!🔥',
      );
    }
  }

  findAll() {
    return `This action returns all financialAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} financialAccount`;
  }

  update(id: number, updateFinancialAccountDto: UpdateFinancialAccountDto) {
    return `This action updates a #${id} financialAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} financialAccount`;
  }
}
