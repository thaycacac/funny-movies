import { AxiosPromise } from 'axios';
import { MovieActionParams, MovieParams } from '../../types/Movie';
import request from './request';

export const MOVIE_API = {
  root: '/videos',
  action: '/videos/action',
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

export const apiPostAction = (params: MovieActionParams): AxiosPromise<any> => {
  return request({
    url: MOVIE_API.action,
    method: 'post',
    data: params,
  });
};
