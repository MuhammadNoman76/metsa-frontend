import axios from "axios";
import Cookies from "js-cookie";

// In development, use the full URL. In production (static export), use relative paths
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Add withCredentials for CORS
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const url: string | undefined = error.config?.url;
      const isAuthRoute =
        url?.includes("/auth/login") || url?.includes("/auth/signup");
      const isOnAuthPage =
        typeof window !== "undefined" &&
        (window.location.pathname === "/login" ||
          window.location.pathname === "/signup");

      if (!isAuthRoute) {
        Cookies.remove("access_token");
      }

      // Avoid hard redirect when already on auth pages or when the request was the auth call itself
      if (!isAuthRoute && !isOnAuthPage) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
