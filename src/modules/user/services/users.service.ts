import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersService: Repository<User>,
  ) {}

  async execute({
    firstname,
    lastname,
    email,
    password,
    cellphone,
  }: ICreateUserDTO): Promise<User> {
    try {
      let user = await this.usersService.findOne({
        where: { email: email },
      });

      if (!user) {
        const hashedPass = await hash(password, 8);

        user = await this.usersService.create({
          firstname,
          lastname,
          email,
          password: hashedPass,
        });

        await this.usersService.save(user);

        return user;
      }

      delete user.password;

      return user;
    } catch (error) {
      throw new Error('Usuário não pode ser cadastrado');
    }
  }
}
