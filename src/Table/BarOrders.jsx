// src/components/TableManagement/BarOrders.jsx
import { useEffect, useState } from 'react';
import { fetchBarOrders } from './TableAPI';

const BarOrders = ({ token }) => {
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        const getOrders = async () => {
            const data = await fetchBarOrders(token);
            setOrders(data);
        };
        getOrders();
    }, [token]);
    
    return (
            <div className="bg-indigo-800 text-white p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Bar Orders</h2>
                <ul>
                    {orders.map(order => (
                    <li 
                        key={order.id} 
                        className="p-2 mb-2 bg-indigo-700 rounded-md hover:bg-indigo-500">
                        Order {order.order} - {order.quantity}x Product {order.product}
                    </li>
                    ))}
                </ul>
            </div>
        );
};

export default BarOrders;
