import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmptyObject } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { CreateFinancialAccountDto } from './create-financial_account.dto';

export class UpdateFinancialAccountDto extends PartialType(
  CreateFinancialAccountDto,
) {
  @IsNotEmptyObject()
  updated_by: User;
}
