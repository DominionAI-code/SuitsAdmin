import { useEffect, useState } from "react";
import { fetchProducts, addStockMovement } from "./InventoryAPI";
import InventoryTable from "./InventoryTable";
import InventoryForm from "./InventoryForm";

const StockMovement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((res) => setProducts(res.data));
  }, []);

  const handleStockUpdate = async (data) => {
    await addStockMovement(data);
    fetchProducts().then((res) => setProducts(res.data));
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Stock Movement</h2>
      <InventoryForm onSubmit={handleStockUpdate} initialData={{ product_id: "", quantity: "", type: "add" }} />
      <InventoryTable data={products} columns={[{ header: "Product Name", accessor: "name" }, { header: "Stock", accessor: "quantity_in_stock" }]} />
    </div>
  );
};

export default StockMovement;
