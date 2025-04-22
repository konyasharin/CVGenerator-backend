import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokenService } from './token.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [],
  providers: [TokenService],
  exports: [TokenService, JwtModule],
})
export class TokenModule {}
