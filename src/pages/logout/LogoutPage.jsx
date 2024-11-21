import { useAuth } from "../../hooks/auth/useAuth";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleClose = () => navigate(-1);

    return (
        <ConfirmModal
            isOpen={true}
            loading={false}
            message='¿Esta seguro que desea cerrar sesión?'
            onClose={handleClose}
            onConfirm={() => logout()}
        />
    );
};

export default LogoutPage;