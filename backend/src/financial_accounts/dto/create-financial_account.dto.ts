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
import { User } from 'src/user/entities/user.entity';

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
  type: PaymentMethodType;

  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @IsOptional()
  created_by: User;
}
