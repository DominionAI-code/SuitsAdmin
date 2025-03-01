import { generateInvoice } from "../Services/orderApi";

const Invoice = ({ order, onBack }) => {
  const handleGenerateInvoice = async () => {
    const invoice = await generateInvoice(order.id);
    window.open(invoice.invoice_url, "_blank");
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Invoice</h3>
      <p>Customer: {order.customer_name}</p>
      <p>Total Amount: ${order.total_amount}</p>
      <button
        onClick={handleGenerateInvoice}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Generate Invoice
      </button>
      <button
        onClick={onBack}
        className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg"
      >
        Back
      </button>
    </div>
  );
};

export default Invoice;
