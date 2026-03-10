import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFinancialAccountDto } from './dto/create-financial_account.dto';
import { UpdateFinancialAccountDto } from './dto/update-financial_account.dto';
import { FinancialAccountsService } from './financial_accounts.service';

@Controller('financial-accounts')
export class FinancialAccountsController {
  constructor(
    private readonly financialAccountsService: FinancialAccountsService,
  ) {}

  @Post()
  create(@Body() createFinancialAccountDto: CreateFinancialAccountDto) {
    return this.financialAccountsService.create(createFinancialAccountDto);
  }

  @Get()
  findAll() {
    return this.financialAccountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financialAccountsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFinancialAccountDto: UpdateFinancialAccountDto,
  ) {
    return this.financialAccountsService.update(+id, updateFinancialAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financialAccountsService.remove(+id);
  }
}
