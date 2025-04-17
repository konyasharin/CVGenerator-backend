import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, ReturnUserDto } from './dto/user.dto';
import { BaseResponse, Response } from '@common/responses';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @Response(BaseResponse(ReturnUserDto))
  public async register(@Body() user: CreateUserDto) {
    return await this.authService.register(user);
  }
}
