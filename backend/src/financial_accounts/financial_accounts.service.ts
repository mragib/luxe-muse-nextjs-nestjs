import { Injectable } from '@nestjs/common';
import { CreateFinancialAccountDto } from './dto/create-financial_account.dto';
import { UpdateFinancialAccountDto } from './dto/update-financial_account.dto';

@Injectable()
export class FinancialAccountsService {
  create(createFinancialAccountDto: CreateFinancialAccountDto) {
    console.log('createFinancialAccountDto', createFinancialAccountDto);
  }

  findAll() {
    return `This action returns all financialAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} financialAccount`;
  }

  update(id: number, updateFinancialAccountDto: UpdateFinancialAccountDto) {
    return `This action updates a #${id} financialAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} financialAccount`;
  }
}
