import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  controllers: [UsersController],
  exports: [UserService],
})
export class UserModule {}
