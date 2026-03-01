import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { ApiResponse } from 'src/types/types';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    try {
      createCategoryDto.slug = slugify(createCategoryDto.name, {
        lower: true,
        strict: true,
        trim: true,
      });
      const category = await this.categoryRepository.save(createCategoryDto);
      return {
        status: 'success',
        statuscode: 200,
        data: category,
        message: 'Category has been created',
      };
    } catch (error) {
      if (error.errno === 19)
        throw new ConflictException('Category is already exist.');
      throw new InternalServerErrorException('Something went wrong!🔥');
    }
  }

  async findAll() {
    const [category, count] = await this.categoryRepository.findAndCount({
      relations: ['parent'],
    });

    return {
      status: 'success',
      statuscode: 200,
      data: category,
      count,
    };
  }

  findOne(id: string) {
    return this.categoryRepository.findOne({
      where: { id },
    });
  }

  findOneBySlug(slug: string) {
    return this.categoryRepository.findOne({
      where: { slug },
    });
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    const found = await this.findOne(id);
    if (!found) throw new NotFoundException('Category is not found');
    updateCategoryDto.slug = slugify(updateCategoryDto.name || found.name, {
      lower: true,
      strict: true,
      trim: true,
    });
    const updatedCategory = await this.categoryRepository.save({
      id,
      ...updateCategoryDto,
    });

    return {
      status: 'success',
      statuscode: 200,
      data: updatedCategory,
      message: 'Category has been updated',
    };
  }

  remove(id: string) {
    this.categoryRepository.delete(id);
    return {
      status: 'success',
      statuscode: 200,
      message: 'Category has been deleted',
    };
  }
}
