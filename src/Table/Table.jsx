// src/pages/TableManagementPage.jsx
import { useContext } from 'react';
import { TableContext } from '../context/TableContext';
import { ReservationContext } from '../context/ReservationContext';
import TableList from './TableList';
import CreateTableForm from './CreateTableForm';
import ReservationList from './ReservationList';
import CreateReservationForm from './CreateReservationForm';
import BillSplitForm from './BillSplitForm';
import KitchenOrders from './KitchenOrders';
import BarOrders from './BarOrders';



const Table = () => {
    return (
        <div className="bg-slate-50 p-6">
         <h1 className="text-xl font-bold mb-4">Table Management</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CreateTableForm />
          <TableList />
          <CreateReservationForm />
          <ReservationList />
          <BillSplitForm />
          <KitchenOrders />
          <BarOrders />
         </div>
        </div>
    );
};

export default Table;
