import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
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

  @IsNumber()
  dr_amount: number;

  @IsNumber()
  cr_amount: number;

  @IsNumber()
  @IsOptional()
  balance?: number;

  @IsOptional()
  @IsObject()
  parent: ChartOfAccount;

  @IsNumber()
  @IsOptional()
  parentId: number;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}
