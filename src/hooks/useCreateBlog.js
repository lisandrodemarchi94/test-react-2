import axios from "axios";
import { useState } from "react";

const blogUrl = import.meta.env.VITE_BLOGS_API_URL;

export const useCreateBlog = () => {
  const [createBlogState, setCreateBlogState] = useState({
    data: null,
    error: false,
    loading: false,
  });

  const createBlog = async ({ author, date, description, title }) => {
    const blog = {
      author,
      date,
      description,
      title,
    };
    console.log("Ingreso a create Blog");
    try {
      setCreateBlogState({
        data: null,
        error: false,
        loading: true,
      });
      const response = await axios.post(blogUrl, blog);
      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    createBlog,
    data: createBlogState.data,
    error: createBlogState.error,
    loading: createBlogState.loading,
  };
};
