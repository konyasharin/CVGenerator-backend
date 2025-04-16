import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createUser(user: CreateUserDto) {
    return this.prisma.user.create({ data: user });
  }

  public async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
