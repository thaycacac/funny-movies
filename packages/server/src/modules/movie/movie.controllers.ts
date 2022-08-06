import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '~/guards/auth.guard';
import { CreateMovieDto } from './dto/create-movie';
import { MovieEntity } from './movie.entity';
import { MovieService } from './movie.service';

@Controller('videos')
export class PostController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createMovieDto: CreateMovieDto,
    @Request() req
  ): Promise<MovieEntity> {
    return this.movieService.create(createMovieDto, req.user);
  }

  @Get()
  findAll(): Promise<MovieEntity[]> {
    return this.movieService.findAll();
  }
}
