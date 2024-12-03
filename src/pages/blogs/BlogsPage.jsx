import { useEffect, useState } from "react";
import { useGetBlogs } from "../../hooks";
import { format } from "date-fns";

import "./BlogsPage.css";

const BlogsPage = () => {
    const [page, setPage] = useState(1);
    // const [pageSize] = useState(5);

    const { data: blogs, metaData, error, getAllBlogs, loading } = useGetBlogs();

    useEffect(() => {
        getAllBlogs();
    }, [getAllBlogs]);

    const getImageSrc = (image) => {
        if (!image || !image.data || !image.type) return null;
        // Convertir el array de datos binarios en una cadena Base64
        const base64String = btoa(
            String.fromCharCode(...new Uint8Array(image.data))
        );
        // Construir la URL de datos
        return `data:${image.type};base64,${base64String}`;
    };

    if (loading) {
        return <p>Cargando noticias...</p>;
    }

    if (error) {
        return <p>Error al cargar noticias: {error.message}</p>;
    }

    return (
        <div className="blogs-list">
            {blogs.length ? (
                blogs.map((blog, index) => {
                    const createdDate = blog.createdDate ? format(new Date(blog.createdDate), 'dd/MM/yyyy') : '-';
                    return (
                        <div className="blogs-item" key={index}>
                            <h2>{blog.title}</h2>
                            <p><strong>Autor:</strong> {blog.author.name || "Desconocido"}</p>
                            <p>Fecha de creación: {createdDate}</p>
                            <p>{blog.description}</p>
                            <img src={getImageSrc(blog.image)} alt={blog.title} className="blogs-image" />
                        </div>
                    );
                })
            ) : (
                <h3>No se encontraron resultados</h3>
            )}

            {blogs.length && (
                <div className="pagination">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={!metaData?.hasPrevPage}
                    >
                        Anterior
                    </button>
                    <span>Página {page} de {metaData?.totalPages}</span>
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={!metaData?.hasNextPage}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogsPage;