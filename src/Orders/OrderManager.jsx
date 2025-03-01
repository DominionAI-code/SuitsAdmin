import { useState, useEffect } from "react";
import OrderList from "./OrderList";
import OrderDetails from "./OrderDetails";
import Invoice from "./Invoice";
import SalesReport from "./SalesReport";
import { getOrders } from "../Services/orderApi";

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState("list");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      console.log("Fetched Orders:", response); // Log API response
      setOrders(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setView("details");
  };

  const handleShowInvoice = (order) => {
    setSelectedOrder(order);
    setView("invoice");
  };

  const handleShowReports = () => {
    setView("reports");
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
    setView("list");
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
  
      {view === "list" && (
        <>
          <h3 className="text-xl font-semibold mb-3">Order List</h3>
          <OrderList
            orders={orders}
            onViewOrder={handleViewOrder}
            onShowInvoice={handleShowInvoice}
            onShowReports={handleShowReports}
          />
        </>
      )}
  
      {view === "details" && selectedOrder && (
        <>
          <h3 className="text-xl font-semibold mb-3">Order Details</h3>
          <OrderDetails order={selectedOrder} onBack={handleBackToList} />
        </>
      )}

{view === "list" && orders.length === 0 && (
  <p className="text-gray-500">No orders found. Try adding a new order!</p>
)}
  
      {view === "invoice" && selectedOrder && (
        <>
          <h3 className="text-xl font-semibold mb-3">Invoice</h3>
          <Invoice order={selectedOrder} onBack={handleBackToList} />
        </>
      )}
  
      {view === "reports" && (
        <>
          <h3 className="text-xl font-semibold mb-3">Sales Report</h3>
          <SalesReport onBack={handleBackToList} />
        </>
      )}
    </div>
  );
};  

export default OrderManager;
