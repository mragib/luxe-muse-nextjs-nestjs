import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { AccountType } from 'src/common/common.enums';
import { ChartOfAccount } from '../entities/chart-of-account.entity';

export class CreateChartOfAccountDto {
  @IsNumber()
  @IsNotEmpty()
  code: number;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
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
  parent: ChartOfAccount;

  @IsNumber()
  @IsOptional()
  parentId: number;
}
