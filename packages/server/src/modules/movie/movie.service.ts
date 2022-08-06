import { UserEntity } from './../user/user.entity';
import { ENDPOINT_YOUTUBE, KEY_YOUTUBE } from './../../config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie';
import { MovieEntity } from './movie.entity';
import { AxiosResponse } from 'axios';
import { EnumMessageCode, MESSAGE_CODE } from '~/constants/message-code';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieService: Repository<MovieEntity>,
    private readonly userService: UserService,
    private readonly httpService: HttpService
  ) {}

  getIdYoutubeFromUrl(url: string) {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      throw new HttpException(
        {
          code: EnumMessageCode.M003,
          message: MESSAGE_CODE.M003,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async findMovideByYoutubeId(youtubeId: string): Promise<MovieEntity> {
    return this.movieService.findOne({
      where: {
        youtubeId: youtubeId,
      },
    });
  }
  async callApiGetVideoInfor(url: string): Promise<AxiosResponse<any>> {
    const youtubeId = this.getIdYoutubeFromUrl(url);
    const movie: MovieEntity = await this.findMovideByYoutubeId(youtubeId);
    if (movie) {
      throw new HttpException(
        {
          code: EnumMessageCode.M004,
          message: MESSAGE_CODE.M004,
        },
        HttpStatus.CONFLICT
      );
    }

    return await this.httpService.axiosRef.get(`${ENDPOINT_YOUTUBE}/videos`, {
      params: {
        id: youtubeId,
        part: 'snippet',
        key: KEY_YOUTUBE,
      },
    });
  }

  async create(createMovieDto: CreateMovieDto, userDto: UserDto): Promise<any> {
    const { data }: any = await this.callApiGetVideoInfor(createMovieDto.url);
    const { title, description }: any = data?.items[0]?.snippet;
    const movie = new MovieEntity();
    movie.title = title;
    movie.description = description;
    movie.youtubeId = this.getIdYoutubeFromUrl(createMovieDto.url);

    const user: UserEntity = await this.userService.findByEmail(userDto.email);
    movie.createdBy = user;
    return this.movieService.save(movie);
  }

  async findAll(): Promise<MovieEntity[]> {
    return this.movieService.find();
  }
}
