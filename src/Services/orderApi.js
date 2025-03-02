const BASE_URL = "https://suitsadmin.onrender.com/api/orders"; // Base API URL

// Create a new order
export const createOrder = async (orderData) => {
  const response = await fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Handle token if required
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error Response:", errorText);
    throw new Error(`Failed to create order. Status: ${response.status}`);
  }
  
  return await response.json();
};

// Fetch all orders
export const getOrders = async () => {
  try {
    const response = await fetch(`${BASE_URL}/orders`);
    console.log("BASE URL:", `${BASE_URL}/orders`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};


// Fetch a single order by ID
export const getOrderById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}/orders`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error Response:", errorText);
    throw new Error(`Failed to fetch order. Status: ${response.status}`);
  }

  return await response.json();
};

// Update order status (e.g., mark as completed)
export const updateOrderStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/${id}/orders`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error Response:", errorText);
    throw new Error(`Failed to update order status. Status: ${response.status}`);
  }

  return await response.json();
};

// Generate an invoice for an order
export const generateInvoice = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}/invoice/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error Response:", errorText);
    throw new Error(`Failed to generate invoice. Status: ${response.status}`);
  }

  return await response.json();
};

// Fetch all sales reports
export const getSalesReports = async () => {
  const response = await fetch(`${BASE_URL}/../sales-reports/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error Response:", errorText);
    throw new Error(`Failed to fetch sales reports. Status: ${response.status}`);
  }

  return await response.json();
};
