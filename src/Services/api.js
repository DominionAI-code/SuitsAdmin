import axios from 'axios';

const BASE_URL = 'https://suitsadmin.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  // Set a reasonable timeout to avoid hanging requests
  timeout: 30000
});

// Remove duplicate token adding since we have interceptors
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // Prevent infinite refresh loops
    if (originalRequest._retry) {
      localStorage.clear();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem('refresh_token');
      
      if (refresh) {
        try {
          const response = await axios.post(`${BASE_URL}/users/token/refresh/`, {
            refresh
          });
          
          // Update stored token
          localStorage.setItem('access_token', response.data.access);
          
          // Update auth header
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          
          // Retry the original request
          return axios(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          localStorage.clear();
          window.location.href = '/login?expired=true';
          return Promise.reject(error);
        }
      } else {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    // Handle other errors normally
    return Promise.reject(error);
  }
);

// ✅ Corrected Named Exports
export const registerUser = async (userData) => {
  const response = await api.post('/users/register/', userData);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/inventory/categories/');
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await api.post('/inventory/categories/', categoryData);
  return response.data;
};

// Product API functions
export const getProducts = async () => {
  const response = await api.get('/inventory/products/');
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post('/inventory/products/', productData);
  return response.data;
};

export const updateProduct = async (id, updatedData) => {
  const response = await api.put(`/inventory/products/${id}/`, updatedData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/inventory/products/${id}/`);
  return response.data;
};

// Order API functions

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders/orders/', orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};


export const getOrders = async () => {
  const response = await api.get('/orders/orders/');
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/orders/${id}/`);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.patch(`/orders/orders/${id}/`, { status });
  return response.data;
};


export const generateInvoice = async (orderId) => {
  try {
    const response = await api.get(`/transactions/orders/${orderId}/invoice/`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Failed to generate invoice:', error);
    throw error;
  }
};

// Table API functions
// export const fetchTables = () => fetchData("/table/tables/");
// export const createTable = (tableData) => fetchData("/table/tables/", "POST", tableData);


// Sales API functions
// Sales API functions
export const getSalesReports = async () => {
  const response = await api.get('/orders/sales-reports/');
  return response.data;
};

export const generateSalesReport = async () => {
  const response = await api.get('/orders/sales-reports/generate/');
  return response.data;
};

export const downloadSalesReport = async () => {
  const response = await api.get('/orders/sales-reports/download/', { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'sales_report.pdf');
  document.body.appendChild(link);
  link.click();
};

export const createStockMovement = async (movementData) => {
  const response = await fetch("/inventory/stock-movement/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movementData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create stock movement");
  }

  return response.json();
};



export const getUsers = async () => {
  const response = await api.get("/users//users");
  return response.data;
};

export const authAPI = {
  async login(credentials) {
    try {
      const response = await api.post('/users/token/', credentials);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw {
          status: error.response.status,
          message: error.response.data?.detail || 'Login failed. Please check your credentials.'
        };
      } else {
        throw {
          status: 0,
          message: 'Network error. Please check your connection.'
        };
      }
    }
  },
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  },
  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  }
};

export default api;