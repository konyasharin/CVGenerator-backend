import { PrismaService } from '@modules/app';
import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './auth.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createUser(user: CreateUserDto) {
    return this.prisma.user.create({ data: user, omit: { password: true } });
  }

  public async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      omit: { password: true },
    });
  }

  public async getUserLoginData(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: { email: true, password: true },
    });
  }
}
