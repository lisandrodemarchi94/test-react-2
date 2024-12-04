import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";

export const useUpdateAuthor = () => {
  const [updateAuthorState, setUpdateAuthorState] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const updateAuthor = async (author) => {
    setUpdateAuthorState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axiosInstance.put("/authors", author);
      if (response.status === 200) {
        setUpdateAuthorState({
          data: response.data,
          error: null,
          loading: false,
        });
      } else {
        setUpdateAuthorState({
          data: null,
          error: "Error",
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
      setUpdateAuthorState({
        data: null,
        error: error,
        loading: false,
      });
    }
  };

  return {
    updateAuthor,
    updateAuthorData: updateAuthorState?.data,
    updateAuthorError: updateAuthorState?.error,
    updateAuthorLoading: updateAuthorState?.loading,
  };
};
