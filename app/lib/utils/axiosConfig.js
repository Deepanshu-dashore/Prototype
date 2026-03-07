"use client";

import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "",
  timeout: 10000,
});

// Helper to get cookie by name
const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

// Request interceptor to add auth headers
axiosInstance.interceptors.request.use(
  (config) => {
    const pathname =
      typeof window !== "undefined" ? window.location.pathname : "";
    let token = null;

    if (pathname.startsWith("/distributor")) {
      token = getCookie("distributorToken") || getCookie("authToken");
    } else if (pathname.startsWith("/warehouse")) {
      token = getCookie("warehouseToken") || getCookie("authToken");
    } else {
      token = getCookie("authToken");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      const pathname =
        typeof window !== "undefined" ? window.location.pathname : "";
      const isDistributorPortal = pathname.startsWith("/distributor");
      const isWarehousePortal = pathname.startsWith("/warehouse");

      // Clear relevant cookies
      if (isDistributorPortal) {
        document.cookie =
          "distributorToken=; max-age=0; path=/; SameSite=Strict";
        if (typeof window !== "undefined") {
          window.location.href = "/distributor/login";
        }
      } else if (isWarehousePortal) {
        document.cookie = "warehouse_user=; max-age=0; path=/; SameSite=Strict";
        document.cookie = "warehouseToken=; max-age=0; path=/; SameSite=Strict";
        if (typeof window !== "undefined") {
          window.location.href = "/warehouse/login";
        }
      } else {
        document.cookie = "user=; max-age=0; path=/; SameSite=Strict";
        document.cookie = "authToken=; max-age=0; path=/; SameSite=Strict";
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
