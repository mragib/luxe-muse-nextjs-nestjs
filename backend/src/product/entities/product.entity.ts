import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ unique: true })
  slug: string;

  @Column('decimal', { precision: 10, scale: 2 })
  sellingUnitPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  costUnitPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  wholesaleUnitPrice: number;

  @Column({ nullable: true })
  image_url: string;

  @Column({ default: true })
  is_active: boolean;

  @Column()
  unit: string;

  @ManyToOne(() => Brand, (item) => item.product)
  brand: Brand;

  @Column()
  brandId: string;

  @ManyToOne(() => Category, (item) => item.product)
  category: Category;
  @Column()
  categoryId: string;

  // @ManyToOne(() => ProductLine)
  // @JoinColumn({ name: 'productLineId' })
  // productLine: ProductLine;

  // @Column()
  // productLineId: string;

  // @OneToMany(() => ProductImage, (image) => image.product)
  // images: ProductImage[];
}
