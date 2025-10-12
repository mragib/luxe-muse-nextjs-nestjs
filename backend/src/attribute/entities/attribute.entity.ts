import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AttributeValue } from '../../attribute-value/entities/attribute-value.entity';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => AttributeValue, (value) => value.attribute)
  values: AttributeValue[];
}
