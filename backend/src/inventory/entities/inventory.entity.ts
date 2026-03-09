import { Branch } from 'src/branch/entities/branch.entity';
import { ProductLine } from 'src/product-line/entities/product-line.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['productLine', 'branch'])
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProductLine, (item) => item.inventories, { eager: true })
  productLine: ProductLine;

  @ManyToOne(() => Branch, (branch) => branch.inventories, { eager: true })
  branch: Branch;

  @Column()
  branchId: number;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  reserved: number;

  @Column({ type: 'int', default: 0 })
  available: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
