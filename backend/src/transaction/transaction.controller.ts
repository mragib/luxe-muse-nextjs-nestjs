import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Get()
  async findAll() {
    return this.transactionService.findAll();
  }
}
