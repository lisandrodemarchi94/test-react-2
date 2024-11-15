import axios from "axios";
import { useState } from "react";

const authorsApiUrl = import.meta.env.VITE_AUTHORS_API_URL;

export const useDeleteAuthor = () => {
  const [deleteAuthorState, setDeleteAuthorState] = useState({
    success: false,
    error: null,
    loading: false,
  });

  const deleteAuthor = async ({ id }) => {
    const url = String(authorsApiUrl).concat("/").concat(id);
    console.log(url);
    try {
      const response = await axios.delete(url, id);
      if (response.status === 204) {
        setDeleteAuthorState({
          success: true,
          error: null,
          loading: false,
        });
      } else {
        setDeleteAuthorState({
          success: false,
          error: "Error",
          loading: false,
        });
      }
    } catch (error) {
      setDeleteAuthorState({
        success: false,
        error: error.message,
        loading: false,
      });
    }
  };

  return {
    deleteAuthor,
    deleteAuthorSuccess: deleteAuthorState?.success,
    deleteAuthorError: deleteAuthorState?.error,
    deleteAuthorLoading: deleteAuthorState?.loading,
  };
};
