import { useState } from "react";

const InventoryForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      {Object.keys(initialData).map((key) => (
        <div key={key} className="mb-2">
          <label className="block font-semibold">{key}</label>
          <input
            name={key}
            value={formData[key] || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
    </form>
  );
};

export default InventoryForm;
