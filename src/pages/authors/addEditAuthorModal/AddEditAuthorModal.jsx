/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import ReactDOM from 'react-dom';
import { useCreateAuthor } from '../../../hooks/authors/useCreateAuthor';
import { toast } from 'react-toastify';
import { useUpdateAuthor } from '../../../hooks/authors/useUpdateAuthor';

import "./AddEditAuthorModal.css";

const AddEditAuthorModal = ({ authorSelected, isEdit, isOpen, successCallback, onClose }) => {

    const [author, setAuthor] = useState({
        name: '',
        email: '',
        birthDate: null,
    });

    const isConfirmBtnDisabled = !author?.name || !author?.birthDate || !author?.email;

    useEffect(() => {
        if (isEdit) {
            setAuthor(authorSelected);
        }
    }, [isEdit]);

    const { createAuthor, createAuthorData, createAuthorError, createAuthorLoading } = useCreateAuthor();
    const { updateAuthor, updateAuthorData, updateAuthorError, updateAuthorLoading } = useUpdateAuthor();

    useEffect(() => {
        if (createAuthorLoading) return;
        if (createAuthorError) {
            toast.error("Hubo un error al momento de crear el autor.");
        }
        if (!createAuthorError && createAuthorData) {
            toast.success("Se creo con éxito el autor.");
            successCallback();
        }
    }, [createAuthorData, createAuthorError, createAuthorLoading]);

    useEffect(() => {
        if (updateAuthorLoading) return;
        if (updateAuthorError) {
            toast.error("Hubo un error al momento de editar el autor.");
        }
        if (!updateAuthorError && updateAuthorData) {
            toast.success("Se editó con éxito el autor.");
            successCallback();
        }
    }, [updateAuthorData, updateAuthorError, updateAuthorLoading]);

    const handleChange = (value, type) => {
        setAuthor(prevState => ({
            ...prevState,
            [type]: value,
        }));
    };

    const handleCancel = () => {
        onClose();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        console.log(author);
        if (isEdit) {
            updateAuthor(author);
        } else {
            createAuthor(author);
        }
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-author-content">
                <h3>{isEdit ? 'Editar autor' : 'Agregar autor'}</h3>
                <form onSubmit={handleSubmit} className='form-author'>
                    <div className='author-input-container'>
                        <label className='author-label'>Nombre</label>
                        <input
                            className='author-input'
                            type="text"
                            value={author.name}
                            onChange={(event) => handleChange(event.target.value, 'name')}
                            placeholder='Ingrese nombre'
                        />
                    </div>
                    <div className='author-input-container'>
                        <label className='author-label'>Email</label>
                        <input
                            className='author-input'
                            type="text"
                            value={author.email}
                            onChange={(event) => handleChange(event.target.value, 'email')}
                            placeholder='Ingrese email'
                        />
                    </div>
                    <div className='author-input-container'>
                        <label className='author-label'>Fecha de nacimiento</label>
                        <DatePicker
                            className='author-input'
                            selected={author.birthDate}
                            onChange={(date) => handleChange(date, 'birthDate')}
                            dateFormat={'dd/MM/YYYY'}
                            placeholderText='dd/MM/YYYY'
                        />
                    </div>
                    <div className='author-modal-footer'>
                        <button
                            className='footer-btn cancel'
                            disabled={createAuthorLoading}
                            type='button'
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                        <button
                            className='footer-btn confirm'
                            disabled={isConfirmBtnDisabled || createAuthorLoading}
                            type='submit'
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById('modal-root') // Tener un div con id "modal-root" en el index.html
    );
};

export default AddEditAuthorModal;