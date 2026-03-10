import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AccountType,
  CASH_IN_BANK_CODE,
  CASH_IN_HAND_CODE,
  TransactionType,
} from 'src/common/common.enums';
import { TransactionService } from 'src/transaction/transaction.service';
import { DataSource, Repository } from 'typeorm';
import { CreateFinancialAccountDto } from './dto/create-financial_account.dto';
import { UpdateFinancialAccountDto } from './dto/update-financial_account.dto';
import { FinancialAccount } from './entities/financial_account.entity';

@Injectable()
export class FinancialAccountsService {
  constructor(
    @InjectRepository(FinancialAccount)
    private readonly financeAccountRepo: Repository<FinancialAccount>,
    private readonly transactionService: TransactionService,
    private readonly dataSource: DataSource,
  ) {}
  async create(createFinancialAccountDto: CreateFinancialAccountDto) {
    const { name, type, balance, code } = createFinancialAccountDto;
    try {
      return this.dataSource.transaction(async (manager) => {
        const financialAccount = manager.create(FinancialAccount, {
          ...createFinancialAccountDto,
          chartOfAccount: {
            code: code,
            name: name,
            gl_type: AccountType.Asset,
            is_leaf: true,
            parentId: code === 1310 ? CASH_IN_HAND_CODE : CASH_IN_BANK_CODE,
            dr_amount: balance,
            cr_amount: 0,
          },
        });

        console.log('Financial Account to be created:', financialAccount);

        const transaction =
          this.transactionService.createFinancialAccountTransaction(
            {
              amount: balance,
              type: TransactionType.OPENING_BALANCE,
              description: `Initial balance for ${name} account`,
              financialAccount: financialAccount,
            },
            manager,
          );

        const savedFinancialAccount = await manager.save(financialAccount);

        return savedFinancialAccount;
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
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
