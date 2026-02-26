import {
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
}
