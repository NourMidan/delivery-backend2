import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Owner } from 'src/owners/entities/owner.entity';

@Controller('order')
@UseGuards(AuthGuard())
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create')
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: User) {
    return this.orderService.create(createOrderDto, user);
  }

  @Get('/list')
  getUserOrders(@GetUser() user: User) {
    return this.orderService.getUserOrders(user);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderService.findOne(id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @GetUser() owner: Owner,
  ) {
    return this.orderService.update(id, updateOrderDto, owner);
  }
}
