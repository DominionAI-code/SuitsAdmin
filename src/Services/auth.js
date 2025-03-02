import api from "../api/api";

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/register/", userData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error;
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/users/login/", userData);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

// Refresh JWT Token
export const refreshToken = async (refreshToken) => {
  try {
    const response = await api.post("/users/token/refresh/", { refresh: refreshToken });
    return response.data;
  } catch (error) {
    console.error("Token Refresh Error:", error.response?.data || error.message);
    throw error;
  }
};

// Get Users (Requires Auth)
export const getUsers = async (token) => {
  try {
    const response = await api.get("/users/users/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Get Users Error:", error.response?.data || error.message);
    throw error;
  }
};
