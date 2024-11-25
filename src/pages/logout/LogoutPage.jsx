import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
import { useAuth } from "../../hooks/auth/useAuth";

const LogoutPage = () => {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleCancel = () => navigate(-1);

    const handleConfirm = () => logout();

    return (
        <ConfirmModal
            isOpen={true}
            loading={false}
            message='¿Desea cerrar sesión?'
            onClose={handleCancel}
            onConfirm={handleConfirm}
        />
    );
};

export default LogoutPage;