import { PrismaService } from '@modules/app';
import { AuthModule } from '@modules/auth';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
