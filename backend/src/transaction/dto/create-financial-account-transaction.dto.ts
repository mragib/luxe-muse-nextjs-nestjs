import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
} from 'class-validator';
import { TransactionType } from 'src/common/common.enums';
import { FinancialAccount } from 'src/financial_accounts/entities/financial_account.entity';
import { CreateJournalDto } from 'src/journal/dto/create-journal.dto';
import { User } from 'src/user/entities/user.entity';

export class CreateFinancialAccountTransactionDto {
  @IsDate()
  @IsNotEmpty()
  transaction_date: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  total_amount: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  transaction_type: TransactionType;

  @IsNotEmptyObject()
  financialAccount: FinancialAccount;

  @IsNotEmpty()
  journal_entries: CreateJournalDto[];

  @IsNotEmptyObject()
  created_by: User;
}
