import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    console.log('register dto:', registerDto);
    return this.authService.register(registerDto);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
