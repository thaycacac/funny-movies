import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EnumActionType } from '../../../../enums';
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
    success(state) {
      state.list = [
        {
          id: '1',
          title: 'Movie Title',
          sharedBy: 'thaycacac@gmail.com',
          likeCount: 89,
          dislikeCount: 90,
          description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer',
          youtubeId: 'dsfsdf',
          status: EnumActionType.LIKE,
        },
        {
          id: '1',
          title: 'Movie Title',
          sharedBy: 'thaycacac@gmail.com',
          likeCount: 89,
          dislikeCount: 90,
          description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer',
          youtubeId: 'dsfsdf',
          status: EnumActionType.LIKE,
        },
        {
          id: '1',
          title: 'Movie Title',
          sharedBy: 'thaycacac@gmail.com',
          likeCount: 89,
          dislikeCount: 90,
          description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer',
          youtubeId: 'dsfsdf',
          status: EnumActionType.LIKE,
        },
      ];
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
