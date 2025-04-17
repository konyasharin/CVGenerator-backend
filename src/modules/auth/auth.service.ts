import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CreateUserDto, LoginDto } from './auth.dto';
import { AlreadyExistsException } from '@common/exceptions';
import { Crypto } from '@common/utils';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  public async register(user: CreateUserDto) {
    const userWithSameEmail = await this.authRepository.getUserByEmail(
      user.email,
    );
    if (userWithSameEmail)
      throw new AlreadyExistsException('User with this email already exists');

    user.password = await Crypto.hash(user.password);

    return await this.authRepository.createUser(user);
  }

  public async login(loginInfo: LoginDto) {
    const error = 'User with this email or password not found';
    const user = await this.authRepository.getUserLoginData(loginInfo.email);

    if (!user) throw new BadRequestException(error);

    const isCompare = await Crypto.compare(loginInfo.password, user.password);
    if (!isCompare) throw new BadRequestException(error);

    return user;
  }
}
