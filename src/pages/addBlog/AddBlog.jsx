/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
import { useCreateBlog } from "../../hooks";
import { useGetAuthors } from "../../hooks/authors/useGetAuthors";
import { toast } from "react-toastify";

import "react-datepicker/dist/react-datepicker.css";
import "./AddBlog.css";

const initBlogValue = {
    author: '',
    title: '',
    description: '',
    createdDate: new Date(),
    image: '',
    urlToImage: '',
};

const AddBlog = () => {

    const [blog, setBlog] = useState(initBlogValue);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { createBlog, cleanError, error, loading, data } = useCreateBlog();
    const { data: authors, error: authorsError, getAuthors, loading: authorsLoading } = useGetAuthors();

    useEffect(() => {
        getAuthors();
    }, []);

    useEffect(() => {
        if (!authorsLoading && authorsError) {
            toast.error("Error al obtener los autores.");
        }
        if (authors?.length > 0) {
            setBlog(prevState => ({
                ...prevState,
                author: authors[0],
            }));
        }
    }, [authors, authorsError, authorsLoading]);

    useEffect(() => {
        if (loading) return;
        if (!error && data) {
            handleCloseModal();
            setBlog(initBlogValue);
            toast.success("Se creó con éxito el nuevo blog.");
        };
    }, [error, loading, data]);

    const isBtnDisabled = !(blog.author && blog.title && blog.description);

    const handleCloseModal = () => {
        cleanError();
        setIsModalOpen(false);
    }

    const handleChange = (value, type) => {
        setBlog((prevState) => {
            return {
                ...prevState,
                [type]: value,
            };
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setBlog((prevState) => {
            return {
                ...prevState,
                image: file || null,
                urlToImage: file ? URL.createObjectURL(file) : null,
            };
        });
    };

    const handleClearImage = () => {
        if (blog.urlToImage) {
            URL.revokeObjectURL(blog.urlToImage);
        }
        setBlog((prevState) => ({
            ...prevState,
            image: null,
            urlToImage: null,
        }));
    };

    const handleConfirm = () => createBlog(blog);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (blog.author && blog.title) {
            setIsModalOpen(true);
        };
    };

    return (
        <>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form-blog">
                    <label htmlFor="" className="label-blog">Autor</label>
                    <select
                        className="input-blog"
                        value={blog.author}
                        onChange={(event) => handleChange(event.target.value, 'author')}
                    >
                        {authors?.length > 0 && authors?.map((author) => {
                            return <option value={author._id} key={author._id}>{author.name}</option>
                        })}
                    </select>
                    <label htmlFor="" className="label-blog">Titulo</label>
                    <input
                        className="input-blog"
                        type="text"
                        value={blog.titulo}
                        onChange={(event) => handleChange(event.target.value, 'title')}
                        placeholder="Ingrese titulo"
                    />
                    <label htmlFor="" className="label-blog">Fecha de publicación</label>
                    <DatePicker
                        className="input-blog"
                        selected={blog.createdDate}
                        onChange={(date) => handleChange(date, 'createdDate')}
                        dateFormat={'dd/MM/YYYY'}
                    />
                    <label htmlFor="" className="label-blog">Descripción</label>
                    <textarea
                        className="input-blog text-area-blog"
                        value={blog.descripcion}
                        onChange={(event) => handleChange(event.target.value, 'description')}
                        placeholder="Ingrese descripción"
                    />
                    <label className="label-blog">
                        Seleccionar imagen:
                    </label>
                    <input
                        // TODO: fix classname
                        className="input-blog"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {blog.urlToImage && (
                        <div className="image-preview-container">
                            <p className="label-blog">Vista previa de la imagen:</p>
                            <img
                                className="image-preview"
                                src={blog.urlToImage}
                                alt="Vista previa"
                                onClick={handleClearImage}
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="btn-blog"
                        disabled={isBtnDisabled}
                    >
                        Confirmar
                    </button>
                </form>
            </div>
            {isModalOpen && (
                <ConfirmModal
                    isOpen={isModalOpen}
                    errorMsg={error && 'Ocurrió un error al crear el blog.'}
                    loading={loading}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirm}
                    message="¿Estás seguro que desea crear un blog?"
                />
            )}
        </>
    );
};

export default AddBlog;