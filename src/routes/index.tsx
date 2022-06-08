import { Navigate, useRoutes } from 'react-router-dom';
import LoginPage from '../pages/Login';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: '*',
          element: <Navigate to='/' replace />,
        },
      ],
    },
  ]);
}
