import { MovieActionParams } from './../../../../types/Movie';
import { apiGetVideos, apiPostAction } from './../../../../services/api/movie';
import { call, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { authActions as actions } from '.';
import { Movie } from '../../../../types/Movie';
import { SuccessResponse } from '../../../../types/Response';
import { MESSAGE_CODE } from '../../../../constants';
import toast from 'react-hot-toast';

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

export function* triggerAction(
  action: PayloadAction<MovieActionParams, string, (error?: any) => void>
) {
  try {
    const { id, type } = action.payload;
    const response: SuccessResponse = yield call(apiPostAction, { id, type });
    toast.success(MESSAGE_CODE[response.code]);
    yield put(actions.action(action.payload));
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
  yield takeLatest(actions.triggerAction.type, triggerAction);
}
