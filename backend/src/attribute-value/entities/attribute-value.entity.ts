import { ProductLine } from 'src/product-line/entities/product-line.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attribute } from '../../attribute/entities/attribute.entity';

@Entity()
export class AttributeValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Attribute)
  @JoinColumn({ name: 'attributeId' })
  attribute: Attribute;

  @Column()
  attributeId: string;

  @ManyToMany(() => ProductLine, (item) => item.attributeValues)
  productLine: ProductLine[];
}
