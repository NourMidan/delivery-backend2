import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { Userdata } from './interfaces';
import { Cart } from 'src/cart/entities/cart.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    private jwt: JwtService,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const { name, email, password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newUser = this.usersRepository.create({
      name,
      email,
      password: hash,
    });

    let user: User;
    try {
      user = await this.usersRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        const message =
          error.detail.match(/\(([^)]+)\)/)[1] + ' already Exists';
        throw new ConflictException(message);
      }
    }
    // creating cart for new user
    const newCart = this.cartRepository.create();
    const cart = await this.cartRepository.save(newCart);
    await this.usersRepository.update(user.id, { cart });
    return user;
  }

  async signIn(loginUserDto: LoginUserDto): Promise<Userdata> {
    const { name, password } = loginUserDto;
    const user = await this.usersRepository.findOneBy({ name });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      const payload = { id: result.id, type: 'user' };
      const token = this.jwt.sign(payload);
      return { ...result, token };
    } else {
      throw new UnauthorizedException('wrong credntioals');
    }
  }

  // async findOne(id: string) {
  //   let user: User;

  //   // check if uuid syntax valid
  //   try {
  //     user = await this.usersRepository.findOneBy({ id });
  //   } catch (error) {
  //     throw new ConflictException('Invalid Id');
  //   }

  //   if (!user) {
  //     throw new NotFoundException(`user with id ${id} not found`);
  //   }
  //   return user;
  // }
}
