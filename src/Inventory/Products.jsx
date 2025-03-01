// ProductInventory.js
import { useState, useEffect } from "react";
import { getProducts, createProduct, deleteProduct } from "../Services/api";
import ProductDetails from "./ProductDetails";

const ProductInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-indigo-800">Product Inventory</h2>
          <p className="text-gray-600">Manage and organize your products</p>
        </header>

        <ProductDetails onProductAdded={fetchProducts} />

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Product List</h3>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <ul>
              {filteredProducts.map((product) => (
                <li key={product.id} className="p-4 bg-white shadow-md mb-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xl font-bold">{product.name}</h4>
                      <p>{product.description}</p>
                      <span className="text-sm text-gray-500">SKU: {product.sku}</span>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => handleDelete(product.id)} className="text-red-500">
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInventory;