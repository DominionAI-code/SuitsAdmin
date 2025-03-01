const BASE_URL = 'https://suitsadmin.onrender.com/api';
const ACCESS_TOKEN = 'access_token';


// src/api/tableApi.js
export const fetchTables = async (token) => {
    const response = await fetch(`${BASE_URL}/table/tables/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return response.json();
};

export const createTable = async (token, tableData) => {
    const response = await fetch(`${BASE_URL}/table/tables/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(tableData)
    });
    return response.json();
};

// src/api/reservationApi.js
export const fetchReservations = async (token) => {
    const response = await fetch(`${BASE_URL}/table/reservations/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return response.json();
};

export const createReservation = async (token, reservationData) => {
    const response = await fetch(`${BASE_URL}/table/reservations/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(reservationData)
    });
    return response.json();
};

// src/api/orderApi.js
export const splitBill = async (token, orderId, billData) => {
    const response = await fetch(`${BASE_URL}/table/orders/${orderId}/split-bill/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(billData)
    });
    return response.json();
};

// src/api/kitchenApi.js
export const fetchKitchenOrders = async (token) => {
    const response = await fetch(`${BASE_URL}/table/kitchen-orders/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return response.json();
};

// src/api/barApi.js
export const fetchBarOrders = async (token) => {
    const response = await fetch(`${BASE_URL}/table/bar-orders/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return response.json();
};