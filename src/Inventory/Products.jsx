// Products.jsx
import { useState, useEffect } from 'react';
import inventoryAPI  from '../Services/api';
import InventoryTable from './InventoryTable';
import InventoryForm from './InventoryForm';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await inventoryAPI.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    setLoading(true);
    setError('');

    try {
      await inventoryAPI.createProduct(productData);
      fetchProducts(); // Refresh the list after adding a product
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (product) => {
    setLoading(true);
    setError('');

    try {
      await inventoryAPI.deleteProduct(product.id);
      fetchProducts(); // Refresh the list after deleting a product
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <InventoryForm
        onSubmit={addProduct}
        fields={[
          { name: 'name', label: 'Name' },
          { name: 'description', label: 'Description' },
          { name: 'sku', label: 'SKU' },
          { name: 'price', label: 'Price', type: 'number' },
          { name: 'quantity_in_stock', label: 'Quantity in Stock', type: 'number' },
        ]}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <InventoryTable
          data={products}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'description', label: 'Description' },
            { key: 'sku', label: 'SKU' },
            { key: 'price', label: 'Price' },
            { key: 'quantity_in_stock', label: 'Quantity in Stock' },
          ]}
          onDelete={deleteProduct}
        />
      )}
    </div>
  );
};

export default Products;