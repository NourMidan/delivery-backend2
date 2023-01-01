import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Item } from 'src/item/entities/item.entity';
import { Owner } from 'src/owners/entities/owner.entity';
import { User } from 'src/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: User) {
    const items = await this.itemRepository.find({
      where: { id: In(createOrderDto.items) },
    });

    if (items.length < 1) {
      throw new ConflictException('Empty cart');
    }

    const order = this.orderRepository.create({
      menu: createOrderDto.menu,
      user,
    });
    order.items = items;

    const newOrder = await this.orderRepository.save(order);

    if (newOrder) {
      this.clearCart(user);
    }
  }

  async findOne(id: string) {
    return await this.orderRepository.findOne({
      where: { id },
      relations: { menu: true, user: true },
    });
  }

  async getUserOrders(userData: User) {
    const orders = userData.orders.reduce(
      (acc, current) => acc.concat(current.id),
      [],
    );
    return await this.orderRepository.find({
      where: { id: In(orders) },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, owner: Owner) {
    const order = await this.findOne(id);
    const { status } = updateOrderDto;

    if (order.menu.id !== owner.menu.id) {
      throw new UnauthorizedException('unauthorized');
    } else {
      return await this.orderRepository.update(id, { status });
    }
  }

  async clearCart(user: User) {
    const { id } = user.cart;
    const cart = await this.cartRepository.findOneBy({ id });
    cart.items = [];
    cart.menuId = '';
    return await this.cartRepository.save(cart);
  }
}
