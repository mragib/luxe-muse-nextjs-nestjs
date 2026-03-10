import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancialAccountDto } from './create-financial_account.dto';

export class UpdateFinancialAccountDto extends PartialType(CreateFinancialAccountDto) {}
