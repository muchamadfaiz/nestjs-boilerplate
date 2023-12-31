import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/user/user.repository';
import { AuthRepository } from './auth.repository';
import { RoleRepository } from 'src/role/role.repository';
import { LoginDto } from './dtos/login.dto';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
    private roleRepository: RoleRepository,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    try {
      const { email, password } = registerDto;

      const userExists = await this.userRepository.findUserByEmail(email);
      if (userExists) {
        throw new ConflictException('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userRepository.createUser({
        name: registerDto.name,
        email: registerDto.email,
      });

      await this.authRepository.createAuth({
        user_id: user.id,
        password: hashedPassword,
        provider: 'local',
      });

      // Mencari customer role
      const role = await this.roleRepository.findRoleByName('customer');
      if (!role) {
        throw new Error('Customer role not found');
      }

      // Membuat id di pivot table
      await this.userRepository.assignRoleToUser(user.id, role.id);

      return { user };
    } catch (err) {
      if (err instanceof ConflictException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const auth = await this.prisma.auth.findFirst({
      where: { user_id: user.id, provider: 'local' },
    });

    if (!auth || !(await bcrypt.compare(password, auth.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
