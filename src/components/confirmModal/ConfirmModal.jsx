import ReactDOM from 'react-dom';

import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, errorMsg, onClose, onConfirm, message, loading }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                {errorMsg && (
                    <p className='error-text'>{errorMsg}</p>
                )}
                <div className="modal-buttons">
                    <button
                        className="cancel-button"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        className="confirm-button"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : 'Confirmar'}
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') // Tener un div con id "modal-root" en el index.html
    );
};

export default ConfirmModal;