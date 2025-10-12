import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  async create(createProductImageDto: CreateProductImageDto) {
    try {
      const productImage = await this.productImageRepository.save(
        createProductImageDto,
      );
      return productImage;
    } catch (error) {
      if (error.errno === 19)
        throw new ConflictException('ProductImage is already exist.');
      throw new InternalServerErrorException('Something went wrong!🔥');
    }
  }

  findAll() {
    return this.productImageRepository.find({
      relations: ['product'],
    });
  }

  findOne(id: string) {
    return this.productImageRepository.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  async update(id: string, updateProductImageDto: UpdateProductImageDto) {
    const found = await this.findOne(id);
    if (!found) throw new NotFoundException('ProductImage is not found');
    return this.productImageRepository.save({ id, ...updateProductImageDto });
  }

  remove(id: string) {
    return this.productImageRepository.delete(id);
  }
}
