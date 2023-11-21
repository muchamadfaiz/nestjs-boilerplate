import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepository {
  constructor(private prisma: PrismaService) {}

  async findRoleByName(name: string) {
    return this.prisma.role.findUnique({
      where: { name },
    });
  }
}
