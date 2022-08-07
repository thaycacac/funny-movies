import { AxiosPromise } from 'axios';
import { AuthParams, AuthResponse } from '../../types/Auth';
import request from './request';

export const AUTH_API = {
  login: '/auth/login',
  profile: '/profile',
};

export const apiPostLogin = (
  params: AuthParams
): AxiosPromise<AuthResponse> => {
  return request({
    url: AUTH_API.login,
    method: 'post',
    data: params,
  });
};

export const apiGetInforUser = (): AxiosPromise => {
  return request({
    url: AUTH_API.profile,
    method: 'get',
  });
};
