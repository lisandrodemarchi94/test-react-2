import { useCallback, useState } from "react";
import axios from "../../config/axiosConfig";
import { buildURLWithFilters } from "../../utils";

export const useGetBlogs = () => {
  const [blogState, setBlogState] = useState({
    data: [],
    metaData: null,
    error: null,
    loading: false,
  });

  const getAllBlogs = useCallback(async (filters) => {
    try {
      setBlogState({
        data: null,
        metaData: null,
        error: false,
        loading: true,
      });
      const urlBlogsWithFilters = buildURLWithFilters("/blogs", filters);
      const response = await axios.get(urlBlogsWithFilters);
      if (response.status === 200) {
        setBlogState({
          data: response.data.data,
          metaData: response.data.meta,
          error: false,
          loading: false,
        });
      } else {
        setBlogState({
          data: null,
          metaData: null,
          error: "Error",
          loading: false,
        });
      }
    } catch (error) {
      setBlogState({
        data: null,
        metaData: null,
        error: error,
        loading: false,
      });
    }
  }, []);

  return {
    getAllBlogs,
    data: blogState.data,
    metaData: blogState.metaData,
    error: blogState.error,
    loading: blogState.loading,
  };
};
