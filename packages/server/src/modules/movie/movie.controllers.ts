import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '~/guards/auth.guard';
import { ActionMovieDto } from './dto/action-movie';
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
    @Request() req: any
  ): Promise<MovieEntity> {
    return this.movieService.create(createMovieDto, req.user);
  }

  @Post('action')
  @UseGuards(AuthGuard)
  action(
    @Body() actionMovieDto: ActionMovieDto,
    @Request() req: any
  ): Promise<MovieEntity> {
    return this.movieService.action(actionMovieDto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Request() req: any): Promise<MovieEntity[]> {
    return this.movieService.findAll(req.user);
  }
}
