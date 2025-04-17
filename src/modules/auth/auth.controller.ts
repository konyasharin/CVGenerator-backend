import { Response } from '@common/responses';
import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto, LoginDto, ReturnUserDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @Response(CreateUserDto.Response)
  public async register(@Body() user: CreateUserDto): Promise<ReturnUserDto> {
    return await this.authService.register(user);
  }

  @Post('/login')
  @Response(LoginDto.Response)
  public async login(@Body() loginInfo: LoginDto) {
    return await this.authService.login(loginInfo);
  }
}
