// src/components/TableManagement/ReservationList.jsx
import { useEffect, useState } from 'react';
import { fetchReservations } from './TableAPI';

const ReservationList = ({ token }) => {
    const [reservations, setReservations] = useState([]);
    
    useEffect(() => {
        const getReservations = async () => {
            const data = await fetchReservations(token);
            setReservations(data);
        };
        getReservations();
    }, [token]);
    
    return (
        <div className="bg-indigo-800 text-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">Reservation List</h2>
            <ul className="space-y-2">
                {reservations.map(res => (
                    <li 
                        key={res.id} 
                        className="bg-indigo-700 p-3 rounded-md shadow-sm hover:bg-indigo-500 transition duration-300"
                    >
                        {res.customer_name} - Table {res.table} at {new Date(res.reservation_time).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
    
};

export default ReservationList;