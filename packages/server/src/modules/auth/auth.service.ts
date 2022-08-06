import { EnumMessageCode, MESSAGE_CODE } from './../../constants/message-code';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login';
import { UserEntity } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async getUserFromEmailAndPassword(
    email: string,
    password: string
  ): Promise<any> {
    const user: UserEntity | null = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException(
        {
          status: EnumMessageCode.M002,
          error: MESSAGE_CODE.M002,
        },
        HttpStatus.NOT_FOUND
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user.safeResponse();
    } else {
      throw new HttpException(
        {
          status: EnumMessageCode.M002,
          error: MESSAGE_CODE.M002,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  async login(loginDto: LoginDto) {
    const userSafe = await this.getUserFromEmailAndPassword(
      loginDto.email,
      loginDto.password
    );
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
