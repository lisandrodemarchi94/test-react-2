import { useCallback, useState } from "react";
import axios from "../../config/axiosConfig";

export const useGetBlogs = () => {
  const [blogState, setBlogState] = useState({
    data: [],
    error: null,
    loading: false,
  });

  const getAllBlogs = useCallback(async () => {
    try {
      setBlogState({
        data: null,
        error: false,
        loading: true,
      });
      const response = await axios.get("blogs");
      if (response.status === 200) {
        setBlogState({
          data: response.data,
          error: false,
          loading: false,
        });
      } else {
        setBlogState({
          data: null,
          error: "Error",
          loading: false,
        });
      }
    } catch (error) {
      setBlogState({
        data: null,
        error: error,
        loading: false,
      });
    }
  }, []);

  return {
    getAllBlogs,
    data: blogState.data,
    error: blogState.error,
    loading: blogState.loading,
  };
};
