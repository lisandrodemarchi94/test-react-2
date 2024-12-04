/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useGetAuthors } from "../../hooks/authors/useGetAuthors";
import { format } from "date-fns";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
import AddEditAuthorModal from "./addEditAuthorModal/AddEditAuthorModal";
import { useDeleteAuthor } from "../../hooks/authors/useDeleteAuthor";
import { toast } from "react-toastify";

import './AuthorsPage.css';

const ActionsComponent = ({ onEdit, onDelete }) => {
    return (
        <>
            <span className="material-icons action-btn" onClick={onEdit}>edit</span>
            <span className="material-icons action-btn" onClick={onDelete}>delete</span>
        </>
    );
};

const AuthorsPage = () => {

    const [deleteAuthorModalState, setDeleteAuthorModalState] = useState({
        isOpen: false,
        authorSelected: null,
    });
    const [addEditAuthorModalState, setAddEditAuthorModalState] = useState({
        isEdit: false,
        isOpen: false,
        authorSelected: null,
    });

    const { data, error, getAuthors, loading } = useGetAuthors();
    const { deleteAuthor, deleteAuthorError, deleteAuthorLoading, deleteAuthorSuccess } = useDeleteAuthor();

    const deleteAuthorMessage = deleteAuthorModalState?.authorSelected?.blogsCount > 0
        ? `El autor ${deleteAuthorModalState?.authorSelected?.name} posee blogs asociados. Si elimina dicho autor, se eliminaran los blogs. ¿Desea continuar?`
        : `Esta a punto de eliminar el autor ${deleteAuthorModalState?.authorSelected?.name}. ¿Desea continuar?`;

    useEffect(() => {
        getAuthors();
    }, []);

    useEffect(() => {
        if (deleteAuthorLoading) return;
        if (deleteAuthorError) {
            toast.error("Hubo un error al momento de eliminar el autor.");
        }
        if (!deleteAuthorError && deleteAuthorSuccess) {
            setDeleteAuthorModalState({
                authorSelected: null,
                isOpen: false,
            });
            getAuthors();
            toast.success("Se elimino correctamente el autor.");
        }
    }, [deleteAuthorSuccess, deleteAuthorError, deleteAuthorLoading]);

    const handleDeleteAuthor = () => {
        deleteAuthor(deleteAuthorModalState?.authorSelected?._id);
    };

    const handleClickAddAuthor = () => {
        setAddEditAuthorModalState({
            isEdit: false,
            isOpen: true,
            authorSelected: null,
        });
    };

    const handleSuccessCallback = () => {
        setAddEditAuthorModalState({
            isEdit: false,
            isOpen: false,
            authorSelected: null,
        });
        getAuthors();
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
                <div className="add-icon-container">
                    <h2>Listado de autores</h2>
                    <span className="material-icons add-btn" onClick={handleClickAddAuthor}>add</span>
                </div>
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
                        {data?.map((author) => {
                            return (
                                <tr key={author._id}>
                                    <td>{author.name}</td>
                                    <td>{author.email}</td>
                                    <td className="td-center-text">{format(author.birthDate, 'dd/MM/yyyy')}</td>
                                    <td className="td-center-text">{author.blogsCount ?? 0}</td>
                                    <td className="td-center-text">{format(author.createdDate, 'dd/MM/yyyy')}</td>
                                    <td>
                                        <ActionsComponent
                                            onDelete={() => setDeleteAuthorModalState({
                                                authorSelected: author,
                                                isOpen: true,
                                            })}
                                            onEdit={() => setAddEditAuthorModalState({
                                                isEdit: true,
                                                authorSelected: author,
                                                isOpen: true,
                                            })}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {addEditAuthorModalState?.isOpen && (
                <AddEditAuthorModal
                    authorSelected={addEditAuthorModalState?.authorSelected}
                    isOpen={addEditAuthorModalState?.isOpen}
                    isEdit={addEditAuthorModalState?.isEdit}
                    successCallback={handleSuccessCallback}
                    onClose={() => setAddEditAuthorModalState({
                        authorSelected: null,
                        isOpen: false,
                    })}
                />
            )}
            {deleteAuthorModalState?.isOpen && (
                <ConfirmModal
                    errorMsg={''}
                    isOpen={deleteAuthorModalState?.isOpen}
                    loading={false}
                    message={deleteAuthorMessage}
                    onClose={() => setDeleteAuthorModalState({
                        authorSelected: null,
                        isOpen: false,
                    })}
                    onConfirm={handleDeleteAuthor}
                />
            )}
        </>
    );
};

export default AuthorsPage;