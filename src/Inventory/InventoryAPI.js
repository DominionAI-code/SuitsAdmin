import axios from "axios";

const API_URL = "https://suitsadmin.onrender.com/api/inventory";

// Function to get JWT token from localStorage
const getToken = () => localStorage.getItem("access_token");

// Axios instance with interceptor to attach token
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🟢 Categories API Calls
export const fetchCategories = async () => {
  return await apiClient.get("/categories/");
};

export const createCategory = async (categoryData) => {
  return await apiClient.post("/categories/", categoryData);
};

// 🟢 Products API Calls
export const fetchProducts = async () => {
  return await apiClient.get("/products/");
};

export const createProduct = async (productData) => {
  return await apiClient.post("/products/", productData);
};

export const getProductDetails = async (id) => {
  return await apiClient.get(`/products/${id}/`);
};

export const updateProduct = async (id, updateData) => {
  return await apiClient.put(`/products/${id}/`, updateData);
};

export const deleteProduct = async (id) => {
  return await apiClient.delete(`/products/${id}/`);
};

// 🟢 Stock Movement API Calls
export const addStockMovement = async (movementData) => {
  return await apiClient.post("/stock-movement/", movementData);
};

// 🟢 Low Stock Alerts API Calls
export const getLowStockProducts = async () => {
  return await apiClient.get("/products/low-stock/");
};

// Export all functions
export default {
  fetchCategories,
  createCategory,
  fetchProducts,
  createProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  addStockMovement,
  getLowStockProducts,
};