import { createSelector } from '@reduxjs/toolkit';

import { initialState } from '.';
import { RootState } from '../../../../types/RootState';

const selectSlice = (state: RootState) => state?.movie || initialState;

export const selectMovies = createSelector([selectSlice], state => state?.list);
