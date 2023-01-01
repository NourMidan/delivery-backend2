import { Menu } from 'src/menu/entities/menu.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isOwner: boolean;

  @OneToOne(() => Menu, (menu) => menu.owner, { eager: true })
  @JoinColumn()
  menu: Menu;
}
