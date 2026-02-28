import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsNumberString,
  IsObject,
} from 'class-validator';
import { AccountType } from 'src/common/common.enums';
import { Chartofaccounting } from '../entities/chart-of-accounting.entity';

export class CreateChartOfAccountingDto {
  @IsNumber()
  @IsNotEmpty()
  code: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(AccountType)
  gl_type: AccountType;

  @IsBoolean()
  @IsOptional()
  is_leaf: boolean;

  @IsNumberString()
  dr_amount: number;

  @IsNumberString()
  cr_amount: number;

  @IsNumberString()
  balance?: number;

  @IsOptional()
  @IsObject()
  parent: Chartofaccounting;
}
