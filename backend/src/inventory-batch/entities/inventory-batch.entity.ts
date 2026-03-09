import { ProductLine } from 'src/product-line/entities/product-line.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class InventoryBatch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProductLine, (item) => item.inventoryBatches)
  productLine: ProductLine;

  @Column()
  branchId: number;

  @Column()
  quantityRemaining: number;

  @Column('decimal', { precision: 12, scale: 2 })
  unitCost: number;

  @Column()
  referenceId: number;

  @Column()
  referenceType: string;

  @CreateDateColumn()
  created_at: Date;
}
