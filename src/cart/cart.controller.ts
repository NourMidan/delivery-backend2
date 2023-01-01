import { Controller, Get, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CartService } from './cart.service';

@Controller('cart')
@UseGuards(AuthGuard())
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getUserCart(@GetUser() user: User) {
    return this.cartService.getUserCart(user);
  }

  @Patch('/add')
  addToCart(@Body() body: { item: string }, @GetUser() user: User) {
    return this.cartService.addToCart(body, user);
  }
  @Patch('/remove')
  removeFromCart(@Body() body: { item: string }, @GetUser() user: User) {
    return this.cartService.removeFromCart(body, user);
  }

  @Post('/clear')
  clear(@GetUser() user: User) {
    return this.cartService.clear(user);
  }
}
