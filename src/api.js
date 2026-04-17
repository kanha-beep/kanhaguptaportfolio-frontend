import axios from "axios";

const VITE_API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:3000/api";

const api = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

export default api;
