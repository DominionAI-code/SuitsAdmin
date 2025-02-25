import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaSearch, FaCheck, FaTimes, FaFileInvoiceDollar } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/orders");
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    filterOrders(value, statusFilter);
  };

  const handleStatusFilter = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    filterOrders(searchQuery, value);
  };

  const filterOrders = (search, status) => {
    let filtered = orders;
    if (search) {
      filtered = filtered.filter(
        (order) =>
          order.customer.toLowerCase().includes(search) ||
          order.id.toString().includes(search)
      );
    }
    if (status !== "all") {
      filtered = filtered.filter((order) => order.status === status);
    }
    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:4000/api/orders/${id}`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const printInvoice = (orderId) => {
    window.open(`http://localhost:4000/api/invoice/${orderId}`, "_blank");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />

        <div className="p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-between mb-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search by ID or Customer"
                value={searchQuery}
                onChange={handleSearch}
                className="border border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <FaSearch className="text-gray-600" />
            </div>
            <select
              className="border border-gray-300 rounded-lg p-2"
              value={statusFilter}
              onChange={handleStatusFilter}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          {/* Orders Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">Order ID</th>
                  <th className="p-2 text-left">Customer</th>
                  <th className="p-2 text-left">Total ($)</th>
                  <th className="p-2 text-left">Payment</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-100 transition">
                      <td className="p-2">{order.id}</td>
                      <td className="p-2">{order.customer}</td>
                      <td className="p-2">${order.total.toFixed(2)}</td>
                      <td className="p-2">{order.paymentStatus}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === "pending" ? "bg-yellow-200 text-yellow-800" :
                            order.status === "completed" ? "bg-green-200 text-green-800" :
                            "bg-red-200 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-2 flex justify-center space-x-2">
                        {order.status === "pending" && (
                          <button
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                            onClick={() => updateOrderStatus(order.id, "completed")}
                          >
                            <FaCheck />
                          </button>
                        )}
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                          onClick={() => updateOrderStatus(order.id, "canceled")}
                        >
                          <FaTimes />
                        </button>
                        <button
                          className="px-3 py-1 bg-yellow-800 text-white rounded hover:bg-yellow-900 transition"
                          onClick={() => printInvoice(order.id)}
                        >
                          <FaFileInvoiceDollar />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
