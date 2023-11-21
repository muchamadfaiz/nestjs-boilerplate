import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthRepository } from './auth.repository';
import { RoleModule } from 'src/role/role.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  imports: [
    UserModule,
    RoleModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Atau konfigurasi lainnya sesuai kebutuhan
      signOptions: { expiresIn: '60m' }, // Contoh waktu kadaluwarsa token
    }),
  ],
})
export class AuthModule {}
