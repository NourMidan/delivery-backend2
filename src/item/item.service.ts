import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto, owner: Owner) {
    const { name, description } = createItemDto;
    if (!owner.isOwner) {
      throw new UnauthorizedException('unothorized');
    } else {
      const item = this.itemRepository.create({
        name,
        description,
        menu: owner.menu,
      });
      try {
        return await this.itemRepository.save(item);
      } catch (error) {
        if (error.code === '23505') {
          const message =
            error.detail.match(/\(([^)]+)\)/)[1] + ' already Exists';
          throw new ConflictException(message);
        }
      }
    }
  }

  async findOne(id: string) {
    return await this.itemRepository.findOneBy({ id });
  }

  async update(id: string, updateItemDto: UpdateItemDto, owner: Owner) {
    const { name, description } = updateItemDto;
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: { menu: true },
    });

    if (!owner.isOwner || owner.menu.id !== item.menu.id) {
      throw new UnauthorizedException('unauthorized');
    } else {
      await this.itemRepository.update(id, { name, description });
      return await this.itemRepository.findOne({ where: { id } });
    }
  }

  async remove(id: string, owner: Owner) {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: { menu: true },
    });

    if (!owner.isOwner || owner.menu.id !== item.menu.id) {
      throw new UnauthorizedException('unauthorized');
    } else {
      return await this.itemRepository.delete(id);
    }
  }
}
