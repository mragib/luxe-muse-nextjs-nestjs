import { AttributeValue } from 'src/attribute-value/entities/attribute-value.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => AttributeValue, (value) => value.attribute)
  values: AttributeValue[];
}
