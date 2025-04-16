import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, ReturnUserDto } from './dto/user.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ type: ReturnUserDto })
  public async register(@Body() user: CreateUserDto) {
    return await this.authService.register(user);
  }
}
