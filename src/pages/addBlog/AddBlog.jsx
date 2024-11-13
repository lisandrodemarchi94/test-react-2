import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
import useCreateBlog from "../../hooks/useCreateBlog";

import "react-datepicker/dist/react-datepicker.css";
import "./AddPost.css";

const initBlogValue = {
    author: '',
    title: '',
    description: '',
    date: new Date(),
    urlToImage: '',
};

const AddPost = () => {

    const [blog, setBlog] = useState(initBlogValue);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { createNewBlog, error, loading, response } = useCreateBlog();

    useEffect(() => {
        if (loading) return;
        if (error) {
            console.log('Ocurrio un error');
        };
        if (response) {
            handleCloseModal();
            setBlog(initBlogValue);
        };
    }, [error, loading, response]);

    const isBtnDisabled = !(blog.author && blog.title && blog.description);

    const handleCloseModal = () => setIsModalOpen(false);

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
        if (file) {
            setBlog((prevState) => {
                return {
                    ...prevState,
                    urlToImage: file,
                };
            });
        }
    };

    // const handleChangeAutor = (event) => {
    //     setBlog({
    //         autor: event.target.value,
    //     });
    // };

    const handleConfirm = () => {
        console.log({ blog })
        createNewBlog(blog);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(blog)
        if (blog.author && blog.title) {
            console.log('handleSubmit');
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
                        selected={blog.date}
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
                    />
                    {blog.urlToImage && (
                        <div className="image-preview-container">
                            <p className="label-blog">Vista previa de la imagen:</p>
                            <img
                                className="image-preview"
                                src={blog.urlToImage}
                                alt="Vista previa"
                                // TODO: fix style inline
                                style={{ width: '200px', height: 'auto', marginTop: '10px' }}
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
                    onClose={handleCloseModal}
                    onConfirm={handleConfirm}
                    message="¿Estás seguro que desea crear un blog?"
                />
            )}
        </>
    );
};

export default AddPost;