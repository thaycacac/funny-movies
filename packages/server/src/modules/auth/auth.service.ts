import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async getUserFromEmailAndPassword(email: string, pass: string): Promise<any> {
    const user: UserEntity | null = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.password === pass) {
      return user.safeResponse();
    } else {
      throw new UnauthorizedException();
    }
  }

  async login(loginDto: LoginDto) {
    const userSafe = await this.getUserFromEmailAndPassword(
      loginDto.email,
      loginDto.password
    );
    if (!userSafe) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Account not exist or wrong password',
        },
        HttpStatus.NOT_FOUND
      );
    }
    return {
      access_token: await this.signToken(userSafe),
      user: userSafe,
    };
  }

  async signToken(payload: any): Promise<string> {
    return await this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<boolean> {
    const user = await this.jwtService.verify(token);
    return user;
  }
}
