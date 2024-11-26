import { useEffect, useState } from "react";
import { useGetBlogs } from "../../hooks";
import { format } from "date-fns";

import "./BlogsPage.css";

const initialFilters = {
    limit: 10,
    title: null,
    sortBy: "createdDate",
    order: "desc",
};

const BlogsPage = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState(initialFilters);
    const [searchInput, setSearchInput] = useState('');

    const { data: blogs, error, getAllBlogs, loading, metaData } = useGetBlogs();

    useEffect(() => {
        const filtersWithPage = { ...filters, page }
        getAllBlogs(filtersWithPage);
    }, [getAllBlogs, filters, page]);

    const getImageSrc = (image) => {
        if (!image || !image.data || !image.type) return null;
        // Convertir el array de datos binarios en una cadena Base64
        const base64String = btoa(
            String.fromCharCode(...new Uint8Array(image.data))
        );
        // Construir la URL de datos
        return `data:${image.type};base64,${base64String}`;
    };

    const handleChangeSearch = (event) => setSearchInput(event.target.value);

    const handleSearch = (event) => {
        if (event.code === "Enter") {
            setFilters(prevState => ({
                ...prevState,
                title: event.target.value,
            }));
        }
    };

    const handleCleanFilters = () => {
        setSearchInput("");
        setFilters(initialFilters);
    }

    if (loading) {
        return <p>Cargando noticias...</p>;
    }

    if (error) {
        return <p>Error al cargar noticias: {error.message}</p>;
    }

    return (
        <>
            <div className="search-container">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Buscar por título..."
                    value={searchInput}
                    onChange={handleChangeSearch}
                    onKeyUp={handleSearch}
                />
                <button className="search-btn" onClick={handleCleanFilters} disabled={!searchInput}>X</button>
            </div>
            <div className="blog-list">
                {blogs.length ? (
                    blogs.map((blog, index) => {
                        const createdDate = blog.createdDate ? format(new Date(blog.createdDate), 'dd/MM/yyyy') : '-';
                        return (
                            <div className="blog-item" key={index}>
                                <h2>{blog.title}</h2>
                                <p><strong>Autor:</strong> {blog?.author?.name || "Desconocido"}</p>
                                <p><strong>Fecha de creación:</strong> {createdDate}</p>
                                <p>{blog.description}</p>
                                {blog.image && <img src={getImageSrc(blog.image)} alt={blog.title} className="blog-image" />}
                            </div>
                        );
                    })
                ) : (
                    <div className="empty-blogs-container">
                        <h3>No se encontraron resultados</h3>
                        <button onClick={handleCleanFilters}>Borrar filtros</button>
                    </div>
                )}

                {blogs.length > 0 && (
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
        </>
    );
};

export default BlogsPage;