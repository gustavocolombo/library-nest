import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from '../auth/services/auth.service';
import { FindByIdService } from '../user/services/find-by-id.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../user/infra/entities/user.entity';
import { LocalStrategy } from './infra/strategies/local.strategy';
import { JwtStrategy } from './infra/strategies/jwt.strategy';
import { AuthController } from './infra/controllers/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    PassportModule,
    UserModule,
    JwtModule.register({
      privateKey: process.env.JWT_TOKEN_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, FindByIdService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
