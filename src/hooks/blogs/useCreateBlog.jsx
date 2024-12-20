
import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";

export const useCreateBlog = () => {

    const [createBlogState, setCreateBlogState] = useState({
        data: null,
        error: null,
        loading: false,
    });

    const createBlog = async ({ author, createdDate, description, image, title }) => {

        const formData = new FormData();
        formData.append("author", author);
        formData.append("createdDate", createdDate.toISOString());
        formData.append("description", description);
        formData.append("title", title);
        image && formData.append("image", image);

        try {
            setCreateBlogState({
                data: null,
                error: null,
                loading: true,
            });
            const response = await axiosInstance.post("/blogs", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
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