import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthParams } from '../../../../types/Auth';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../../utils/redux-injectors';

import { authSaga } from './saga';
import { AuthState } from './types';

export const initialState: AuthState = {
  email: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<any>) {
      state.email = action.payload.email;
    },
    clear(state) {
      state.email = null;
    },
    logout(state) {
      return state;
    },
    login: {
      reducer(state) {
        return state;
      },
      prepare(params: AuthParams, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },
  },
});

export const { actions: authActions } = slice;

export const useAuthSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authSaga });
  return { actions: slice.actions };
};
