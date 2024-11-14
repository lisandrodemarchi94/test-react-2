import axios from "axios";
import { useState } from "react";

const blogUrl = import.meta.env.VITE_BLOGS_API_URL;

export const useCreateBlog = () => {

    const [createBlogState, setCreateBlogState] = useState({
        data: null,
        error: null,
        loading: false,
    });

    const createBlog = async ({ author, createdDate, description, title }) => {
        const blog = {
            author,
            createdDate: createdDate.toISOString(),
            description,
            title,
        };

        try {
            setCreateBlogState({
                data: null,
                error: null,
                loading: true,
            });
            const response = await axios.post(blogUrl, blog);
            if (response.data) {
                setCreateBlogState({
                    data: response.data,
                    error: null,
                    loading: false,
                });
            } else {
                setCreateBlogState({
                    data: null,
                    error: 'Error',
                    loading: false,
                });
            }
        } catch (error) {
            setCreateBlogState({
                data: null,
                error: error.message,
                loading: false,
            });
        }
    };

    const cleanError = () => {
        setCreateBlogState(prevState => ({
            ...prevState,
            error: null,
        }));
    };

    return {
        createBlog,
        cleanError,
        data: createBlogState.data,
        error: createBlogState.error,
        loading: createBlogState.loading,
    };
};