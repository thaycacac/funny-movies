import { MESSAGE_CODE } from '../../constants';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login';
import { UserEntity } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../user/dto/user.dto';
import { EnumMessageCode } from '~/enums';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { GetLoginDto } from '../user/dto/get-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async getUserFromEmailAndPassword(
    email: string,
    password: string
  ): Promise<any> {
    const user: UserEntity | null = await this.userService.findByEmail(email);
    if (!user) {
      const createUserDto = new CreateUserDto();
      createUserDto.email = email;
      createUserDto.password = password;
      const userCreated = await this.userService.create(createUserDto);
      const newUser: UserEntity = new UserEntity();
      newUser.email = userCreated.email;
      return { user: newUser.safeResponse(), code: EnumMessageCode.M008 };
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return { user: user.safeResponse(), code: EnumMessageCode.M009 };
      } else {
        throw new HttpException(
          {
            code: EnumMessageCode.M002,
            error: MESSAGE_CODE.M002,
          },
          HttpStatus.NOT_FOUND
        );
      }
    }
  }

  async login(loginDto: LoginDto): Promise<GetLoginDto> {
    const { user, code } = await this.getUserFromEmailAndPassword(
      loginDto.email,
      loginDto.password
    );
    const getLoginDto = new GetLoginDto();
    getLoginDto.email = loginDto.email;
    getLoginDto.access_token = await this.signToken(user);
    getLoginDto.code = code;
    return getLoginDto;
  }

  async signToken(payload: any): Promise<string> {
    return await this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<UserDto> {
    const user: any = await this.jwtService.verify(token);
    const userDto = new UserDto();
    userDto.email = user.email;
    return userDto;
  }
}
