import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
import {
  CreateFinancialAccountTransactionDto,
  CreateTransferMoneyTransactionDto,
} from 'src/transaction/dto/create-financial-account-transaction.dto';
import { TransactionService } from 'src/transaction/transaction.service';
import { DataSource, DeepPartial, EntityManager, Repository } from 'typeorm';
import { CreateFinancialAccountDto } from './dto/create-financial_account.dto';
import { CreateTransferMoneyDto } from './dto/create-transfer-money.dto';
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
      const financial_account = await this.dataSource.transaction(
        async (manager) => {
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
        },
      );

      return {
        status: 'success',
        statuscode: 200,
        data: financial_account,
        message: 'Financial account has been created',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Something went wrong!🔥',
      );
    }
  }

  async findAll() {
    const [data, count] = await this.financeAccountRepo.findAndCount();
    return { data, count, status: 'success', statuscode: 200 };
  }

  async findOne(id: number): Promise<FinancialAccount> {
    const found = await this.financeAccountRepo.findOne({
      where: { id },
      relations: ['chartOfAccount'],
    });
    if (!found) throw new NotFoundException('Account is not found');
    return found;
  }

  update(id: number, updateFinancialAccountDto: UpdateFinancialAccountDto) {
    return `This action updates a #${id} financialAccount`;
  }

  async updateBalance(
    account: FinancialAccount,
    updateFinancialAccountDto: UpdateFinancialAccountDto,
    manager: EntityManager,
  ) {
    const updatedProduct = await manager.save(FinancialAccount, {
      ...account,
      balance: account.balance + (updateFinancialAccountDto.balance || 0),
    });
    return {
      status: 'success',
      statuscode: 200,
      data: updatedProduct,
      message: 'Financial account balance has been updated',
    };
  }

  remove(id: number) {
    return `This action removes a #${id} financialAccount`;
  }

  async transferMoney(createTransferMoneyDto: CreateTransferMoneyDto) {
    try {
      await this.dataSource.transaction(async (manager) => {
        const {
          fromAccount,
          toAccount,
          balance,
          transfer_date,
          transaction_type,
        } = createTransferMoneyDto;
        const credit_account = await this.findOne(fromAccount.id);
        const debit_account = await this.findOne(toAccount.id);

        if (credit_account.balance < balance) {
          throw new InternalServerErrorException(
            'Insufficient balance in the account',
          );
        }

        await this.updateBalance(
          debit_account,
          { balance: balance, updated_by: createTransferMoneyDto.created_by },
          manager,
        );

        await this.updateBalance(
          credit_account,
          { balance: -balance, updated_by: createTransferMoneyDto.created_by },
          manager,
        );

        let description = '';
        if (transaction_type === 'TRANSFER') {
          description += `Bank Transfer from ${credit_account.name} to ${debit_account.name} amount ${balance}`;
        }
        if (transaction_type === 'WITHDRAW') {
          description += `Withdraw ${balance} from ${credit_account.name}`;
        }
        if (transaction_type === 'DEPOSIT') {
          description += `Deposit ${balance} to ${debit_account.name}`;
        }

        await this.transactionService.createTransferMoneyTransaction(
          {
            total_amount: balance,
            transaction_type: transaction_type || TransactionType.TRANSFER,
            description,
            debit_account,
            credit_account,
            transaction_date: transfer_date,
          } as CreateTransferMoneyTransactionDto,
          manager,
        );
      });
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Something went wrong!🔥',
      );
    }
  }
}
