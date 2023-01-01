import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Owner } from 'src/owners/entities/owner.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Owner) private ownersRepository: Repository<Owner>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    super({
      secretOrKey: 'secret701',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: { id: string; type: string }) {
    const { id, type } = payload;

    let user;
    if (type === 'owner') {
      user = await this.ownersRepository.findOne({
        where: { id: id },
        relations: {
          menu: {
            items: true,
            orders: true,
          },
        },
      });
    } else {
      user = await this.usersRepository.findOne({ where: { id: id } });
    }

    if (!user) {
      throw new UnauthorizedException();
    }
    const { password, ...userData } = user;
    return userData;
  }
}
