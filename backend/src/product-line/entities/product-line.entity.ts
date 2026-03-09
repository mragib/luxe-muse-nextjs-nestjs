import { AttributeValue } from 'src/attribute-value/entities/attribute-value.entity';
import { InventoryBatch } from 'src/inventory-batch/entities/inventory-batch.entity';
import { InventoryMovement } from 'src/inventory-movement/entities/inventory-movement.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { ProductImage } from 'src/product-image/entities/product-image.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductLine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  sku: string;

  @Column('decimal', { precision: 10, scale: 2 })
  sellUnitPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  costUnitPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  wholesaleUnitPrice: number;

  @ManyToOne(() => Product, (item) => item.productLine)
  product: Product;

  @Column()
  productId: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToMany(() => AttributeValue, (item) => item.productLine)
  @JoinTable({
    name: 'product_attribute',
  })
  attributeValues: AttributeValue[];

  // Bidirectional relations
  @OneToMany(() => ProductImage, (item) => item.productLine, { cascade: true })
  productImages: ProductImage[];

  @OneToMany(() => Inventory, (item) => item.productLine)
  inventories: Inventory[];

  @OneToMany(() => InventoryMovement, (item) => item.productLine)
  inventoryMovements: InventoryMovement[];

  @OneToMany(() => InventoryBatch, (item) => item.productLine)
  inventoryBatches: InventoryBatch[];
}
