import { IsNotEmptyObject, IsNumber, IsOptional } from 'class-validator';
import { ChartOfAccount } from 'src/chart-of-account/entities/chart-of-account.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateJournalDto {
  @IsNotEmptyObject()
  transaction: Transaction;

  @IsNotEmptyObject()
  gl: ChartOfAccount;

  @IsNumber()
  @IsOptional()
  dr_amount?: number;

  @IsNumber()
  @IsOptional()
  cr_amount?: number;

  @IsNotEmptyObject()
  created_by: User;
}
