import { Theme } from '@mui/material';

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
          borderRadius: 5,
        },
      },
    },
  };
}
