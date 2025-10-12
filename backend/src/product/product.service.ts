import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.productRepository.save(createProductDto);
      return product;
    } catch (error) {
      if (error.errno === 19)
        throw new ConflictException('Product is already exist.');
      throw new InternalServerErrorException('Something went wrong!🔥');
    }
  }

  findAll() {
    return this.productRepository.find({
      relations: ['productLine', 'images'],
    });
  }

  findOne(id: string) {
    return this.productRepository.findOne({
      where: { id },
      relations: ['productLine', 'images'],
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const found = await this.findOne(id);
    if (!found) throw new NotFoundException('Product is not found');
    return this.productRepository.save({ id, ...updateProductDto });
  }

  remove(id: string) {
    return this.productRepository.delete(id);
  }
}
