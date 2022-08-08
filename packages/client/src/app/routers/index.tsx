import { useRoutes, Navigate } from 'react-router-dom';
import { Layouts as DefaultLayout } from '../layouts/Loadable';
import path from './path';
import { isAuthenticated } from '../../utils/auth';
import { privateRouter, publicRouter } from './routerRoles';
import { useAuthSlice } from '../components/Login/slice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { LocalStorageService } from '../../services';

export default function Routers() {
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(
        actions.loginSuccess({
          email: LocalStorageService.get(LocalStorageService.USER_INFO),
        })
      );
    }
  });

  const getPrivateRoute = () => {
    if (isAuthenticated()) {
      return privateRouter;
    }
    return [];
  };

  return useRoutes([
    {
      path: path.root,
      element: <DefaultLayout />,
      children: [...publicRouter, ...getPrivateRoute()],
    },
    { path: path.all, element: <Navigate to={path.notFound} replace /> },
  ]);
}
