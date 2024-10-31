import { useState, useCallback } from "react";

const apiKey = import.meta.env.VITE_NEWS_API_KEY;
const apiUrl = import.meta.env.VITE_NEWS_API_URL;

export const useGetNews = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // useCallback: Es un hook que devuelve una versión memorizada de la función que le pasas como argumento. 
  // Esto significa que la función solo se volverá a crear si cambian las dependencias que le especificas
  const getNews = useCallback(async ({ page, pageSize, dateFrom }) => {
    const url = `${apiUrl}/top-headlines?category=sports&from=${dateFrom}&sortBy=popularity&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      const filteredArticles = data.articles.filter((a) => a.title !== "[Removed]");
      setArticles(filteredArticles);
      setError(null);
    } catch (error) {
      console.error("Error al obtener noticias:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []); // Dependencias vacías para evitar que cambie en cada render

  return {
    articles,
    error,
    loading,
    getNews,
  };
};
