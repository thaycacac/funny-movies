import { ENDPOINT_YOUTUBE, KEY_YOUTUBE } from './../../config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie';
import { MovieEntity } from './movie.entity';
import { AxiosResponse } from 'axios';
import { EnumMessageCode, MESSAGE_CODE } from '~/constants/message-code';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieService: Repository<MovieEntity>,
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

  async callApiGetVideoInfor(url: string): Promise<AxiosResponse<any>> {
    return await this.httpService.axiosRef.get(`${ENDPOINT_YOUTUBE}/videos`, {
      params: {
        id: this.getIdYoutubeFromUrl(url),
        part: 'snippet',
        key: KEY_YOUTUBE,
      },
    });
  }

  async create(createMovieDto: CreateMovieDto): Promise<any> {
    const { data }: any = await this.callApiGetVideoInfor(createMovieDto.url);
    const { title, description }: any = data?.items[0]?.snippet;
    const movie = new MovieEntity();
    movie.title = title;
    movie.description = description;
    movie.youtubeId = this.getIdYoutubeFromUrl(createMovieDto.url);
    return this.movieService.save(movie);
  }

  async findAll(): Promise<MovieEntity[]> {
    return this.movieService.find();
  }
}
