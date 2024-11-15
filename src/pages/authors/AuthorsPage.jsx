import { useEffect, useState } from "react";
import { useGetAuthors } from "../../hooks/authors/useGetAuthors";
import { format } from "date-fns";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
import { useDeleteAuthor } from "../../hooks/authors/useDeleteAuthor";

import './AuthorsPage.css';

const ActionsComponent = ({ onEdit, onDelete }) => {
    return (
        <>
            <span
                title="Editar"
                className="material-icons"
                onClick={onEdit}
            >
                edit
            </span>
            <span
                title="Eliminar"
                className="material-icons"
                onClick={onDelete}
            >
                delete
            </span>
        </>
    );
};

const AuthorsPage = () => {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
        isOpen: false,
        authorId: null,
    });

    const { authors, authorsError, authorsLoading, getAuthors } = useGetAuthors();
    const { deleteAuthor } = useDeleteAuthor();

    useEffect(() => {
        getAuthors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeleteAuthor = () => {
        console.log({ isDeleteModalOpen })
        deleteAuthor({ id: isDeleteModalOpen?.id });
    };

    const handleEditAuthor = () => {

    };

    if (authorsLoading) {
        return <h1 className="loading">Cargando...</h1>
    }

    if (authorsError) {
        return <h1 className="error">Erorr al obtener los autores.</h1>
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>N° de blogs</th>
                        <th>Fecha de nacimiento</th>
                        <th>Fecha de creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author) => {
                        return (
                            <tr key={author._id}>
                                <td>{author.name}</td>
                                <td>{author.email}</td>
                                <td className="td-center-text">{author.blogsCount}</td>
                                <td className="td-center-text">
                                    {format(author.birthDate, 'dd/MM/yyyy')}
                                </td>
                                <td className="td-center-text">
                                    {format(author.createdDate, 'dd/MM/yyyy')}
                                </td>
                                <td>
                                    <ActionsComponent
                                        onDelete={() => setIsDeleteModalOpen({
                                            isOpen: true,
                                            id: author._id,
                                        })}
                                        onEdit={handleEditAuthor}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {isDeleteModalOpen.isOpen && (
                <ConfirmModal
                    isOpen={isDeleteModalOpen.isOpen}
                    message='¿Esta seguro que desea eliminar el autor?'
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDeleteAuthor}
                />
            )}
        </div>
    );
};

export default AuthorsPage;