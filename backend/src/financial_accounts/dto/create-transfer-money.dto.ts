import {
  IsDate,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { TransactionType } from 'src/common/common.enums';
import { User } from 'src/user/entities/user.entity';
import { FinancialAccount } from '../entities/financial_account.entity';

export class CreateTransferMoneyDto {
  @IsNotEmptyObject()
  fromAccount: FinancialAccount;

  @IsNotEmptyObject()
  toAccount: FinancialAccount;

  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @IsDate()
  transfer_date: string;

  @IsOptional()
  @IsEnum(TransactionType)
  transaction_type: TransactionType;

  @IsEmpty()
  created_by: User;
}
