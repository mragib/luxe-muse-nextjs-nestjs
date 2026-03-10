import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PaymentMethodType } from 'src/common/common.enums';

export class CreateFinancialAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  code: number;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  account_number: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @IsEnum(PaymentMethodType)
  @MaxLength(50)
  type: string;

  @IsNotEmpty()
  @IsNumber()
  balance: number;
}
