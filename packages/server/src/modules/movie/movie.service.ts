import { ENDPOINT_YOUTUBE, KEY_YOUTUBE } from './../../config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie';
import { MovieEntity } from './movie.entity';
import { AxiosResponse } from 'axios';
import { MESSAGE_CODE } from '~/constants';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { EnumActionType, EnumMessageCode } from '~/enums';
import { ActionMovieDto } from './dto/action-movie';
import { UserEntity } from '../user/user.entity';
import { ResponseSuccessDto } from '~/shared/success-dto';

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

  async findMovideByYoutubeId(youtubeId: string): Promise<MovieEntity | null> {
    return this.movieService.findOne({
      where: {
        youtubeId: youtubeId,
      },
    });
  }
  async callApiGetVideoInfor(url: string): Promise<AxiosResponse<any>> {
    const youtubeId = this.getIdYoutubeFromUrl(url);
    const movie: MovieEntity | null = await this.findMovideByYoutubeId(
      youtubeId
    );
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

    const user: UserEntity | null = await this.userService.findByEmail(
      userDto.email
    );
    if (user) {
      movie.createdBy = user;
    }
    await this.movieService.save(movie);
    const responseSuccessDto = new ResponseSuccessDto();
    responseSuccessDto.code = EnumMessageCode.M014;
    return responseSuccessDto;
  }

  async action(actionMovieDto: ActionMovieDto, userDto: UserDto): Promise<any> {
    const movie: MovieEntity | null = await this.movieService.findOne({
      where: {
        id: actionMovieDto.id,
      },
    });
    if (!movie) {
      throw new HttpException(
        {
          code: EnumMessageCode.M005,
          message: MESSAGE_CODE.M005,
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const responseSuccessDto = new ResponseSuccessDto();

    const user: UserEntity | null = await this.userService.findByEmail(
      userDto.email
    );
    if (user) {
      switch (actionMovieDto.type) {
        case EnumActionType.LIKE:
          movie?.likeBy?.length
            ? (movie.likeBy = [...movie.likeBy, user])
            : (movie.likeBy = [user]);
          responseSuccessDto.code = EnumMessageCode.M011;
          break;
        case EnumActionType.REMOVE_LIKE:
          movie.likeBy = movie.likeBy?.filter(item => {
            console.log(item.id, user.id);
            return item.id !== user.id;
          });
          // responseSuccessDto.code = EnumMessageCode.M012;
          break;
        case EnumActionType.DISLIKE:
          movie?.dislikeBy?.length
            ? (movie.dislikeBy = [...movie.dislikeBy, user])
            : (movie.dislikeBy = [user]);
          responseSuccessDto.code = EnumMessageCode.M013;
          break;
        case EnumActionType.REMOVE_DISLIKE:
          movie.dislikeBy = movie.dislikeBy?.filter(
            item => item.id !== user.id
          );
          // responseSuccessDto.code = EnumMessageCode.M012;
          break;
      }
    }
    await this.movieService.save(movie);

    return responseSuccessDto;
  }

  getStatus(movie: MovieEntity, user: UserEntity | null) {
    if (!user) {
      return EnumActionType.UNVOTE;
    }
    if (movie.likeBy?.map(item => item.id).includes(user.id)) {
      return EnumActionType.LIKE;
    } else if (movie.dislikeBy?.map(item => item.id).includes(user.id)) {
      return EnumActionType.DISLIKE;
    }
    return EnumActionType.UNVOTE;
  }

  async findAll(userDto: UserDto | null): Promise<any> {
    const movies: MovieEntity[] = await this.movieService.find({
      relations: {
        likeBy: true,
        dislikeBy: true,
        createdBy: true,
      },
    });
    let user: UserEntity | null = null;
    if (userDto) {
      user = await this.userService.findByEmail(userDto.email);
    }
    return movies.map(movie => {
      return {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        youtubeId: movie.youtubeId,
        likeCount: movie.likeBy.length,
        dislikeCount: movie.dislikeBy.length,
        status: this.getStatus(movie, user),
        sharedBy: movie.createdBy.email,
      };
    });
  }
}
