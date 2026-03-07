import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AttributeValue } from 'src/attribute-value/entities/attribute-value.entity';
import { CreateProductImageDto } from 'src/product-image/dto/create-product-image.dto';

export class CreateProductLineDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  sku: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  sellUnitPrice: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  costUnitPrice: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  wholesaleUnitPrice: number;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsArray()
  @ArrayNotEmpty()
  attributeValues: AttributeValue[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  productImages: CreateProductImageDto[];
}
