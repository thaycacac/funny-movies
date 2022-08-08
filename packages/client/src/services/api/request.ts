import axios from 'axios';
import toast from 'react-hot-toast';
import { LocalStorageService } from '..';
import path from '../../app/routers/path';
import { MESSAGE_CODE } from '../../constants';
import { EnumMessageCode } from '../../enums';

const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  timeout: 10000,
});

service.interceptors.request.use(config => {
  const token = LocalStorageService.get(LocalStorageService.OAUTH_TOKEN);
  if (token)
    config.headers = {
      'Content-Type': config?.headers?.['Content-Type']
        ? config?.headers['Content-Type']
        : 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    };
  return config;
});

service.interceptors.response.use(
  (response: any) => {
    if (response.status !== 200 && response.status !== 201) {
      if (response.code === 401) {
        console.log(
          'You have been logged out, you can cancel to stay on this page, or log in again'
        );
      }
      return Promise.reject(new Error(response.message || 'Error'));
    }
    return response.data;
  },
  error => {
    if (error.response?.status !== 401 && error.response?.status !== 403) {
      toast.error(MESSAGE_CODE[error.response?.data?.code as EnumMessageCode]);
    }
    if (error.response?.status === 500) {
      toast.error(MESSAGE_CODE[EnumMessageCode.M007]);
    }
    const originalRequest = error.config;
    if (
      (error.response?.status === 401 && !originalRequest._retry) ||
      (error.response?.status === 403 && !originalRequest._retry)
    ) {
      LocalStorageService.removeItem(LocalStorageService.OAUTH_TOKEN);
      toast.error(MESSAGE_CODE[EnumMessageCode.M006]);
      window.location.href = path.root;
    }
    return Promise.reject(error);
  }
);

export default service;
