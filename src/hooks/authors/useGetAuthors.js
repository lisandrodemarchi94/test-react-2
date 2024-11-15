import axios from "axios";
import { useState } from "react";

const authorsApiUrl = import.meta.env.VITE_AUTHORS_API_URL;

export const useGetAuthors = () => {
  const [getAuthorsState, setGetAuthorsState] = useState({
    data: [],
    error: null,
    loading: false,
  });

  const getAuthors = async () => {
    setGetAuthorsState({
      data: [],
      error: false,
      loading: true,
    });
    try {
      const response = await axios.get(authorsApiUrl);
      if (response.status === 200) {
        setGetAuthorsState({
          data: response.data,
          error: false,
          loading: false,
        });
      } else {
        setGetAuthorsState({
          data: [],
          error: "Error",
          loading: false,
        });
      }
    } catch (error) {
      console.log({ error });
      setGetAuthorsState({
        data: [],
        error: error.message,
        loading: false,
      });
    }
  };

  return {
    getAuthors,
    authors: getAuthorsState?.data,
    authorsError: getAuthorsState?.error,
    authorsLoading: getAuthorsState?.loading,
  };
};
