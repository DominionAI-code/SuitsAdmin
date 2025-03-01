// src/components/TableManagement/KitchenOrders.jsx
import { useEffect, useState } from 'react';
import { fetchKitchenOrders } from './TableAPI';

const KitchenOrders = ({ token }) => {
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        const getOrders = async () => {
            const data = await fetchKitchenOrders(token);
            setOrders(data);
        };
        getOrders();
    }, [token]);
    
    return (
        <div className="bg-indigo-800 text-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">Kitchen Orders</h2>
            <ul className="space-y-2">
                {orders.map(order => (
                    <li 
                        key={order.id} 
                        className="bg-indigo-700 p-3 rounded-md shadow-sm hover:bg-indigo-500 transition duration-300"
                    >
                        Order {order.order} - {order.quantity}x Product {order.product}
                    </li>
                ))}
            </ul>
        </div>
    );
    
};

export default KitchenOrders;