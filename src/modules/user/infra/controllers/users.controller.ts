import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import { FindByIdService } from '../../services/find-by-id.service';
import { UsersService } from '../../services/users.service';
import User from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly findByIdUserService: FindByIdService,
  ) {}

  @Post()
  async createUser(
    @Body() { firstname, lastname, email, password, cellphone }: ICreateUserDTO,
  ): Promise<User> {
    return this.userService.execute({
      firstname,
      lastname,
      email,
      password,
      cellphone,
    });
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<User | null> {
    return this.findByIdUserService.execute({ id });
  }
}
