import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import User from 'src/modules/user/infra/entities/user.entity';
import { FindByIdService } from 'src/modules/user/services/find-by-id.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly findUserByConditionService: FindByIdService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user): Promise<any> {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    let user: User;
    try {
      user = await this.findUserByConditionService.execute({ email });

      return user;
    } catch (error) {
      return null;
    }

    const isPasswordValid = compare(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }
}
