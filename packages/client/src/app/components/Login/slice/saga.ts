import { call, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { authActions as actions } from '.';
import { AuthParams, AuthResponse } from '../../../../types/Auth';
import { apiPostLogin } from '../../../../services/api/auth';
import { LocalStorageService } from '../../../../services';
import toast from 'react-hot-toast';
import { EnumMessageCode } from '../../../../enums';
import { MESSAGE_CODE } from '../../../../constants';

export function* login(
  action: PayloadAction<AuthParams, string, (error?: any) => void>
) {
  try {
    const { email, password } = action.payload;
    const response: AuthResponse = yield call(apiPostLogin, {
      email,
      password,
    });
    LocalStorageService.set(
      LocalStorageService.OAUTH_TOKEN,
      response.access_token
    );
    LocalStorageService.set(LocalStorageService.USER_INFO, response.email);
    toast.success(MESSAGE_CODE[response.code] as EnumMessageCode);
    yield put(actions.loginSuccess(response));
    action.meta();
    window.location.reload();
  } catch (error: any) {
    action.meta(error.response?.data);
    console.log(
      '🚀 ~ file: saga.ts ~ line 8 ~ function*login ~ error',
      error.response?.data
    );
  }
}

export function* logout() {
  try {
    LocalStorageService.removeItem(LocalStorageService.OAUTH_TOKEN);
    LocalStorageService.removeItem(LocalStorageService.USER_INFO);
    toast.success(MESSAGE_CODE[EnumMessageCode.M010]);
    yield put(actions.clear());
    window.location.reload();
  } catch (error: any) {
    console.log(
      '🚀 ~ file: saga.ts ~ line 8 ~ function*logout ~ error',
      error.response?.data
    );
  }
}

export function* authSaga() {
  yield takeLatest(actions.login.type, login);
  yield takeLatest(actions.logout.type, logout);
}
