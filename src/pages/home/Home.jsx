// import { useEffect, useState } from "react";
import { useEffect } from "react";
import { useGetBlogs } from "../../hooks";
import { format } from "date-fns";

import "./Home.css";

const Home = () => {
    // const [page, setPage] = useState(1);
    // const [pageSize] = useState(5);

    const { data: blogs, error, getAllBlogs, loading } = useGetBlogs();

    useEffect(() => {
        getAllBlogs();
    }, [getAllBlogs]);

    if (loading) {
        return <p>Cargando noticias...</p>;
    }

    if (error) {
        return <p>Error al cargar noticias: {error.message}</p>;
    }

    return (
        <div className="news-list">
            {blogs.length ? (
                blogs.map((blog, index) => {
                    console.log(blog.createdDate)
                    const date = blog?.createdDate
                        ? format(new Date(blog.createdDate), 'dd/MM/yyyy')
                        : '-';
                    return (
                        <div className="news-item" key={index}>
                            <h2>{blog.title}</h2>
                            <p><strong>Autor:</strong> {blog.author || "Desconocido"}</p>
                            <p>Fecha de creación: {date}</p>
                            <p>{blog.description}</p>
                            <img src={blog.urlToImage} alt={blog.title} className="news-image" />
                        </div>
                    );
                })
            ) : (
                <h3>No se encontraron resultados</h3>
            )}

            {/* {blogs.length && (
                <div className="pagination">
                    <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                        Anterior
                    </button>
                    <p>Página {page}</p>
                    <button onClick={() => setPage((prev) => prev + 1)} disabled={articles.length < pageSize}>
                        Siguiente
                    </button>
                </div>
            )} */}
        </div>
    );
};

export default Home;