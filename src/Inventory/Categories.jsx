import { useEffect, useState } from "react";
import { fetchCategories, createCategory } from "./InventoryAPI";
import InventoryTable from "./InventoryTable";
import InventoryForm from "./InventoryForm";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.data));
  }, []);

  const handleAddCategory = async (data) => {
    await createCategory(data);
    fetchCategories().then((res) => setCategories(res.data));
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Categories</h2>
      <InventoryForm onSubmit={handleAddCategory} initialData={{ name: "", description: "" }} />
      <InventoryTable data={categories} columns={[{ header: "Name", accessor: "name" }, { header: "Description", accessor: "description" }]} />
    </div>
  );
};

export default Categories;
