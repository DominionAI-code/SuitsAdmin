// src/components/TableManagement/TableList.jsx
import { useEffect, useState } from 'react';
import { fetchTables } from './TableAPI';

const TableList = ({ token }) => {
    const [tables, setTables] = useState([]);
    
    useEffect(() => {
        const getTables = async () => {
            const data = await fetchTables(token);
            setTables(data);
        };
        getTables();
    }, [token]);
    
    return (
        <div>
            <h2>Table List</h2>
            <ul>
                {tables.map(table => (
                    <li key={table.id}>Table {table.table_number} - Status: {table.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default TableList;