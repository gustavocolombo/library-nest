import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './infra/controllers/users.controller';
import User from './infra/entities/user.entity';
import { FindByIdService } from './services/find-by-id.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, FindByIdService],
  controllers: [UsersController],
})
export class UserModule {}
