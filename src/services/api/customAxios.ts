import { useRef } from "react";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useBackdropStore } from "../store/loading/backdropLoaderStore";
import { useAuthStore } from "../store/auth/authStore";
import { useToastStore } from "../store/snackbar/toastStore";
import { getUserData, removeUserData } from "../localStorage/authUtils";
import { urls } from "./urls";

interface ErrorResponse {
  error?: string;
}

const useCustomAxios = (contentType = "application/json") => {
  const { showBackdrop, hideBackdrop } = useBackdropStore();
  const { setLoggedOut } = useAuthStore();
  const { showToast } = useToastStore();
  const userData = getUserData();
  const customAxiosRef = useRef<AxiosInstance | null>(null);

  if (!customAxiosRef.current) {
    customAxiosRef.current = axios.create({
      baseURL: urls.baseURL,
      headers: {
        "Content-Type": contentType,
      },
    });

    // Add request interceptors
    customAxiosRef.current.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        showBackdrop();
        if (userData) {
          config.headers.Authorization = `Bearer ${userData}`;
        }
        return config;
      },
      (error: AxiosError) => {
        handleRequestError(error as AxiosError<ErrorResponse>);
        return Promise.reject(error);
      }
    );

    // Add response interceptors
    customAxiosRef.current.interceptors.response.use(
      (response: AxiosResponse) => {
        hideBackdrop();
        return response;
      },
      (error: AxiosError) => {
        handleResponseError(error as AxiosError<ErrorResponse>);
        return Promise.reject(error);
      }
    );
  }

  const handleRequestError = (error: AxiosError<ErrorResponse>) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      showToast("Logging out due to unauthorized request", "danger");
      removeUserData();
      setLoggedOut();
    } else {
      const errorMessage = error.response?.data?.error || "Network Error";
      showToast(errorMessage, "danger");
    }
    hideBackdrop();
    console.error("Request error:", error);
  };

  const handleResponseError = (error: AxiosError<ErrorResponse>) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      showToast("Logging out due to unauthorized request", "warning");
      removeUserData();
      setLoggedOut();
    } else {
      const errorMessage = error.response?.data?.error || "Network Error";
      showToast(errorMessage, "danger");
    }
    hideBackdrop();
    console.error("Response error:", error);
  };

  return customAxiosRef.current;
};

export default useCustomAxios;
