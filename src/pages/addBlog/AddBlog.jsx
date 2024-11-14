import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
import { useCreateBlog } from "../../hooks";

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

    const { createBlog, cleanError, error, loading, response } = useCreateBlog();

    useEffect(() => {
        if (loading) return;
        if (!error && response?.data) {
            handleCloseModal();
            setBlog(initBlogValue);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, loading, response]);

    // useEffect(() => {
    //     return () => {
    //         if (blog.urlToImage) {
    //             URL.revokeObjectURL(blog.urlToImage);
    //         }
    //     };
    // }, [blog.urlToImage]);

    const isBtnDisabled = !(blog.author && blog.title && blog.description);

    const handleCloseModal = () => {
        cleanError();
        setIsModalOpen(false)
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
                    <input
                        className="input-blog"
                        type="text"
                        value={blog.autor}
                        onChange={(event) => handleChange(event.target.value, 'author')}
                        placeholder="Ingrese nombre de autor"
                    />
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
                        onChange={(date) => handleChange(date, 'date')}
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
                        value={blog.image || ''}
                    />
                    {blog.urlToImage && (
                        <button
                            className="clear-image-button"
                            onClick={handleClearImage}
                        >
                            ✕
                        </button>
                    )}
                    {blog.urlToImage && (
                        <div className="image-preview-container">
                            <p className="label-blog">Vista previa de la imagen:</p>
                            <img
                                className="image-preview"
                                src={blog.urlToImage}
                                alt="Vista previa"
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