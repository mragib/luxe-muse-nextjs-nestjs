import { Injectable } from '@nestjs/common';
import { CreateChartOfAccountingDto } from './dto/create-chart-of-accounting.dto';
import { UpdateChartOfAccountingDto } from './dto/update-chart-of-accounting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chartofaccounting } from './entities/chart-of-accounting.entity';
import { TreeRepository } from 'typeorm';
import * as fs from 'fs';
import csv from 'csv-parser';

@Injectable()
export class ChartOfAccountingService {
  constructor(
    @InjectRepository(Chartofaccounting)
    private readonly chartOfAccountingRepository: TreeRepository<Chartofaccounting>,
  ) {}

  create(createChartOfAccountingDto: CreateChartOfAccountingDto) {
    return 'This action adds a new chartOfAccounting';
  }

  async findAll() {
    const [chartOfAccountings, count] =
      await this.chartOfAccountingRepository.findAndCount({
        relations: { parent: true },
        order: { code: 'ASC' },
      });

    return {
      data: chartOfAccountings,
      count,
      status: 'success',
      statuscode: 200,
    };
  }

  async findOneWithDescendants(chartOfAccount: Chartofaccounting) {
    return this.chartOfAccountingRepository.findDescendants(chartOfAccount);
  }

  findOne(id: number) {
    return `This action returns a #${id} chartOfAccounting`;
  }

  update(id: number, updateChartOfAccountingDto: UpdateChartOfAccountingDto) {
    return `This action updates a #${id} chartOfAccounting`;
  }

  remove(id: number) {
    return `This action removes a #${id} chartOfAccounting`;
  }

  async parseCsvAndInsertData(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const results: Partial<Chartofaccounting>[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          const formattedData: Partial<Chartofaccounting> = {
            ...data,
            is_leaf: data.is_leaf === '1',
            parent: data.parentId
              ? ({ id: Number(data.parentId) } as any)
              : null,
          };

          results.push(formattedData);
        })
        .on('end', async () => {
          try {
            await this.chartOfAccountingRepository.insert(results);
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', reject);
    });
  }
}
