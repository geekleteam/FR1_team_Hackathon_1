import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { env } from '~/env';
import Loader from '../Loader';

export const AuthenticatedRoute = () => {
  const location = useLocation();
  const { isAuthenticated,isLoading,error,user } = useAuth0();

  if(isLoading){
    return <Loader />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={env.VITE_APP_LOGIN_PATH} state={{ from: location }} replace />;
};
