import {
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import axiosInstance from "./axios.instance";

export const AxiosInterceptor = () => {
  // Interceptor de request
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      console.log("Starting Request", config);
      // Aquí puedes agregar tokens de autenticación si es necesario
      // const token = localStorage.getItem('token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (error: AxiosError) => {
      console.error("Request Error", error);
      return Promise.reject(error);
    }
  );

  // Interceptor de response
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log("Response received", response);
      return response;
    },
    (error: AxiosError) => {
      console.error("Response Error", error);
      // Aquí puedes manejar errores globales como 401, 403, etc.
      if (error.response?.status === 401) {
        // Redirigir al login o limpiar tokens
        console.log("Unauthorized - redirecting to login");
      }
      return Promise.reject(error);
    }
  );
};
