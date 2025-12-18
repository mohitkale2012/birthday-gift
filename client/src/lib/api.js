import axios from "axios";

// For local dev, backend runs on :5000.
// You can override this by creating `client/.env` with:
// VITE_API_BASE_URL=http://localhost:5000
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
});


