import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// Interceptor para agregar el token automáticamente
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const renewAccessToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/refresh`, null, {
      withCredentials: true, // Enviar cookies httpOnly si las usas
    });
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error al renovar el Access Token:", error);
    throw error;
  }
};

// Interceptor para manejar respuestas
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry // Asegurarte de no entrar en bucles infinitos
    ) {
      originalRequest._retry = true; // Marcar la solicitud como reintentada

      try {
        const newAccessToken = await renewAccessToken();

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Reintentar la solicitud original
        return axiosInstance(originalRequest);
      } catch (renewError) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(renewError);
      }
    }

    // Rechazar cualquier otro error
    return Promise.reject(error);
  }
);

export default axiosInstance;
