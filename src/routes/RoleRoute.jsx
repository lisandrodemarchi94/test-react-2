import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";
import ROUTES from "../consts/routes";

const RoleRoute = ({ requiredRole }) => {
    const { token, role } = useAuth();

    if (!token) {
        return <Navigate to={ROUTES.LOGIN} />
    }

    if (role != requiredRole) {
        return <Navigate to={ROUTES.UNAUTHORIZED} />
    }

    return <Outlet />;
};

export default RoleRoute;