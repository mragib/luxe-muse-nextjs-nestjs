import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { IsNull, Repository } from 'typeorm';
import { ApiResponse } from 'src/types/types';
import slugify from 'slugify';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}
  async create(createBrandDto: CreateBrandDto): Promise<ApiResponse<Brand>> {
    try {
      createBrandDto.slug = slugify(createBrandDto.name, {
        lower: true,
        trim: true,
        strict: true,
      });
      const brand = await this.brandRepository.save(createBrandDto);
      return {
        status: 'success',
        statuscode: 200,
        data: brand,
        message: 'Brand has been created',
      };
    } catch (error) {
      if (error.errno === 19) {
        throw new ConflictException('This brand is already exist!');
      }
      throw new InternalServerErrorException('Something went wrong!🔥');
    }
  }

  async findAll() {
    const [brands, count] = await this.brandRepository.findAndCount();
    return {
      status: 'success',
      statuscode: 200,
      data: brands,
      count,
    };
  }

  findOne(id: string) {
    return this.brandRepository.findOne({ where: { id } });
  }

  findBySlug(slug: string) {
    return this.brandRepository.findOne({ where: { slug } });
  }

  async update(
    id: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<ApiResponse<Brand>> {
    const brand = await this.findOne(id);
    if (!brand) throw new NotFoundException('Brand is not found');
    updateBrandDto.slug = slugify(updateBrandDto.name || brand.name, {
      lower: true,
      trim: true,
      strict: true,
    });
    const updatedBrand = await this.brandRepository.save({
      id,
      ...updateBrandDto,
    });
    return {
      status: 'success',
      statuscode: 200,
      data: updatedBrand,
      message: 'Brand has been updated',
    };
  }

  async remove(id: string) {
    return this.brandRepository.delete(id);
  }
}
