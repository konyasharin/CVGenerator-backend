import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth';
import { PrismaService } from '@modules/app';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
