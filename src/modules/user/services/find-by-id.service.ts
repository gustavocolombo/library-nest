import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import User from '../infra/entities/user.entity';

@Injectable()
export class FindByIdService {
  constructor(
    @InjectRepository(User)
    private readonly usersService: Repository<User>,
  ) {}

  async execute(
    condition: FindConditions<User>,
    options?: FindOneOptions<User>,
  ): Promise<User | null> {
    try {
      const user = await this.usersService.findOneOrFail(condition, options);

      return user;
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }
}
