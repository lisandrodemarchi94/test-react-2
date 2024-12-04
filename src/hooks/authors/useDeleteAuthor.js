import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";

export const useDeleteAuthor = () => {
  const [deleteAuthorState, setDeleteAuthorState] = useState({
    success: false,
    error: null,
    loading: false,
  });

  const deleteAuthor = async (authorId) => {
    setDeleteAuthorState({
      success: false,
      error: null,
      loading: true,
    });
    try {
      const response = await axiosInstance.delete(`/authors/${authorId}`);
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
      console.log(error);
      setDeleteAuthorState({
        success: false,
        error: error,
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
