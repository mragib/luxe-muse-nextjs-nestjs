import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}
  createFinancialAccountTransaction(
    transactionData: any,
    manager: EntityManager,
  ) {
    const transaction = manager.create(Transaction, {
      transaction_date: new Date(),
      description: transactionData.description,
      total_amount: transactionData.amount,
      transaction_type: transactionData.type,
    });
    return manager.save(transaction);
  }
}
