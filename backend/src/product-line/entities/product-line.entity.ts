import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class ProductLine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @OneToMany(() => Product, (product) => product.productLine)
  // products: Product[];
}
