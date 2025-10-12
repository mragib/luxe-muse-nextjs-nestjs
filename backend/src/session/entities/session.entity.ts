import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  session: string;

  @OneToOne(() => User, (type) => type.user_session)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;
}
