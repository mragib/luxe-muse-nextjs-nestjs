import { InventoryMovementType } from 'src/common/common.enums';
import { ProductLine } from 'src/product-line/entities/product-line.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class InventoryMovement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProductLine, (item) => item.inventoryMovements)
  productLine: ProductLine;

  @Column()
  productLineId: string;

  @Column('int')
  quantity: number;

  @Column({ type: 'text' })
  movementType: InventoryMovementType;

  @Column({ nullable: true })
  referenceId: string;

  @CreateDateColumn()
  createdAt: Date;
}
