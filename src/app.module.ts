import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OwnersModule } from './owners/owners.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';
import { ItemModule } from './item/item.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      // database: 'deliveryDB',
      // synchronize: true,
      // entities: ['dist/**/*.entity.js'],
      // type: 'postgres',
      // password: '1234',
      // port: 5432,
      // username: 'postgres',
      // host: 'localhost',

      database: 'railway',
      synchronize: true,
      entities: ['dist/**/*.entity.js'],
      type: 'postgres',
      password: 'qnMdDD1EwJUz0GNHjuDK',
      port: 5672,
      username: 'postgres',
      host: 'containers-us-west-113.railway.app',
    }),
    OwnersModule,
    CartModule,
    OrderModule,
    MenuModule,
    ItemModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
