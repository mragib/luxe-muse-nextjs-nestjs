import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { ProductLine } from 'src/product-line/entities/product-line.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  // Bidirectional relation with product line
  @OneToMany(() => ProductLine, (item) => item.product)
  productLine: ProductLine[];
}
