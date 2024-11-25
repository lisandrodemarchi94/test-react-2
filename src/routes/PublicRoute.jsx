import ROUTES from "../consts/routes";
import { useAuth } from "../hooks/auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const { token } = useAuth();
    return token ? <Navigate to={ROUTES.HOME} /> : <Outlet />;
};

export default PublicRoute;