import { Navigate, RouteObject } from 'react-router';
import HomePage from '../pages';
import SharePage from '../pages/share';

import path from './path';

export const publicRouter: RouteObject[] = [
  { element: <Navigate to={path.root} replace /> },
  { element: <HomePage />, path: path.root },
];

export const privateRouter: RouteObject[] = [
  { element: <SharePage />, path: path.share },
];
