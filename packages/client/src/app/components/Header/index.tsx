import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from '../Login';
import { selectIsLogined } from '../Login/slice/selectors';
import { useSelector } from 'react-redux';
import NotLogin from '../Login/NotLogin';
import { useNavigate } from 'react-router';
import path from '../../routers/path';

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const isLogined = useSelector(selectIsLogined);

  const gotoHome = () => {
    navigate(path.root);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={gotoHome}
          >
            FUNNY MOVIES
          </Typography>
          {isLogined ? <Login /> : <NotLogin />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
