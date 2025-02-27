import axios from "axios";

const API_BASE_URL = "https://suitsadmin.onrender.com/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Function to refresh the access token
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  try {
    const response = await api.post("/token/refresh/", { refresh: refreshToken });
    localStorage.setItem("access_token", response.data.access);
    return response.data.access;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 403 and the request was not a retry, try refreshing the token
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        // Redirect to login if token refresh fails
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
// API functions
export const registerUser = async (userData) => {
  return await api.post("/users/register/", userData);
};

export const loginUser = async (credentials) => {
  return await api.post("/users/login/", credentials);
};

export const getUsers = async () => {
  return await api.get("/users/users/");
};

export default api;