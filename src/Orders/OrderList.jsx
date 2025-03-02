const OrderList = ({ orders, onViewOrder, onShowInvoice, onShowReports }) => {
  // Ensure orders is always an array to avoid map errors
  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Orders</h3>
      <button
        onClick={onShowReports}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        View Sales Reports
      </button>

      {safeOrders.length === 0 ? (
        <p className="text-gray-500">No orders available.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {safeOrders.map((order) => (
            <li key={order.id || order._id} className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">{order.customer_name || "Unknown Customer"}</p>
                  <p>Total: ${order.total_amount ?? "0.00"}</p>
                  <p>Status: {order.status || "Pending"}</p>
                </div>
                <div>
                  <button
                    onClick={() => onViewOrder(order)}
                    className="mr-2 bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onShowInvoice(order)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Invoice
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
