import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto, ReturnUserDto } from './auth.dto';
import { Response } from '@common/responses';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @Response(CreateUserDto.Response)
  public async register(@Body() user: CreateUserDto): Promise<ReturnUserDto> {
    return await this.authService.register(user);
  }

  @Post('/login')
  public async login(@Body() loginInfo: LoginDto) {
    return await this.authService.login(loginInfo);
  }
}
