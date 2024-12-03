import { useEffect, useState } from "react";
import { useGetAuthors } from "../../hooks/authors/useGetAuthors";
import { format } from "date-fns";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";

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

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { data, error, getAuthors, loading } = useGetAuthors();

    useEffect(() => {
        getAuthors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeleteAuthor = () => {
        // TODO: elimiar el autor integardo con el back
        setIsDeleteModalOpen(false);
    };

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
                        {data?.map((author) => {
                            return (
                                <tr key={author._id}>
                                    <td>{author.name}</td>
                                    <td>{author.email}</td>
                                    <td className="td-center-text">{format(author.birthDate, 'dd/MM/yyyy')}</td>
                                    <td className="td-center-text">{author.blogsNumber}</td>
                                    <td className="td-center-text">{format(author.createdDate, 'dd/MM/yyyy')}</td>
                                    <td>
                                        <ActionsComponent
                                            onDelete={() => setIsDeleteModalOpen(true)}
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
            {isDeleteModalOpen && (
                <ConfirmModal
                    errorMsg={''}
                    isOpen={isDeleteModalOpen}
                    loading={false}
                    message={'Esta a punto de eliminar el autor. ¿Desea continuar?'}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDeleteAuthor}
                />
            )}
        </>
    );
};

export default AuthorsPage;