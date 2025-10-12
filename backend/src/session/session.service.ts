import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}
  async create(createSessionDto: CreateSessionDto) {
    try {
      const { userId, session } = createSessionDto;

      await this.sessionRepository.upsert(
        { userId, session }, // values to insert or update
        ['userId'], // conflict column(s)
      );

      return { user: userId };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  findAll() {
    return this.sessionRepository.find();
  }

  async findOne(id: string) {
    const data = await this.sessionRepository.findOneBy({ userId: id });

    if (!data) throw new NotFoundException('Session is not found');

    return { session: data.session };
  }

  remove(id: string) {
    return this.sessionRepository.delete({ userId: id });
  }
}
