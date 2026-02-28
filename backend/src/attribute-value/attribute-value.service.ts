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
      return {
        status: 'success',
        statuscode: 200,
        data: attributeValue,
        message: 'AttributeValue has been created',
      };
    } catch (error) {
      if (error.errno === 19)
        throw new ConflictException('AttributeValue is already exist.');
      throw new InternalServerErrorException('Something went wrong!🔥');
    }
  }

  async findAll() {
    const [data, count] = await this.attributeValueRepository.findAndCount({
      relations: ['attribute'],
    });

    return {
      status: 'success',
      statuscode: 200,
      data: data,
      count,
    };
  }

  findOne(id: string) {
    return this.attributeValueRepository.findOne({
      where: { id },
      relations: ['attribute'],
    });
  }

  async update(id: string, updateAttributeValueDto: UpdateAttributeValueDto) {
    const found = await this.findOne(id);
    console.log('Found AttributeValue for update:', updateAttributeValueDto);
    if (!found) throw new NotFoundException('AttributeValue is not found');
    const updatedAttributeValue = await this.attributeValueRepository.save({
      id,
      ...updateAttributeValueDto,
    });
    return {
      status: 'success',
      statuscode: 200,
      data: updatedAttributeValue,
      message: 'AttributeValue has been updated',
    };
  }

  remove(id: string) {
    return this.attributeValueRepository.delete(id);
  }
}
