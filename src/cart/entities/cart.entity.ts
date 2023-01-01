import { Item } from 'src/item/entities/item.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Item, (item) => item.cart, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  items: Item[];

  @Column({ nullable: true })
  menuId: string;

  @OneToOne(() => User, (user) => user.cart, { eager: false })
  user: User;
}
