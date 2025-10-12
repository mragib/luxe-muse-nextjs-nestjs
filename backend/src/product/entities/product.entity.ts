import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ProductLine } from '../../product-line/entities/product-line.entity';
import { ProductImage } from '../../product-image/entities/product-image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ unique: true })
  sku: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  image_url: string;

  @ManyToOne(() => ProductLine)
  @JoinColumn({ name: 'productLineId' })
  productLine: ProductLine;

  @Column()
  productLineId: string;

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];
}
