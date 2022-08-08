import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../../../types/Movie';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../../utils/redux-injectors';

import { authSaga } from './saga';
import { MovieState } from './types';

export const initialState: MovieState = {
  list: [],
};

const slice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    success(state, action: PayloadAction<Movie[]>) {
      state.list = action.payload;
    },
    clear(state) {
      state.list = [];
    },
    trigger(state) {
      return state;
    },
  },
});

export const { actions: authActions } = slice;

export const useMovieSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authSaga });
  return { actions: slice.actions };
};
