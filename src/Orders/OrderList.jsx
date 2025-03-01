const OrderList = ({ orders, onViewOrder, onShowInvoice, onShowReports }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Orders</h3>
      <button
        onClick={onShowReports}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        View Sales Reports
      </button>
      <ul className="divide-y divide-gray-200">
        {orders.map((order) => (
          <li key={order.id} className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">{order.customer_name}</p>
                <p>Total: ${order.total_amount}</p>
                <p>Status: {order.status}</p>
              </div>
              <div>
                <button
                  onClick={() => onViewOrder(order)}
                  className="mr-2 bg-indigo-500 text-white px-3 py-1 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => onShowInvoice(order)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Invoice
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
