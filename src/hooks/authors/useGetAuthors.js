import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";

export const useGetAuthors = () => {
  const [getAuthorsState, setGetAuthorsState] = useState({
    data: [],
    error: null,
    loading: false,
  });

  const getAuthors = async () => {
    setGetAuthorsState({
      data: [],
      error: null,
      loading: true,
    });
    try {
      const response = await axiosInstance.get("/authors");
      if (response.status === 200) {
        setGetAuthorsState({
          data: response.data,
          error: null,
          loading: false,
        });
      } else {
        setGetAuthorsState({
          data: [],
          error: true,
          loading: false,
        });
      }
    } catch (error) {
      setGetAuthorsState({
        data: [],
        error: error,
        loading: false,
      });
    }
  };

  return {
    getAuthors,
    data: getAuthorsState?.data,
    error: getAuthorsState?.error,
    loading: getAuthorsState?.loading,
  };
};
