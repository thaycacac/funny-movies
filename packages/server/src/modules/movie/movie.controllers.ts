import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie';
import { MovieEntity } from './movie.entity';
import { MovieService } from './movie.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto): Promise<MovieEntity> {
    return this.postService.create(createMovieDto);
  }

  @Get()
  findAll(): Promise<MovieEntity[]> {
    return this.postService.findAll();
  }
}
