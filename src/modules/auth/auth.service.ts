import {
  AlreadyExistsException,
  BadRequestException,
} from '@common/exceptions';
import { Crypto } from '@common/utils';
import { TokenService } from '@modules/token';
import { Injectable } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { CreateUserDto, LoginDto, ReturnUserDto } from './auth.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  public async register(user: CreateUserDto) {
    const userWithSameEmail = await this.authRepository.getUserByEmail(
      user.email,
    );
    if (userWithSameEmail)
      throw new AlreadyExistsException({
        message: 'User with this email already exists',
      });

    user.password = await Crypto.hash(user.password);

    return await this.authRepository.createUser(user);
  }

  public async login(loginInfo: LoginDto) {
    const error = 'User with this email or password not found';
    const user = await this.authRepository.getUserByEmail(loginInfo.email);

    if (!user) throw new BadRequestException({ message: error });

    const isCompare = await Crypto.compare(loginInfo.password, user.password);
    if (!isCompare) throw new BadRequestException({ message: error });

    const plainedUser = { ...user, password: undefined };
    return await this.tokenService.createTokens(plainedUser);
  }
}
