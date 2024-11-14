// import axios from "axios";
import { useState } from "react";
import { authorsMock } from "../../mocks/authorsMock";

// const authorsApiUrl = import.meta.env.VITE_AUTHORS_API_URL;

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
      setTimeout(() => {
        setGetAuthorsState({
          data: authorsMock,
          error: null,
          loading: false,
        });
      }, 2000);

      //   const response = await axios.get(authorsApiUrl);
      //   if (response.status === 200) {
      //     setGetAuthorsState({
      //       data: response.data,
      //       error: null,
      //       loading: false,
      //     });
      //   } else {
      //     setGetAuthorsState({
      //       data: [],
      //       error: "Error",
      //       loading: false,
      //     });
      //   }
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
