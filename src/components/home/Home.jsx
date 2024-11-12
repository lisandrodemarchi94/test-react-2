import { useEffect, useState } from "react";
import { useGetNews } from "../../hooks/useGetNews";

import "./Home.css";

const Home = () => {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);

    const { articles, getNews, loading, error } = useGetNews();

    useEffect(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        getNews({ page, pageSize, dateFrom: yesterday });
    }, [page, pageSize, getNews]);

    if (loading) {
        return <p>Cargando noticias...</p>;
    }

    if (error) {
        return <p>Error al cargar noticias: {error}</p>;
    }

    // TODO: change article for blog
    return (
        <div className="news-list">
            {articles.length ? (
                articles.map((article, index) => (
                    <div className="news-item" key={index}>
                        <h2>{article.title}</h2>
                        <p><strong>Fuente:</strong> {article.title}</p>
                        <p><strong>Autor:</strong> {article.author || "Desconocido"}</p>
                        <p>{article.description}</p>
                        <img src={article.urlToImage} alt={article.title} className="news-image" />
                        <p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">Leer más</a>
                        </p>
                    </div>
                ))
            ) : (
                <h3>No se encontraron resultados</h3>
            )}

            {articles.length && (
                <div className="pagination">
                    <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                        Anterior
                    </button>
                    <p>Página {page}</p>
                    <button onClick={() => setPage((prev) => prev + 1)} disabled={articles.length < pageSize}>
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;