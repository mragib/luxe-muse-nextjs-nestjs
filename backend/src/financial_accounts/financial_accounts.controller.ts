import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';
import { CreateFinancialAccountDto } from './dto/create-financial_account.dto';
import { CreateTransferMoneyDto } from './dto/create-transfer-money.dto';
import { UpdateFinancialAccountDto } from './dto/update-financial_account.dto';
import { FinancialAccountsService } from './financial_accounts.service';

@Controller('financial-accounts')
export class FinancialAccountsController {
  constructor(
    private readonly financialAccountsService: FinancialAccountsService,
  ) {}

  @Post()
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  create(
    @Body() createFinancialAccountDto: CreateFinancialAccountDto,
    @GetUser() user: User,
  ) {
    createFinancialAccountDto.created_by = user;
    return this.financialAccountsService.create(createFinancialAccountDto);
  }

  @Post('transfer')
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  transferMoney(
    @Body() createTransferMoneyDto: CreateTransferMoneyDto,
    @GetUser() user: User,
  ) {
    createTransferMoneyDto.created_by = user;
    return this.financialAccountsService.transferMoney(createTransferMoneyDto);
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
