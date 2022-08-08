import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EnumActionType } from '../../../../enums';
import { Movie, MovieActionParams } from '../../../../types/Movie';
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
    triggerAction(state, _: PayloadAction<MovieActionParams>) {
      return state;
    },
    action(state, action: PayloadAction<MovieActionParams>) {
      switch (action.type) {
        case EnumActionType.LIKE:
          state.list = state.list.map(item => {
            if (item.id !== action.payload.id) return item;
            else {
              return {
                ...item,
                status: EnumActionType.LIKE,
                likeCount: item.likeCount + 1,
              };
            }
          });
          break;
        case EnumActionType.REMOVE_LIKE:
          state.list = state.list.map(item => {
            if (item.id !== action.payload.id) return item;
            else {
              return {
                ...item,
                status: EnumActionType.UNVOTE,
                likeCount: item.likeCount - 1,
              };
            }
          });
          break;
        case EnumActionType.DISLIKE:
          state.list = state.list.map(item => {
            if (item.id !== action.payload.id) return item;
            else {
              return {
                ...item,
                status: EnumActionType.DISLIKE,
                likeCount: item.dislikeCount + 1,
              };
            }
          });
          break;
        case EnumActionType.REMOVE_DISLIKE:
          state.list = state.list.map(item => {
            if (item.id !== action.payload.id) return item;
            else {
              return {
                ...item,
                status: EnumActionType.UNVOTE,
                likeCount: item.dislikeCount - 1,
              };
            }
          });
          break;
      }
    },
  },
});

export const { actions: authActions } = slice;

export const useMovieSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authSaga });
  return { actions: slice.actions };
};
