// ProductDetails.js
import { useState, useEffect } from "react";
import { getCategories, createProduct } from "../Services/api";

const ProductDetails = ({ onProductAdded }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    sku: "",
    category_id: "", // Rename category to category_id
    price: "",
    quantity_in_stock: "",
    minimum_stock: "",
    reorder_point: "",
  });
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "category_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      console.log("New product data:", newProduct); // Log the product data before submitting
      await createProduct(newProduct);
      onProductAdded();
      setNewProduct({
        name: "",
        description: "",
        sku: "",
        category_id: "",
        price: "",
        quantity_in_stock: "",
        minimum_stock: "",
        reorder_point: "",
      });
      onProductAdded();
    } catch (error) {
      console.error("Error creating product:", error.response?.data || error); // Log the exact API error
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-medium mb-4">Add New Product</h3>
      <div className="grid grid-cols-2 gap-4">
        <input placeholder="Name" name="name" value={newProduct.name} onChange={handleChange} required />
        <input placeholder="Description" name="description" value={newProduct.description} onChange={handleChange} />
        <input placeholder="SKU" name="sku" value={newProduct.sku} onChange={handleChange} required />

        <select name="category_id" value={newProduct.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input placeholder="Price" name="price" value={newProduct.price} onChange={handleChange} required />
        <input placeholder="Stock Quantity" name="quantity_in_stock" value={newProduct.quantity_in_stock} onChange={handleChange} required />
        <input placeholder="Minimum Stock" name="minimum_stock" value={newProduct.minimum_stock} onChange={handleChange} />
        <input placeholder="Reorder Point" name="reorder_point" value={newProduct.reorder_point} onChange={handleChange} />
      </div>
      <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg">
        {submitting ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default ProductDetails;
