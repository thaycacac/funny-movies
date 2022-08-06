import { EnumMessageCode, MESSAGE_CODE } from './../../constants/message-code';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from '~/config';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { email, password } = createUserDto;
    const checkUser = await this.findByEmail(email);
    if (checkUser) {
      throw new HttpException(
        {
          code: EnumMessageCode.M001,
          message: MESSAGE_CODE.M001,
        },
        HttpStatus.CONFLICT
      );
    }
    const hashPassword = await bcrypt.hash(password, SALT_OR_ROUNDS);
    const user = new UserEntity();
    user.email = email;
    user.password = hashPassword;
    this.usersRepository.save(user);
    return user.safeResponse();
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
