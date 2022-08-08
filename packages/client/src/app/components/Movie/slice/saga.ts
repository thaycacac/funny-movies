import { call, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { authActions as actions } from '.';
import { AuthParams, AuthResponse } from '../../../../types/Auth';

export function* trigger(
  action: PayloadAction<AuthParams, string, (error?: any) => void>
) {
  try {
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
