import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('materialized-path')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true, unique: true })
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image_url: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

  @Column({ nullable: true })
  parentId: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_leaf: boolean;
}
