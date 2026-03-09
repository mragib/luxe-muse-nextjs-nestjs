import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './entities/branch.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch) private branchRepository: Repository<Branch>,
  ) {}

  async create(createBranchDto: CreateBranchDto) {
    try {
      const branch = await this.branchRepository.save(createBranchDto);
      return {
        status: 'success',
        statuscode: 200,
        data: branch,
        message: 'Branch has been created',
      };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong!🔥');
    }
  }

  async findAll() {
    const [data, count] = await this.branchRepository.findAndCount();

    return {
      status: 'success',
      statuscode: 200,
      data: data,
      count,
    };
  }

  findOne(id: number) {
    return this.branchRepository.findOneBy({ id });
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    const found = await this.findOne(id);
    if (!found) throw new NotFoundException('Branch is not found');
    const updatedBrand = await this.branchRepository.update(
      { id },
      updateBranchDto,
    );
    return {
      status: 'success',
      statuscode: 200,
      data: updatedBrand,
      message: 'Branch has been updated',
    };
  }

  remove(id: number) {
    console.log('id', id);
    return this.branchRepository.delete(id);
  }
}
