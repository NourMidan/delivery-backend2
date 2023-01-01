import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/user.decorator';
import { Owner } from 'src/owners/entities/owner.entity';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(AuthGuard())
  @Post('/create')
  create(@Body() createItemDto: CreateItemDto, @GetUser() owner: Owner) {
    return this.itemService.create(createItemDto, owner);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @GetUser() owner: Owner,
  ) {
    return this.itemService.update(id, updateItemDto, owner);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() owner: Owner) {
    return this.itemService.remove(id, owner);
  }
}
