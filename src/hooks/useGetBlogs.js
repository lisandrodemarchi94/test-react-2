/* eslint-disable no-undef */
import { useState } from "react";
import axios from "axios";

const blogUrl = import.meta.env.VITE_BLOGS_API_URL;

export const useGetBlogs = () => {
  const [blogState, setBlogState] = useState({
    data: [],
    error: false,
    loading: false,
  });

  const getAllBlogs = async () => {
    try {
      setBlogState({
        data: null,
        error: false,
        loading: true,
      });
      const response = await axios.get(blogUrl);
      if (response.status === 200) {
        setBlogState({
          data: response.data,
          error: false,
          loading: false,
        });
      } else {
        setBlogState({
          data: null,
          error: true,
          loading: false,
        });
      }
    } catch (error) {
      console.log({ error });
      setBlogState({
        data: null,
        error: true,
        loading: false,
      });
    }
  };

  return {
    getAllBlogs,
    data: blogState.data,
    error: blogState.error,
    loading: blogState.loading,
  };
};
