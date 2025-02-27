import { useEffect, useState } from "react";
import { fetchProducts } from "./InventoryAPI";

const LowStockAlerts = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((res) => {
      const filteredProducts = res.data.filter((product) => product.quantity_in_stock < 5); // Threshold for low stock
      setLowStockProducts(filteredProducts);
    });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Low Stock Alerts</h2>
      {lowStockProducts.length > 0 ? (
        <ul>
          {lowStockProducts.map((product) => (
            <li key={product.id} className="text-red-500 font-semibold">
              {product.name} - Only {product.quantity_in_stock} left!
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-green-500">All stock levels are good.</p>
      )}
    </div>
  );
};

export default LowStockAlerts;
