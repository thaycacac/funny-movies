import { useCallback, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { withLoading } from '../../hocs';
import { useLoading } from '../../hooks/useLoading';
import LoginForm from './LoginForm';
import { useAuthSlice } from './slice';

interface Props {}

const Login = (props: Props) => {
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading(props);
  const [error, setError] = useState(false);

  const handleLogin = useCallback(
    async ({ email, password }: any) => {
      showLoading();
      dispatch(
        actions.login({ email, password }, (err?: any) => {
          hideLoading();
          if (!err) {
            dispatch(
              actions.getUserInfo((error: any) => {
                if (!error) navigate(-1);
                else console.log('error');
              })
            );
          } else {
            setError(err);
          }
        })
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate]
  );

  const clearError = () => {
    setError(false);
  };

  return (
    <LoginForm onSubmit={handleLogin} error={error} onClearError={clearError} />
  );
};

export default withLoading(Login);
