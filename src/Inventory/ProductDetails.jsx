// ProductDetails.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import  inventoryAPI from '../Services/api';
import InventoryForm from './InventoryForm';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProduct = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await inventoryAPI.getProduct(productId);
      setProduct(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch product details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productData) => {
    setLoading(true);
    setError('');

    try {
      await inventoryAPI.updateProduct(productId, productData);
      fetchProduct(); // Refresh the product details after updating
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <InventoryForm
        initialData={product}
        onSubmit={updateProduct}
        fields={[
          { name: 'name', label: 'Name' },
          { name: 'description', label: 'Description' },
          { name: 'sku', label: 'SKU' },
          { name: 'price', label: 'Price', type: 'number' },
          { name: 'quantity_in_stock', label: 'Quantity in Stock', type: 'number' },
        ]}
      />
    </div>
  );
};

export default ProductDetails;