import { createSelector } from '@reduxjs/toolkit';

import { initialState } from '.';
import { RootState } from '../../../../types/RootState';

const selectSlice = (state: RootState) => state.auth || initialState;

export const selectAuth = createSelector([selectSlice], state => state);
