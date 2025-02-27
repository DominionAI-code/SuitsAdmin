import { useEffect, useState } from "react";
import { fetchProducts, createProduct, deleteProduct } from "./InventoryAPI";
import InventoryTable from "./InventoryTable";
import InventoryForm from "./InventoryForm";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((res) => setProducts(res.data));
  }, []);

  const handleAddProduct = async (data) => {
    await createProduct(data);
    fetchProducts().then((res) => setProducts(res.data));
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts().then((res) => setProducts(res.data));
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Products</h2>
      <InventoryForm onSubmit={handleAddProduct} initialData={{ name: "", price: "", quantity_in_stock: "" }} />
      <InventoryTable data={products} columns={[{ header: "Name", accessor: "name" }, { header: "Price", accessor: "price" }]} />
      {products.map((product) => (
        <button key={product.id} onClick={() => handleDelete(product.id)} className="bg-red-500 text-white p-1 rounded">
          Delete
        </button>
      ))}
    </div>
  );
};

export default Products;
