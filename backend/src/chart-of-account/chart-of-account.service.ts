import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import csv from 'csv-parser';
import * as fs from 'fs';
import { CsvChartOfAccountRow } from 'src/common/common.enums';
import { TreeRepository } from 'typeorm';
import { CreateChartOfAccountDto } from './dto/create-chart-of-account.dto';
import { UpdateChartOfAccountDto } from './dto/update-chart-of-account.dto';
import { ChartOfAccount } from './entities/chart-of-account.entity';

@Injectable()
export class ChartOfAccountService {
  constructor(
    @InjectRepository(ChartOfAccount)
    private readonly chartOfAccountRepository: TreeRepository<ChartOfAccount>,
  ) {}
  async create(createChartOfAccountDto: CreateChartOfAccountDto) {
    try {
      const chartOfAccount = await this.chartOfAccountRepository.save(
        createChartOfAccountDto,
      );
      return {
        status: 'success',
        statuscode: 200,
        data: chartOfAccount,
        message: 'Chart of account has been created',
      };
    } catch (error) {
      if (error.errno === 19)
        throw new ConflictException('Chart of accounting already exists.');
      throw new InternalServerErrorException('Something went wrong!🔥');
    }
  }

  async findAll() {
    const [chartOfAccounts, count] =
      await this.chartOfAccountRepository.findAndCount({
        relations: { parent: true },
        order: { code: 'ASC' },
      });

    return {
      data: chartOfAccounts,
      count,
      status: 'success',
      statuscode: 200,
    };
  }

  async findOneWithDescendants(chartOfAccount: ChartOfAccount) {
    return this.chartOfAccountRepository.findDescendants(chartOfAccount);
  }

  findOne(id: number) {
    return this.chartOfAccountRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateChartOfAccountDto: UpdateChartOfAccountDto) {
    const found = await this.findOne(id);
    if (!found) throw new NotFoundException('Chart of account is not found');
    const updatedProduct = await this.chartOfAccountRepository.save({
      id,
      ...updateChartOfAccountDto,
    });
    return {
      status: 'success',
      statuscode: 200,
      data: updatedProduct,
      message: 'Chart of account has been updated',
    };
  }

  remove(id: number) {
    return this.chartOfAccountRepository.delete(id);
  }

  async parseCsvAndInsertData(filePath: string): Promise<void> {
    const results: Partial<ChartOfAccount>[] = [];

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: CsvChartOfAccountRow) => {
          const formattedData: Partial<ChartOfAccount> = {
            id: Number(data.id),
            code: Number(data.code),
            name: data.name?.toLowerCase(),
            gl_type: data.gl_type,
            is_leaf: data.is_leaf === '1',
            dr_amount: Number(data.dr_amount) || 0,
            cr_amount: Number(data.cr_amount) || 0,
            parentId: data.parentId ? Number(data.parentId) : undefined,
          };

          results.push(formattedData);
        })
        .on('end', resolve)
        .on('error', reject);
    });

    // ✅ Safe async area (no ESLint issues)
    await this.chartOfAccountRepository.insert(results);
  }
}
