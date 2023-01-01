import { Item } from 'src/item/entities/item.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Status {
  prepairng = 'prepairng',
  delivering = 'delivering',
  delivered = 'delivered',
}
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: Status,
    default: Status.prepairng,
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.orders, { eager: false })
  user: User;

  @ManyToOne(() => Menu, (menu) => menu.orders, { eager: false })
  menu: Menu;

  @ManyToMany(() => Item, (item) => item.order, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  items: Item[];
}
