"use client";

import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "",
  timeout: 10000,
});

// Request interceptor (optional - for adding auth headers if needed)
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear user cookie
      document.cookie = "user=; max-age=0; path=/; SameSite=Strict";
      
      // Redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

