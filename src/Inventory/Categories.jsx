// Categories.jsx
import { useState, useEffect } from 'react';
import  inventoryAPI  from '../Services/api';
import InventoryTable from './InventoryTable';
import InventoryForm from './InventoryForm';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await inventoryAPI.getCategories();
      setCategories(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch categories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (categoryData) => {
    setLoading(true);
    setError('');

    try {
      await inventoryAPI.createCategory(categoryData);
      fetchCategories(); // Refresh the list after adding a category
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create category. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <InventoryForm
        onSubmit={addCategory}
        fields={[
          { name: 'name', label: 'Name' },
          { name: 'description', label: 'Description' },
        ]}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <InventoryTable
          data={categories}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'description', label: 'Description' },
          ]}
        />
      )}
    </div>
  );
};

export default Categories;