import { useEffect, useState } from "react";
import { getProductDetails, updateProduct } from "./InventoryAPI";
import InventoryForm from "./InventoryForm";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductDetails(id).then((res) => setProduct(res.data));
  }, [id]);

  const handleUpdate = async (data) => {
    await updateProduct(id, data);
    getProductDetails(id).then((res) => setProduct(res.data));
  };

  return product ? (
    <div>
      <h2 className="text-xl font-bold">{product.name}</h2>
      <InventoryForm onSubmit={handleUpdate} initialData={product} />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ProductDetails;
