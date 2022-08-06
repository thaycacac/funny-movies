import { EnumMessageCode, MESSAGE_CODE } from './../../constants/message-code';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const checkUser = await this.findByEmail(createUserDto.email);
    if (checkUser) {
      throw new HttpException(
        {
          code: EnumMessageCode.M001,
          message: MESSAGE_CODE.M001,
        },
        HttpStatus.CONFLICT
      );
    }
    const user = new UserEntity();
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return this.usersRepository.save(user);
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
