import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
  ) {}

  async create(createAttributeDto: CreateAttributeDto) {
    try {
      const attribute = await this.attributeRepository.save(createAttributeDto);
      return {
        status: 'success',
        statuscode: 200,
        data: attribute,
        message: 'Attribute has been created',
      };
    } catch (error) {
      if (error.errno === 19)
        throw new ConflictException('Attribute is already exist.');
      throw new InternalServerErrorException('Something went wrong!🔥');
    }
  }

  async findAll() {
    const [data, count] = await this.attributeRepository.findAndCount({
      relations: ['values'],
    });

    return {
      status: 'success',
      statuscode: 200,
      data: data,
      count,
    };
  }

  findOne(id: string) {
    return this.attributeRepository.findOne({
      where: { id },
      relations: ['values'],
    });
  }

  async update(id: string, updateAttributeDto: UpdateAttributeDto) {
    const found = await this.findOne(id);
    if (!found) throw new NotFoundException('Attribute is not found');
    const updatedAttribute = await this.attributeRepository.save({
      id,
      ...updateAttributeDto,
    });
    return {
      status: 'success',
      statuscode: 200,
      data: updatedAttribute,
      message: 'Attribute has been updated',
    };
  }

  remove(id: string) {
    return this.attributeRepository.delete(id);
  }
}
