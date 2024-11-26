import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";

export const useDeleteAuthor = () => {
  const [deleteAuthorState, setDeleteAuthorState] = useState({
    success: false,
    error: false,
    loading: false,
  });

  const deleteAuthor = async (authorID) => {
    setDeleteAuthorState({
      error: false,
      loading: true,
      success: false,
    });
    const url = `/authors/${authorID}`;
    try {
      const response = await axiosInstance.delete(url);
      if (response.status === 204) {
        setDeleteAuthorState({
          error: false,
          loading: false,
          success: true,
        });
      } else {
        setDeleteAuthorState({
          error: true,
          loading: false,
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      setDeleteAuthorState({
        error: true,
        loading: false,
        success: false,
      });
    }
  };

  return {
    deleteAuthor,
    deleteAuthorError: deleteAuthorState?.error,
    deleteAuthorLoading: deleteAuthorState?.loading,
    deleteAuthorSuccess: deleteAuthorState?.success,
  };
};
