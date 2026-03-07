import { AttributeValue } from 'src/attribute-value/entities/attribute-value.entity';
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

  @OneToMany(() => ProductImage, (item) => item.productLine, { cascade: true })
  productImages: ProductImage[];
}
