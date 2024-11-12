import ReactDOM from 'react-dom';

import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button className="confirm-button" onClick={onConfirm}>Confirmar</button>
                    <button className="cancel-button" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') // Tener un div con id "modal-root" en el index.html
    );
};

export default ConfirmModal;