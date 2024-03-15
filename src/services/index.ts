import axios from "axios";
import Cookies from "js-cookie";
import { clearStorage } from "./auth/auth.helper";
import { authService } from "./auth/auth.service";

const host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const protectedHost = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

protectedHost.interceptors.request.use(config => {
  const accessToken = Cookies.get("accessToken");

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

protectedHost.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;

    if (error.response.status && error.config && !originalRequest._retry) {
      if (error.response.status === 401) {
        originalRequest._retry = true;

        const refreshToken = Cookies.get("refreshToken");

        if (refreshToken) {
          try {
            await authService.getNewTokens({ refreshToken });
            return protectedHost(originalRequest);
          } catch (e) {
            clearStorage();
          }
        }
      }
    } else {
      clearStorage();
    }

    return Promise.reject(error);
  }
);

export { host, protectedHost };
