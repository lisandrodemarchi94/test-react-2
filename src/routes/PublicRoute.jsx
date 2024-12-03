import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/auth/useAuth';
import ROUTES from '../consts/routes';

const PublicRoute = () => {
  const { token } = useAuth();

  return token ? <Navigate to={ROUTES.BLOGS} /> : <Outlet />;
};

export default PublicRoute;
