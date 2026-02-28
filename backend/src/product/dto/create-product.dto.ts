import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  sellingUnitPrice: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  costUnitPrice: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  wholesaleUnitPrice: number;

  @IsString()
  @IsOptional()
  image_url?: string;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsOptional()
  is_active?: boolean;
}
