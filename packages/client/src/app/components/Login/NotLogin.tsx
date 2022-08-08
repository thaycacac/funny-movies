import { Button, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { LocalStorageService } from '../../../services';
import path from '../../routers/path';
import { useAuthSlice } from './slice';
import { selectEmail } from './slice/selectors';

function NotLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useAuthSlice();

  const email = useSelector(selectEmail);

  const handleClickShareMovie = () => {
    navigate(path.share);
  };

  const handleClickLogout = () => {
    dispatch(actions.logout());
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <span>Welcome {email}</span>
      <Button
        size="large"
        variant="outlined"
        color="inherit"
        sx={{
          borderRadius: '8px',
          margin: '0 5px !important',
        }}
        onClick={handleClickShareMovie}
      >
        Share a movie
      </Button>
      <Button
        size="large"
        variant="outlined"
        color="inherit"
        sx={{
          borderRadius: '8px',
          margin: '0 10px !important',
        }}
        onClick={handleClickLogout}
      >
        Logout
      </Button>
    </Stack>
  );
}

export default NotLogin;
