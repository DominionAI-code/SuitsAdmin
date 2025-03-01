// src/components/TableManagement/BillSplitForm.jsx
import { useState } from 'react';
import { splitBill } from './TableAPI';

const BillSplitForm = ({ token, orderId, onBillSplit }) => {
    const [customerName, setCustomerName] = useState('');
    const [amountPaid, setAmountPaid] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const billData = { customer_name: customerName, amount_paid: Number(amountPaid), payment_method: paymentMethod };
        await splitBill(token, orderId, billData);
        onBillSplit();
    };
    
    return (
        <form 
            onSubmit={handleSubmit} 
            className="bg-indigo-800 text-white p-6 rounded-lg shadow-md max-w-md mx-auto"
        >
            <h2 className="text-lg font-semibold mb-4">Split Bill</h2>
            
            <label className="block mb-2">Customer Name:</label>
            <input 
                type="text" 
                value={customerName} 
                onChange={(e) => setCustomerName(e.target.value)} 
                required 
                className="w-full p-2 mb-4 text-black rounded-md"
            />
    
            <label className="block mb-2">Amount Paid:</label>
            <input 
                type="number" 
                value={amountPaid} 
                onChange={(e) => setAmountPaid(e.target.value)} 
                required 
                className="w-full p-2 mb-4 text-black rounded-md"
            />
    
            <label className="block mb-2">Payment Method:</label>
            <select 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 mb-4 text-black rounded-md"
            >
                <option value="card">Card</option>
                <option value="cash">Cash</option>
            </select>
    
            <button 
                type="submit" 
                className="w-full bg-indigo-700 hover:bg-indigo-500 text-white font-semibold py-2 rounded-md transition duration-300"
            >
                Submit
            </button>
        </form>
    );
    
};

export default BillSplitForm;