import React, { useMemo } from 'react';
import { CssBaseline, ThemeOptions } from '@mui/material';
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from '@mui/material/styles';
import componentsOverride from './overrides';

import palette from './palette';

// ----------------------------------------------------------------------

interface ThemeConfigProps {
  children: React.ReactNode;
}

declare module '@mui/material' {
  interface ShapeOptions {
    borderRadiusSm: number | string;
    borderRadiusMd: number | string;
  }
}
declare module '@mui/material/styles' {
  interface Shape {
    borderRadiusSm: number | string;
    borderRadiusMd: number | string;
  }
  interface ShapeOptions {
    borderRadiusSm: number | string;
    borderRadiusMd: number | string;
  }

  interface PaletteColor {
    darker: string;
    lighter: string;
  }
}

export default function ThemeConfig(props: ThemeConfigProps) {
  const { children } = props;
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette,
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
