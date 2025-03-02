const OrderDetails = ({ order }) => {
  // Calculate the total price by summing up the price of each item multiplied by its quantity
  const totalPrice = order.items.reduce((total, item) => total + item.quantity * item.price_at_purchase, 0);

  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Order #{order.id} Details</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Customer Information</h3>
        <p className="text-gray-700">Name: <span className="font-medium">{order.customer_name}</span></p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Order Items</h3>
        <ul className="list-disc list-inside">
          {order.items.map((item) => (
            <li key={item.id} className="text-gray-700">
              <span className="font-medium">{item.product_name}</span> — {item.quantity} x ${item.price_at_purchase.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="border-t pt-4">
        <h3 className="text-xl font-bold">Total Amount: ${totalPrice.toFixed(2)}</h3>
        <p className="text-gray-600 mt-2">Thank you for your purchase!</p>
      </div>
    </div>
  );
};

export default OrderDetails;