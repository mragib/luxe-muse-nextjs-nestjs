import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from '../entities/category.entity';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image_url: string;

  @IsObject()
  @IsOptional()
  @IsNotEmptyObject()
  parent?: Category;

  @IsString()
  @IsOptional()
  parentId: string;

  @IsOptional()
  is_active?: boolean;

  @IsOptional()
  slug?: string;

  @IsOptional()
  @IsBoolean()
  is_leaf?: boolean;
}
