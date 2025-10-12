import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AttributeValue } from './entities/attribute-value.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttributeValueService {
  constructor(
    @InjectRepository(AttributeValue)
    private readonly attributeValueRepository: Repository<AttributeValue>,
  ) {}

  async create(createAttributeValueDto: CreateAttributeValueDto) {
    try {
      const attributeValue = await this.attributeValueRepository.save(
        createAttributeValueDto,
      );
      return attributeValue;
    } catch (error) {
      if (error.errno === 19)
        throw new ConflictException('AttributeValue is already exist.');
      throw new InternalServerErrorException('Something went wrong!🔥');
    }
  }

  findAll() {
    return this.attributeValueRepository.find({
      relations: ['attribute'],
    });
  }

  findOne(id: string) {
    return this.attributeValueRepository.findOne({
      where: { id },
      relations: ['attribute'],
    });
  }

  async update(id: string, updateAttributeValueDto: UpdateAttributeValueDto) {
    const found = await this.findOne(id);
    if (!found) throw new NotFoundException('AttributeValue is not found');
    return this.attributeValueRepository.save({
      id,
      ...updateAttributeValueDto,
    });
  }

  remove(id: string) {
    return this.attributeValueRepository.delete(id);
  }
}
