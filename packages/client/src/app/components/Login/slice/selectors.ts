import { createSelector } from '@reduxjs/toolkit';

import { initialState } from '.';
import { RootState } from '../../../../types/RootState';

const selectSlice = (state: RootState) => state?.auth || initialState;

export const selectAuth = createSelector([selectSlice], state => state);
export const selectIsLogined = createSelector([selectSlice], state =>
  !!state?.email ? false : true
);
export const selectEmail = createSelector([selectSlice], state => state?.email);
