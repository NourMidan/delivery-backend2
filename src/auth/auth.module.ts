import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Owner } from 'src/owners/entities/owner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Owner]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret701',
      signOptions: {
        expiresIn: 7776000,
      },
    }),
  ],
  providers: [jwtStrategy],
})
export class AuthModule {}
