import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }
}
