import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { LoginOwnerDto } from './dto/login-owner.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post('/signup')
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownersService.signUp(createOwnerDto);
  }

  @Post('/signin')
  signIn(@Body() loginOwnerDto: LoginOwnerDto) {
    return this.ownersService.signIn(loginOwnerDto);
  }

  @Get('validate')
  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: User) {
    return user;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ownersService.findOne(id);
  // }
}
