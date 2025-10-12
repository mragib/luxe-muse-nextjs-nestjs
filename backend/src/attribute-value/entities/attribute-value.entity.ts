import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Attribute } from '../../attribute/entities/attribute.entity';

@Entity()
export class AttributeValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @ManyToOne(() => Attribute)
  @JoinColumn({ name: 'attributeId' })
  attribute: Attribute;

  @Column()
  attributeId: string;
}
