import { call, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { authActions as actions } from '.';
// import { LocalStorageService } from '../../../../services';
import { AuthParams, AuthResponse } from '../../../../types/Auth';
import { apiPostLogin } from '../../../../services/api/auth';
import { LocalStorageService } from '../../../../services';

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
    yield put(actions.loginSuccess(response));
    action.meta();
  } catch (error: any) {
    action.meta(error.response?.data);
    console.log(
      '🚀 ~ file: saga.ts ~ line 8 ~ function*login ~ error',
      error.response?.data
    );
  }
}

// function* getUserInfo(action: PayloadAction<(error?: any) => void>) {
//   try {
//     const userInfo: UserInfo = yield call(keycloakService.getUserInfo);
//     LocalStorageService.set(LocalStorageService.USER_INFO, userInfo);
//     action.payload();
//   } catch (error: any) {
//     action.payload(error.response?.data);
//   }
// }

export function* authSaga() {
  yield takeLatest(actions.login.type, login);
  // yield takeLatest(actions.getUserInfo.type, getUserInfo);
}
