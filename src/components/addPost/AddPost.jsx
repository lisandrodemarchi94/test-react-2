import { useState } from "react";

import "./AddPost.css";

const AddPost = () => {

    const [blog, setBlog] = useState({
        autor: '',
        titulo: '',
        descripcion: '',
    });

    const isBtnDisabled = !(blog.autor && blog.titulo);

    const handleChange = (event, type) => {
        setBlog((prevState) => {
            return {
                ...prevState,
                [type]: event.target.value,
            };
        });
    };

    // const handleChangeAutor = (event) => {
    //     setBlog({
    //         autor: event.target.value,
    //     });
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(event)
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
                onChange={(event) => handleChange(event, 'autor')}
            />
            <label htmlFor="" className="label-blog">Titulo</label>
            <input
                className="input-blog"
                type="text"
                value={blog.titulo}
                onChange={(event) => handleChange(event, 'titulo')}
            />
            <label htmlFor="" className="label-blog">Descripción</label>
            <textarea
                className="input-blog"
                value={blog.descripcion}
                onChange={(event) => handleChange(event, 'descripcion')}
            />
            {/* <label htmlFor="">Fecha de publicación</label> */}
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