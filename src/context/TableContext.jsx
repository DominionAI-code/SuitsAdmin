// src/context/TableContext.js
import { createContext, useState, useEffect } from 'react';
import { fetchTables } from '../Table/TableAPI';

export const TableContext = createContext();

const TableProvider = ({ children, token }) => {
    const [tables, setTables] = useState([]);
    
    useEffect(() => {
        const getTables = async () => {
            const data = await fetchTables(token);
            setTables(data);
        };
        getTables();
    }, [token]);
    
    return (
        <TableContext.Provider value={{ tables, setTables }}>
            {children}
        </TableContext.Provider>
    );
};

export default TableProvider;
