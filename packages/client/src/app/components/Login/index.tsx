import { useCallback, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { withLoading } from '../../hocs';
import { useLoading } from '../../hooks/useLoading';
import LoginForm from './LoginForm';

interface Props {}

const Login = (props: Props) => {
  // const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading(props);
  const [error, setError] = useState(false);

  const handleLogin = useCallback(
    ({ username, password }: any) => {
      showLoading();
    },
    [dispatch, navigate]
  );

  const clearError = () => {
    setError(false);
  };

  return (
    <LoginForm onSubmit={handleLogin} error={error} onClearError={clearError} />
  );
};

export default withLoading(Login);
