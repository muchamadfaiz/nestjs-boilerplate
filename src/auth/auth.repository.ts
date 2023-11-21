// src/auth/auth.repository.ts

import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Auth, Provider } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}
  async createAuth(data: {
    user_id: string;
    password: string;
    provider: Provider;
  }): Promise<Auth> {
    return this.prisma.auth.create({
      data,
    });
  }
}
