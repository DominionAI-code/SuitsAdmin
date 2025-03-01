import { updateOrderStatus } from "../Services/orderApi";

const OrderDetails = ({ order, onBack }) => {
  const handleCompleteOrder = async () => {
    await updateOrderStatus(order.id, "completed");
    alert("Order marked as completed!");
    onBack();
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Order Details</h3>
      <p>Customer: {order.customer_name}</p>
      <p>Total Amount: ${order.total_amount}</p>
      <p>Status: {order.status}</p>
      <button
        onClick={handleCompleteOrder}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Mark as Completed
      </button>
      <button
        onClick={onBack}
        className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg"
      >
        Back
      </button>
    </div>
  );
};

export default OrderDetails;
