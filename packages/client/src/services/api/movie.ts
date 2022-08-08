import { AxiosPromise } from 'axios';
import { MovieParams } from '../../types/Movie';
import request from './request';

export const MOVIE_API = {
  root: '/videos',
};

export const apiPostShare = (params: MovieParams): AxiosPromise<any> => {
  return request({
    url: MOVIE_API.root,
    method: 'post',
    data: params,
  });
};

export const apiGetVideos = (): AxiosPromise<any> => {
  return request({
    url: MOVIE_API.root,
    method: 'get',
  });
};
