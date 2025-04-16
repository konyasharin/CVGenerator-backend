import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './dto/user.dto';
import { AlreadyExistsException } from '../common/exceptions/AlreadyExistsException';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  public async register(user: CreateUserDto) {
    const userWithSameEmail = await this.authRepository.findUserByEmail(
      user.email,
    );
    if (userWithSameEmail)
      throw new AlreadyExistsException(
        'Пользователь с таким email уже существует',
      );

    return await this.authRepository.createUser(user);
  }
}
