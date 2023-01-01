import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Owner } from './entities/owner.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Menu } from 'src/menu/entities/menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Owner, Menu]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret701',
      signOptions: {
        expiresIn: 7776000,
      },
    }),
  ],
  controllers: [OwnersController],
  providers: [OwnersService],
  exports: [OwnersService],
})
export class OwnersModule {}
