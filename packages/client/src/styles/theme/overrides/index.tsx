import { merge } from 'lodash';

import { Theme } from '@mui/material';

import Button from './Button';

export default function ComponentsOverrides(theme: Theme) {
  return merge(Button(theme));
}
