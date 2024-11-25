import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";

export const useRegister = () => {
  const [registerState, setRegisterState] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const register = async ({ email, password, role }) => {
    try {
      setRegisterState({
        data: null,
        error: null,
        loading: true,
      });
      const response = await axiosInstance.post("/auth/register", {
        email,
        password,
        role,
      });
      if (response.status === 201) {
        setRegisterState({
          data: response.data,
          error: null,
          loading: false,
        });
      } else {
        setRegisterState({
          data: null,
          error: "Error",
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
      setRegisterState({
        data: null,
        error: "Error",
        loading: false,
      });
    }
  };

  return {
    register,
    registerData: registerState?.data,
    registerError: registerState?.error,
    registerLoading: registerState?.loading,
  };
};
