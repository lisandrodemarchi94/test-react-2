import { useState } from 'react';
import axios from 'axios'; // Si usas axios

const useCreateBlog = () => {
    // Estados para manejar el proceso
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    // Función que se invoca para crear un nuevo blog
    const createNewBlog = async (blogData) => {
        setLoading(true);
        setError(null);

        try {
            // Haciendo la solicitud POST
            const result = await axios.post('http://localhost:3000/api/blogs', blogData);
            setResponse(result.data);  // Respuesta del servidor
        } catch (err) {
            setError(err.message || 'Error creating blog');
        } finally {
            setLoading(false);
        }
    };

    return { createNewBlog, loading, error, response };
};

export default useCreateBlog;
