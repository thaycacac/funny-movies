import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie';
import { MovieEntity } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly postService: Repository<MovieEntity>
  ) {}

  async create(createPostDto: CreateMovieDto): Promise<MovieEntity> {
    return this.postService.save(new MovieEntity());
  }

  async findAll(): Promise<MovieEntity[]> {
    return this.postService.find();
  }
}
