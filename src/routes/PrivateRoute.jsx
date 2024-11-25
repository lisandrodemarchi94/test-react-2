import ROUTES from "../consts/routes";
import { useAuth } from "../hooks/auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const { token } = useAuth();
    return token ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default PrivateRoute;