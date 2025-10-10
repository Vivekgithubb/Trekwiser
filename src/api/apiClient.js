import axios from "axios";

// This creates a special version of axios with your base URL and header built-in.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default apiClient;
