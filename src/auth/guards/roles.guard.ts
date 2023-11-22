import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * Mendapatkan metadata 'roles' dari handler yang sedang diakses.
 * Memeriksa apakah ada role yang diperlukan. Jika tidak, maka semua pengguna diizinkan.
 * Memeriksa role pengguna yang terautentikasi dan membandingkannya dengan role yang diperlukan.
 * Mengizinkan akses jika pengguna memiliki salah satu role yang dibutuhkan, atau melemparkan ForbiddenException jika tidak.
 */

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Jika tidak ada role yang spesifik diperlukan, semua user diizinkan.
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    // User memiliki salah satu role yang diperlukan.
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () =>
      user.roles && roles.some((role) => user.roles.includes(role));

    if (user && hasRole()) {
      return true;
    }

    throw new ForbiddenException('You are not authorized!');
  }
}
