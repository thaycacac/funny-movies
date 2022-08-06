import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './movie.controllers';
import { MovieEntity } from './movie.entity';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), HttpModule],
  providers: [MovieService],
  controllers: [PostController],
})
export class MovieModule {}
