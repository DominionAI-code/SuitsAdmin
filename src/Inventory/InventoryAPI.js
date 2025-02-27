import api from "../Services/api"; // Import main API instance

// Categories
export const fetchCategories = async () => api.get("/inventory/categories/");
export const createCategory = async (categoryData) => api.post("/inventory/categories/", categoryData);

// Products
export const fetchProducts = async () => api.get("/inventory/products/");
export const createProduct = async (productData) => api.post("/inventory/products/", productData);
export const getProductDetails = async (productId) => api.get(`/inventory/products/${productId}/`);
export const updateProduct = async (productId, updateData) => api.put(`/inventory/products/${productId}/`, updateData);
export const deleteProduct = async (productId) => api.delete(`/inventory/products/${productId}/`);

// Stock Movement
export const addStockMovement = async (movementData) => api.post("/inventory/stock-movement/", movementData);

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
};
