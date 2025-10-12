import { Exclude } from 'class-transformer';
import { Session } from 'src/session/entities/session.entity';
import { Role } from 'src/types/types';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60, nullable: true })
  name: string;

  @Column({ length: 13, unique: true, nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  is_active: boolean;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  refreshToken: string | null;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  otp: string | null;

  @Column('simple-enum', { enum: Role, default: Role.CUSTOMER })
  role: Role;

  //   for bi directional
  @OneToOne(() => Session, (type) => type.user)
  user_session: Session;

  @DeleteDateColumn()
  deletedAt: Date;
}
