import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routers';

import ThemeConfig from '../styles/theme';
import { GlobalStyle } from '../styles/globalStyles';
import { Toaster } from 'react-hot-toast';

export function App() {
  return (
    <BrowserRouter>
      <ThemeConfig>
        <Helmet titleTemplate="%s - Funny Movies" defaultTitle="Funny Movies">
          <meta name="description" content="Funny Movies" />
        </Helmet>
        <Routes />
        <GlobalStyle styles={undefined} />
        <Toaster />
      </ThemeConfig>
    </BrowserRouter>
  );
}
