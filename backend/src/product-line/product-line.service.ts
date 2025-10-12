import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductLineDto } from './dto/create-product-line.dto';
import { UpdateProductLineDto } from './dto/update-product-line.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductLine } from './entities/product-line.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductLineService {
  constructor(
    @InjectRepository(ProductLine)
    private readonly productLineRepository: Repository<ProductLine>,
  ) {}

  async create(createProductLineDto: CreateProductLineDto) {
    try {
      const productLine =
        await this.productLineRepository.save(createProductLineDto);
      return productLine;
    } catch (error) {
      if (error.errno === 19)
        throw new ConflictException('ProductLine is already exist.');
      throw new InternalServerErrorException('Something went wrong!🔥');
    }
  }

  findAll() {
    return this.productLineRepository.find({
      relations: ['brand', 'category'],
    });
  }

  findOne(id: string) {
    return this.productLineRepository.findOne({
      where: { id },
      relations: ['brand', 'category', 'products'],
    });
  }

  async update(id: string, updateProductLineDto: UpdateProductLineDto) {
    const found = await this.findOne(id);
    if (!found) throw new NotFoundException('ProductLine is not found');
    return this.productLineRepository.save({ id, ...updateProductLineDto });
  }

  remove(id: string) {
    return this.productLineRepository.delete(id);
  }
}
