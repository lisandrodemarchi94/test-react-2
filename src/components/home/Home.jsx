import { useEffect } from "react";
// import { useGetNews } from "../../hooks/useGetNews";
import { useGetBlogs } from "../../hooks/useGetBlogs";

import "./Home.css";

const Home = () => {
    // const [page, setPage] = useState(1);
    // const [pageSize] = useState(5);

    // const { articles, getNews, loading, error } = useGetNews();

    const { data: blogs, error, getAllBlogs, loading } = useGetBlogs();

    useEffect(() => {
        getAllBlogs();
    }, []);

    // useEffect(() => {
    //     const yesterday = new Date();
    //     yesterday.setDate(yesterday.getDate() - 1);
    //     getNews({ page, pageSize, dateFrom: yesterday });
    // }, [page, pageSize, getNews]);

    if (loading) {
        return <p>Cargando noticias...</p>;
    }

    if (error) {
        return <p>Error al cargar noticias: {error}</p>;
    }

    return (
        <div className="news-list">
            {blogs?.length ? (
                blogs?.map((blog, index) => (
                    <div className="news-item" key={index}>
                        <h2>{blog.title}</h2>
                        {/* <p><strong>Fuente:</strong> {blog.source.name}</p> */}
                        <p><strong>Autor:</strong> {blog.author || "Desconocido"}</p>
                        <p>{blog.description}</p>
                        {/* <img src={blog.urlToImage} alt={blog.title} className="news-image" /> */}
                        {/* <p>
                            <a href={blog.url} target="_blank" rel="noopener noreferrer">Leer más</a>
                        </p> */}
                        <p>{blog.date}</p>
                    </div>
                ))
            ) : (
                <h3>No se encontraron resultados</h3>
            )}

            {/* {blogs?.length && (
                <div className="pagination">
                    <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                        Anterior
                    </button>
                    <span>Página {page}</span>
                    <button onClick={() => setPage((prev) => prev + 1)} disabled={data?.articles?.length < pageSize}>
                        Siguiente
                    </button>
                </div>
            )} */}
        </div>
    );
};

export default Home;