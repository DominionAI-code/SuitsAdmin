import { useState, useEffect } from 'react';
import { getOrders, createOrder } from '../Services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ customer_name: '', items: [] });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      setError("Error fetching orders: " + (error.response?.data || error.message));
    }
  };

  const handleCreateOrder = async () => {
    if (newOrder.customer_name === '' || newOrder.items.length === 0) {
      setError("Customer name and at least one item are required.");
      return;
    }

    try {
      await createOrder(newOrder);
      setNewOrder({ customer_name: '', items: [] }); // Reset form
      setError('');
      fetchOrders(); // Refresh orders list
    } catch (error) {
      setError("Error creating order: " + (error.response?.data || error.message));
    }
  };

  const handleAddItem = () => {
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      items: [...prevOrder.items, { product: '', quantity: 1 }]
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...newOrder.items];
    updatedItems[index][field] = value;
    setNewOrder((prevOrder) => ({ ...prevOrder, items: updatedItems }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl mb-4">Create New Order</h2>
        <input
          type="text"
          placeholder="Customer Name"
          value={newOrder.customer_name}
          onChange={(e) => setNewOrder({ ...newOrder, customer_name: e.target.value })}
          className="border p-2 w-full mb-4 rounded"
        />
        <h3 className="text-xl mb-2">Items</h3>
        {newOrder.items.map((item, index) => (
          <div key={index} className="flex gap-4 mb-2">
            <input
              type="text"
              placeholder="Product ID"
              value={item.product}
              onChange={(e) => handleItemChange(index, 'product', e.target.value)}
              className="border p-2 w-1/2 rounded"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
              className="border p-2 w-1/2 rounded"
            />
          </div>
        ))}
        <button 
          onClick={handleAddItem} 
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-4 hover:bg-yellow-600"
        >
          Add Item
        </button>
        <button 
          onClick={handleCreateOrder} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Order
        </button>
      </div>

      <h2 className="text-2xl mb-4">Order List</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="p-4 bg-white shadow rounded-lg">
            <p className="text-lg font-semibold">{order.customer_name}</p>
            <p>Status: {order.status}</p>
            <p>Total Amount: ${order.total_amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
