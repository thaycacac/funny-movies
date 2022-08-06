import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './movie.controllers';
import { MovieEntity } from './movie.entity';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  providers: [MovieService],
  controllers: [PostController],
})
export class MovieModule {}
