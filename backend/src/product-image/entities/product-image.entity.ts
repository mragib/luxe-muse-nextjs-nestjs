import { ProductLine } from 'src/product-line/entities/product-line.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  alt: string;

  @Column({ default: false })
  isPrimary: boolean;

  @ManyToOne(() => ProductLine, (item) => item.productImages)
  productLine: ProductLine;

  @Column()
  productLineId: string;
}
