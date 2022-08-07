import { Global, GlobalProps, css } from '@emotion/react';

export const GlobalStyle = (props: GlobalProps) => (
  <Global
    {...props}
    styles={css`
      html,
      body {
        height: 100%;
        width: 100%;
      }

      body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }

      #root {
        min-height: 100%;
        min-width: 100%;
      }

      p,
      label {
        font-family: Georgia, Times, 'Times New Roman', serif;
        line-height: 1.5em;
      }

      input,
      select {
        font-family: inherit;
        font-size: inherit;
      }
    `}
  />
);
