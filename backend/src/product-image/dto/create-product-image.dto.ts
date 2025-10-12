import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsBoolean,
} from 'class-validator';

export class CreateProductImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  alt?: string;

  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;

  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
