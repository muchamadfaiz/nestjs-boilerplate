import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  register() {
    return 'register success';
  }
  login() {
    return 'login success';
  }
}
