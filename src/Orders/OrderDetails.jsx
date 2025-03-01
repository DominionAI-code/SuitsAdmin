import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById, updateOrderStatus, generateInvoice } from '../Services/api';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [updating, setUpdating] = useState(false);
  const [generatingInvoice, setGeneratingInvoice] = useState(false);

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
        setStatus(data.status);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // Handle order status update
  const handleStatusUpdate = async () => {
    setUpdating(true);
    try {
      const updatedOrder = await updateOrderStatus(id, { status });
      setOrder(updatedOrder);
      alert('Order status updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setUpdating(false);
    }
  };

  // Handle invoice generation
  const handleGenerateInvoice = async () => {
    setGeneratingInvoice(true);
    try {
      const invoiceData = await generateInvoice(id);
      if (invoiceData?.invoice_url) {
        window.open(invoiceData.invoice_url, '_blank');
      } else {
        alert('Invoice generated, but no URL was returned.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setGeneratingInvoice(false);
    }
  };

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Details (ID: {order.id})</h2>
      <p>Customer: {order.customer_name}</p>
      <p>Total Amount: ${order.total_amount.toFixed(2)}</p>
      <p>Status: {order.status}</p>
      <p>Created At: {new Date(order.created_at).toLocaleString()}</p>

      <h3 className="text-xl font-semibold mt-4">Items</h3>
      {order.items.length > 0 ? (
        <ul className="list-disc list-inside">
          {order.items.map((item) => (
            <li key={item.id}>
              {item.product_name} - {item.quantity} pcs @ ${item.price_at_purchase.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in this order.</p>
      )}

      <div className="mt-6">
        <label className="block mb-2">Update Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button
          onClick={handleStatusUpdate}
          className={`ml-4 px-4 py-2 rounded ${
            updating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'
          }`}
          disabled={updating}
        >
          {updating ? 'Updating...' : 'Update Status'}
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={handleGenerateInvoice}
          className={`px-4 py-2 rounded ${
            generatingInvoice ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 text-white'
          }`}
          disabled={generatingInvoice}
        >
          {generatingInvoice ? 'Generating...' : 'Generate Invoice'}
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
