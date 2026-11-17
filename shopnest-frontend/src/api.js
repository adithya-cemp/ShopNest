import axios from "axios";

// Set VITE_API_URL in Netlify/your local .env to your deployed backend URL.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: `${API_BASE_URL.replace(/\/$/, "")}/api/products`,
  headers: { "Content-Type": "application/json" }
});
