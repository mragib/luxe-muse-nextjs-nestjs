import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      createProductDto.slug = slugify(createProductDto.name, {
        lower: true,
        strict: true,
        trim: true,
      });
      const product = await this.productRepository.save(createProductDto);
      return {
        status: 'success',
        statuscode: 200,
        data: product,
        message: 'Product has been created',
      };
    } catch (error) {
      if (error.errno === 19)
        throw new ConflictException('Product is already exist.');
      throw new InternalServerErrorException('Something went wrong!🔥');
    }
  }

  async findAll() {
    const [product, count] = await this.productRepository.findAndCount({
      relations: ['brand', 'category'],
    });
    return {
      status: 'success',
      statuscode: 200,
      data: product,
      count: count,
    };
  }

  findoneBySlug(slug: string) {
    return this.productRepository.findOne({
      where: { slug },
    });
  }

  findOne(id: string) {
    return this.productRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const found = await this.findOne(id);
    if (!found) throw new NotFoundException('Product is not found');
    const updatedProduct = await this.productRepository.save({
      id,
      ...updateProductDto,
    });
    return {
      status: 'success',
      statuscode: 200,
      data: updatedProduct,
      message: 'Product has been updated',
    };
  }

  remove(id: string) {
    return this.productRepository.delete(id);
  }
}
