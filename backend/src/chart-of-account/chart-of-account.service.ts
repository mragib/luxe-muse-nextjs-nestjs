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

    function toNullableNumber(value?: string): number | null {
      if (!value) return null;

      const trimmed = value.trim();
      if (trimmed === '') return null;

      const num = Number(trimmed);
      return Number.isNaN(num) ? null : num;
    }

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: CsvChartOfAccountRow) => {
          console.log('Parsed CSV row:', data.parentId); // Debug log to check the parsed data
          const formattedData: Partial<ChartOfAccount> = {
            id: Number(data.id),
            code: Number(data.code),
            name: data.name?.toLowerCase(),
            gl_type: data.gl_type,
            is_leaf: data.is_leaf === '1',
            is_active: true,
            dr_amount: toNullableNumber(data.dr_amount) ?? 0,
            cr_amount: toNullableNumber(data.cr_amount) ?? 0,

            parentId: toNullableNumber(data.parentId),
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
