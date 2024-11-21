import { useState } from "react";
import { useAuth } from "./useAuth";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../config/axiosConfig";

export const useLogin = () => {
  const [loginState, setLoginState] = useState({
    error: null,
    loading: false,
  });

  const { login } = useAuth();

  const loginFn = async ({ email, password }) => {
    const urlLogin = `auth/login`;
    try {
      setLoginState({
        error: null,
        loading: true,
      });
      const response = await axiosInstance.post(urlLogin, { email, password });
      if (response.status === 200) {
        const { token } = response.data;
        const decodedToken = jwtDecode(token);
        login(token, decodedToken?.role);
      } else {
        setLoginState({
          error: null,
          loading: false,
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginState({
        error: error.message,
        loading: false,
      });
    }
  };

  return {
    loginFn,
    loginStateError: loginState?.error,
    loginStateLoading: loginState?.loading,
  };
};
