import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  currency: string;

  @Column({ nullable: true })
  flag: string;

  @Column({ nullable: true })
  symbol: string;

  @Column({ nullable: true })
  capital: string;
}
