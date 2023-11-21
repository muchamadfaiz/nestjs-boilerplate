// src/user/user.repository.ts

import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { name: string; email: string }): Promise<User> {
    return this.prisma.user.create({ data });
  }
  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  async assignRoleToUser(userId: string, roleId: string) {
    return this.prisma.roleUser.create({
      data: {
        user_id: userId,
        role_id: roleId,
      },
    });
  }
}
