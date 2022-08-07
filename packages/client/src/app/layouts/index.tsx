import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Header from '../components/Header';

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  flexDirection: 'column',
});

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  overflow: 'hidden',
  background: 'white',
  marginTop: '4rem',
  minHeight: 'calc(100vh - 4rem)',
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

function Layouts() {
  return (
    <RootStyle>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </RootStyle>
  );
}

export default memo(Layouts);
