import axios from "axios";
import { useState } from "react";

const blogUrl = import.meta.env.VITE_BLOGS_API_URL;

export const useCreateBlog = () => {

    const [createBlogState, setCreateBlogState] = useState({
        data: null,
        error: null,
        loading: false,
    });

    const createBlog = async ({ author, date, description, title }) => {
        const blog = {
            author,
            date,
            description,
            title,
        };

        try {
            setCreateBlogState({
                data: null,
                error: false,
                loading: true,
            });
            const response = await axios.post(blogUrl, blog);
            if (response.data) {
                setCreateBlogState({
                    data: response.data,
                    error: false,
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
                error: error,
                loading: false,
            });
        }
    };

    return {
        createBlog,
        data: createBlogState.data,
        error: createBlogState.error,
        loading: createBlogState.loading,
    };
};