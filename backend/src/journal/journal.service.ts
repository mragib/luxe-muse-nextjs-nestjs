import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Journal } from './entities/journal.entity';

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(Journal)
    private readonly journalRepository: Repository<Journal>,
  ) {}
}
