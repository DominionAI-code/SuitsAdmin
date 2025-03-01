// src/context/ReservationContext.js
import { createContext, useState, useEffect } from 'react';
import { fetchReservations } from '../Table/TableAPI';

export const ReservationContext = createContext();

const ReservationProvider = ({ children }) => {
    const [reservations, setReservations] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            const getReservations = async () => {
                try {
                    const data = await fetchReservations(token);
                    setReservations(data);
                } catch (error) {
                    console.error("Error fetching reservations:", error);
                }
            };
            getReservations();
        }
    }, []);
    
    return (
        <ReservationContext.Provider value={{ reservations, setReservations }}>
            {children}
        </ReservationContext.Provider>
    );
};

export default ReservationProvider;
