import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./AddPost.css";

const AddPost = () => {

    const [blog, setBlog] = useState({
        autor: '',
        titulo: '',
        descripcion: '',
        date: new Date(),
        urlToImage: '',
    });

    const isBtnDisabled = !(blog.autor && blog.titulo);

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
                    urlToImage: URL.createObjectURL(file),
                };
            });
        }
    };

    // const handleChangeAutor = (event) => {
    //     setBlog({
    //         autor: event.target.value,
    //     });
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (blog.autor && blog.titulo) {
            console.log('handleSubmit')
        };
    };

    return (
        <form onSubmit={handleSubmit} className="form-blog">
            <label htmlFor="" className="label-blog">Autor</label>
            <input
                className="input-blog"
                type="text"
                value={blog.autor}
                onChange={(event) => handleChange(event.target.value, 'autor')}
                placeholder="Ingrese nombre de autor"
            />
            <label htmlFor="" className="label-blog">Titulo</label>
            <input
                className="input-blog"
                type="text"
                value={blog.titulo}
                onChange={(event) => handleChange(event.target.value, 'titulo')}
                placeholder="Ingrese titulo"
            />
            <label htmlFor="" className="label-blog">Fecha de publicación</label>
            <DatePicker
                className="input-blog"
                selected={blog.date}
                onChange={(date) => handleChange(date, 'date')}
                dateFormat={'dd/MM/YY'}
            />
            <label htmlFor="" className="label-blog">Descripción</label>
            <textarea
                className="input-blog text-area-blog"
                value={blog.descripcion}
                onChange={(event) => handleChange(event.target.value, 'descripcion')}
                placeholder="Ingrese descripción"
            />
            <label className="label-blog">
                Seleccionar imagen:
            </label>
            <input
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
    );
};

export default AddPost;

// author
// title
// description
// publishedAt