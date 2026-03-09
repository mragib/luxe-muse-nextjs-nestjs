import { Inventory } from 'src/inventory/entities/inventory.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Country } from './country.entity';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20, unique: true })
  code: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @ManyToOne(() => Country)
  country: Country;

  @Column({ nullable: true })
  countryId: number;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => User, { nullable: true })
  manager: User;

  @Column({ nullable: true })
  managerId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  //   Bidirectional relation
  @OneToMany(() => Inventory, (item) => item.branch)
  inventories: Inventory[];
}
