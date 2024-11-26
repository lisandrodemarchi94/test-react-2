/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useGetAuthors } from "../../hooks/authors/useGetAuthors";
import { format } from "date-fns";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
import { useDeleteAuthor } from "../../hooks/authors/useDeleteAuthor";
import { toast } from "react-toastify";

import './AuthorsPage.css';

const ActionsComponent = ({ onEdit, onDelete }) => {
    return (
        <>
            <span className="material-icons" onClick={onEdit}>edit</span>
            <span className="material-icons" onClick={onDelete}>delete</span>
        </>
    );
};

const AuthorsPage = () => {

    const [deleteModalState, setDeleteModalState] = useState({
        show: false,
        authorId: null,
        blogsCount: 0,
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { data, error, getAuthors, loading } = useGetAuthors();
    const { deleteAuthor, deleteAuthorError, deleteAuthorLoading, deleteAuthorSuccess } = useDeleteAuthor();

    const deleteAuthorMessage = deleteModalState?.blogsCount > 0
        ? 'El autor que desea eliminar posee blogs. Al eliminarlo, estos tambien se borraran. ¿Desea continuar?'
        : 'Esta a punto de eliminar un autor. ¿Desea continuar?';

    useEffect(() => {
        getAuthors();
    }, []);

    useEffect(() => {
        if (deleteAuthorLoading) return;
        if (deleteAuthorError) {
            toast.error("Ócurrio un error al eliminar el autor.");
        }
        if (deleteAuthorSuccess) {
            setDeleteModalState({
                show: false,
                authorId: null,
                blogsCount: 0,
            });
            toast.success("Se eliminó con éxito el autor.");
            getAuthors();
        }
    }, [deleteAuthorError, deleteAuthorLoading, deleteAuthorSuccess]);

    const handleDeleteAuthor = () => deleteAuthor(deleteModalState.authorId);

    const handleEditAuthor = () => {
        setIsEditModalOpen(true);
    };

    if (loading) {
        return (
            <h1 className="loading">Cargando ...</h1>
        );
    };

    if (error && !loading) {
        return (
            <h1 className="error">Ócurrio un error</h1>
        );
    };

    return (
        <>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Fecha de nacimiento</th>
                            <th>N° de blogs</th>
                            <th>Fecha de creación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length === 0 && (
                            <tr className="empty-row">
                                <td colSpan={6}>
                                    No se encontraron autores.
                                </td>
                            </tr>
                        )}
                        {data?.length > 0 && data?.map((author) => {
                            return (
                                <tr key={author._id}>
                                    <td>{author.name}</td>
                                    <td>{author.email}</td>
                                    <td className="td-center-text">{format(author.birthDate, 'dd/MM/yyyy')}</td>
                                    <td className="td-center-text">{author.blogsCount}</td>
                                    <td className="td-center-text">{format(author.createdDate, 'dd/MM/yyyy')}</td>
                                    <td>
                                        <ActionsComponent
                                            onDelete={() => setDeleteModalState({
                                                show: true,
                                                authorId: author._id,
                                                blogsCount: author.blogsCount
                                            })}
                                            onEdit={handleEditAuthor}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {isEditModalOpen && (
                <></>
            )}
            {deleteModalState.show && (
                <ConfirmModal
                    errorMsg={''}
                    isOpen={deleteModalState.show}
                    loading={false}
                    message={deleteAuthorMessage}
                    onClose={() => setDeleteModalState(false)}
                    onConfirm={handleDeleteAuthor}
                />
            )}
        </>
    );
};

export default AuthorsPage;