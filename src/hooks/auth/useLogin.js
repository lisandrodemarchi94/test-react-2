import { useState } from "react";
import { useAuth } from "./useAuth";
import axiosInstance from "../../config/axiosConfig";
import { jwtDecode } from "jwt-decode";

const urlLogin = "/auth/login";

export const useLogin = () => {
  const [loginState, setLoginState] = useState({
    error: null,
    loading: false,
  });

  const { login } = useAuth();

  const loginFn = async ({ email, password }) => {
    try {
      setLoginState({
        error: null,
        loading: true,
      });
      const response = await axiosInstance.post(urlLogin, { email, password });
      if (response.status === 200) {
        const { token } = response.data;
        const decoded = jwtDecode(token);
        login(token, decoded?.role);
        setLoginState({
          error: null,
          loading: false,
        });
      } else {
        setLoginState({
          error: "Error",
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
      setLoginState({
        error: "Error",
        loading: false,
      });
    }
  };

  return {
    loginFn,
    loginError: loginState?.error,
    loginLoading: loginState?.loading,
  };
};
