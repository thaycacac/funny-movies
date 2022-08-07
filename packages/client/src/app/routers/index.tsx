import { useRoutes, Navigate } from 'react-router-dom';
import { Layouts as DefaultLayout } from '../layouts/Loadable';
import path from './path';
import { isAuthenticated } from '../../utils/auth';
import { privateRouter, publicRouter } from './routerRoles';

export default function Routers() {
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
