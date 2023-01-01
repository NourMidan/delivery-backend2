import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { User } from 'src/users/entities/user.entity';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { Item } from 'src/item/entities/item.entity';
import { Cart } from 'src/cart/entities/cart.entity';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    TypeOrmModule.forFeature([Order, Item, Cart]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class OrderModule {}
