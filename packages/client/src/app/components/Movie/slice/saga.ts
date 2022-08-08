import { apiGetVideos } from './../../../../services/api/movie';
import { call, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { authActions as actions } from '.';
import { Movie } from '../../../../types/Movie';

export function* trigger(
  action: PayloadAction<any, string, (error?: any) => void>
) {
  try {
    const response: Movie[] = yield call(apiGetVideos);
    yield put(actions.success(response));
  } catch (error: any) {
    action.meta(error.response?.data);
    console.log(
      '🚀 ~ file: saga.ts ~ line 8 ~ function*login ~ error',
      error.response?.data
    );
  }
}

export function* authSaga() {
  yield takeLatest(actions.trigger.type, trigger);
}
