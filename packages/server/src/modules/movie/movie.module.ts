import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './movie.controllers';
import { MovieEntity } from './movie.entity';
import { MovieService } from './movie.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity]),
    HttpModule,
    AuthModule,
    UserModule,
  ],
  providers: [MovieService],
  controllers: [MovieController],
  exports: [MovieService],
})
export class MovieModule {}
