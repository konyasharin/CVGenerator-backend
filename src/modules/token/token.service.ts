import { ReturnUserDto } from '@modules/auth';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenDto } from './token.dto';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  public async createTokens(user: ReturnUserDto): Promise<TokenDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(user, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(user, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
