// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import { FaSearch, FaShoppingCart, FaTrash, FaPlus, FaMinus, FaDollarSign, FaSave } from "react-icons/fa";

// // Sample products (replace with database fetch in the future)
// const sampleProducts = [
//   { id: 1, name: "Burger", price: 5.99, currency: "USD" },
//   { id: 2, name: "Pizza", price: 8.99, currency: "USD" },
//   { id: 3, name: "Soda", price: 1.99, currency: "USD" },
//   { id: 4, name: "Pasta", price: 7.49, currency: "USD" },
//   { id: 5, name: "Steak", price: 12.99, currency: "USD" },
// ];

// const POS = () => {
//   const [search, setSearch] = useState("");
//   const [cart, setCart] = useState([]);
//   const [currency, setCurrency] = useState("USD");

//   // Filter products based on search input
//   const filteredProducts = sampleProducts.filter((product) =>
//     product.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // Add product to cart
//   const addToCart = (product) => {
//     const existingItem = cart.find((item) => item.id === product.id);
//     if (existingItem) {
//       setCart(
//         cart.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//   };

//   // Remove product from cart
//   const removeFromCart = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   // Update quantity
//   const updateQuantity = (id, amount) => {
//     setCart(
//       cart.map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
//       )
//     );
//   };

//   // Calculate total price
//   const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex flex-col flex-1">
//         {/* Header */}
//         <Header />

//         {/* POS Section */}
//         <div className="p-6">
//           {/* Search & Cart Summary */}
//           <div className="flex justify-between items-center mb-6">
//             <div className="relative w-1/2">
//               <input
//                 type="text"
//                 placeholder="Search for products..."
//                 className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <FaSearch className="absolute left-3 top-4 text-gray-400" />
//             </div>

//             {/* Cart Total */}
//             <div className="text-lg font-semibold bg-white p-4 rounded-lg shadow-md flex items-center space-x-2">
//               <FaShoppingCart className="text-indigo-600 text-2xl" />
//               <span>Total: {totalAmount} {currency}</span>
//             </div>
//           </div>

//           {/* Products & Cart */}
//           <div className="grid grid-cols-3 gap-6">
//             {/* Product List */}
//             <div className="col-span-2 bg-white p-4 rounded-lg shadow-lg">
//               <h2 className="text-lg font-semibold mb-4">Products</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 {filteredProducts.length > 0 ? (
//                   filteredProducts.map((product) => (
//                     <div
//                       key={product.id}
//                       className="p-4 bg-gray-200 rounded-lg shadow-md hover:shadow-lg cursor-pointer flex justify-between items-center transition-all duration-300"
//                       onClick={() => addToCart(product)}
//                     >
//                       <div>
//                         <h3 className="text-lg font-semibold">{product.name}</h3>
//                         <p className="text-gray-600">{product.price} {product.currency}</p>
//                       </div>
//                       <FaPlus className="text-green-500 text-xl" />
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500">No products found</p>
//                 )}
//               </div>
//             </div>

//             {/* Cart Section */}
//             <div className="bg-white p-4 rounded-lg shadow-lg">
//               <h2 className="text-lg font-semibold mb-4">Cart</h2>
//               <div className="space-y-4">
//                 {cart.length > 0 ? (
//                   cart.map((item) => (
//                     <div key={item.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md">
//                       <div>
//                         <h3 className="font-semibold">{item.name}</h3>
//                         <p className="text-gray-600">{item.price} {item.currency} x {item.quantity}</p>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <FaMinus className="text-red-500 cursor-pointer" onClick={() => updateQuantity(item.id, -1)} />
//                         <FaPlus className="text-green-500 cursor-pointer" onClick={() => updateQuantity(item.id, 1)} />
//                         <FaTrash className="text-gray-500 cursor-pointer hover:text-red-600" onClick={() => removeFromCart(item.id)} />
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500">Cart is empty</p>
//                 )}
//               </div>

//               {/* Checkout Section */}
//               {cart.length > 0 && (
//                 <div className="mt-6">
//                   <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center">
//                     <FaDollarSign className="mr-2" /> Checkout
//                   </button>
//                   <button className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg mt-2 hover:bg-gray-400 flex items-center justify-center">
//                     <FaSave className="mr-2" /> Hold Order
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default POS;




import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { FaPlus, FaMinus, FaTrash, FaCashRegister } from "react-icons/fa";

const POS = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/products");
      setProducts(response.data);
    } catch (error) {
      toast.error("Error fetching products!");
      console.error(error);
    }
  };

  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  // Checkout function
  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.warning("Cart is empty!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/checkout", {
        cart,
        paymentMethod,
      });

      if (response.data.success) {
        toast.success("Transaction successful!");
        generateInvoice(response.data.invoiceId); // Call invoice generation
        setCart([]);
      } else {
        toast.error("Transaction failed!");
      }
    } catch (error) {
      toast.error("Error processing transaction!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Generate SENIAT-Compliant Invoice
  const generateInvoice = async (invoiceId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/invoice/${invoiceId}`, {
        responseType: "blob",
      });

      const invoiceBlob = new Blob([response.data], { type: "application/pdf" });
      const invoiceURL = URL.createObjectURL(invoiceBlob);
      window.open(invoiceURL);
    } catch (error) {
      toast.error("Error generating invoice!");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />

        {/* Main Content */}
        <div className="p-6">
          {/* Product Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Select Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-xl transition duration-300"
                    onClick={() => addToCart(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <h3 className="mt-2 text-md font-bold">{product.name}</h3>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Section */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Cart</h2>
              {cart.length === 0 ? (
                <p className="text-gray-500">No items in cart</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <li key={item._id} className="py-2 flex justify-between items-center">
                      <span className="text-gray-700">{item.name}</span>
                      <div className="flex items-center space-x-2">
                        <button className="text-green-500" onClick={() => increaseQuantity(item._id)}>
                          <FaPlus />
                        </button>
                        <span>{item.quantity}</span>
                        <button className="text-red-500" onClick={() => decreaseQuantity(item._id)}>
                          <FaMinus />
                        </button>
                        <button className="text-gray-500" onClick={() => removeItem(item._id)}>
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Checkout Section */}
              <div className="mt-4">
                <h3 className="text-xl font-bold">Total: ${calculateTotal()}</h3>
                <select
                  className="mt-2 p-2 w-full border rounded-lg"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card Payment</option>
                </select>

                <button
                  className="w-full bg-yellow-800 text-white py-2 rounded-lg hover:bg-yellow-900 mt-3 flex items-center justify-center"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? "Processing..." : <><FaCashRegister className="mr-2" /> Checkout</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;
