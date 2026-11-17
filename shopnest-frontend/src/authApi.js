
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const authApi = axios.create({
  baseURL: `${API_BASE_URL.replace(/\/$/, "")}/api`,
  headers: {
    "Content-Type": "application/json"
  }
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("shopnest-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
