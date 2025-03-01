// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import { FaFileCsv, FaDownload, FaUpload, FaBox, FaChartLine } from "react-icons/fa";
// import Papa from "papaparse";

// // Register chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Inventory = () => {
//   const [products, setProducts] = useState([]);
//   const [currency, setCurrency] = useState("USD");
//   const [exchangeRates, setExchangeRates] = useState({ USD: 1, Bs: 35, EUR: 0.92 }); // Dummy values, update dynamically
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//     fetchExchangeRates();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/api/inventory");
//       setProducts(response.data);
//       generateChartData(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const fetchExchangeRates = async () => {
//     try {
//       const response = await axios.get("https://api.exchangerate-api.com/v4/latest/USD"); // Replace with real exchange rate API
//       setExchangeRates({
//         USD: 1,
//         Bs: response.data.rates["VES"] || 35,
//         EUR: response.data.rates["EUR"] || 0.92,
//       });
//     } catch (error) {
//       console.error("Error fetching exchange rates:", error);
//     }
//   };

//   const generateChartData = (data) => {
//     const labels = data.map((product) => product.name);
//     const salesData = data.map((product) => product.sales);

//     setChartData({
//       labels,
//       datasets: [
//         {
//           label: "Most Sold Products",
//           data: salesData,
//           backgroundColor: "rgba(54, 162, 235, 0.6)",
//           borderRadius: 5,
//         },
//       ],
//     });
//   };

//   const handleCurrencyChange = (event) => {
//     setCurrency(event.target.value);
//   };

//   const handleImportCSV = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     Papa.parse(file, {
//       complete: (result) => {
//         console.log("Parsed CSV Data:", result.data);
//         // Send this data to the backend for bulk upload
//       },
//       header: true,
//     });
//   };

//   const handleExportCSV = () => {
//     const csv = Papa.unparse(products);
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.setAttribute("download", "inventory.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex flex-col flex-1">
//         <Header />

//         <div className="p-6">
//           <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
//             <h1 className="text-2xl font-semibold text-gray-800">Inventory Management</h1>

//             {/* Currency Selector */}
//             <div className="flex items-center space-x-2">
//               <label className="text-gray-600">Currency:</label>
//               <select value={currency} onChange={handleCurrencyChange} className="p-2 border rounded">
//                 <option value="USD">USD</option>
//                 <option value="Bs">Bs</option>
//                 <option value="EUR">EUR</option>
//               </select>
//             </div>
//           </div>

//           {/* Inventory Table */}
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-gray-700">Inventory List</h2>

//               {/* CSV Import/Export Buttons */}
//               <div className="flex space-x-4">
//                 <label className="cursor-pointer flex items-center space-x-2 bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300">
//                   <FaUpload className="text-gray-700" />
//                   <span>Import CSV</span>
//                   <input type="file" className="hidden" accept=".csv" onChange={handleImportCSV} />
//                 </label>
//                 <button
//                   onClick={handleExportCSV}
//                   className="flex items-center space-x-2 bg-yellow-800 text-white px-4 py-2 rounded-lg hover:bg-yellow-900"
//                 >
//                   <FaDownload />
//                   <span>Export CSV</span>
//                 </button>
//               </div>
//             </div>

//             {/* Product Table */}
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="p-2 border">Product</th>
//                   <th className="p-2 border">Category</th>
//                   <th className="p-2 border">Stock</th>
//                   <th className="p-2 border">Price</th>
//                   <th className="p-2 border">Sales</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((product, index) => (
//                   <tr key={index} className="text-center border hover:bg-gray-100 transition">
//                     <td className="p-2 border">{product.name}</td>
//                     <td className="p-2 border">{product.category}</td>
//                     <td className="p-2 border">{product.stock}</td>
//                     <td className="p-2 border">{(product.price * exchangeRates[currency]).toFixed(2)} {currency}</td>
//                     <td className="p-2 border">{product.sales}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Inventory Analytics */}
//           <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//               <FaChartLine className="mr-2" /> Inventory Analytics
//             </h2>
//             {chartData && <Bar data={chartData} />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Inventory;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaFileCsv, FaDownload, FaUpload, FaBox, FaChartLine } from "react-icons/fa";
import Papa from "papaparse";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_BASE_URL = "https://suitsadmin.onrender.com/api";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({ USD: 1, Bs: 35, EUR: 0.92 });
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchExchangeRates();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");
    return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from storage
      const response = await axios.get(`${API_BASE_URL}/inventory/products/`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.response ? error.response.data : error.message);
    }
  };

  fetch(`${API_BASE_URL}/api/categories`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer your_access_token`
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));


  // const fetchProducts = async () => {
  //   try {
  //     const response = await axios.get(`${API_BASE_URL}/inventory/products`, { headers: getAuthHeaders() });
  //     setProducts(response.data);
  //     generateChartData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };


  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/inventory/categories/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error.response ? error.response.data : error.message);
    }
  };


  // const fetchCategories = async () => {
  //   try {
  //     const response = await axios.get(`${API_BASE_URL}/inventory/categories`, { headers: getAuthHeaders() });
  //     setCategories(response.data);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");
      setExchangeRates({
        USD: 1,
        Bs: response.data.rates["VES"] || 35,
        EUR: response.data.rates["EUR"] || 0.92,
      });
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  const generateChartData = (data) => {
    const labels = data.map((product) => product.name);
    const salesData = data.map((product) => product.quantity_in_stock);

    setChartData({
      labels,
      datasets: [
        {
          label: "Stock Levels",
          data: salesData,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderRadius: 5,
        },
      ],
    });
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="p-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Inventory Management</h1>
            <div className="flex items-center space-x-2">
              <label className="text-gray-600">Currency:</label>
              <select value={currency} onChange={handleCurrencyChange} className="p-2 border rounded">
                <option value="USD">USD</option>
                <option value="Bs">Bs</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700">Inventory List</h2>
            <table className="w-full border-collapse mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Product</th>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Stock</th>
                  <th className="p-2 border">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="text-center border hover:bg-gray-100 transition">
                    <td className="p-2 border">{product.name}</td>
                    <td className="p-2 border">{categories.find(cat => cat.id === product.category)?.name || "Unknown"}</td>
                    <td className="p-2 border">{product.quantity_in_stock}</td>
                    <td className="p-2 border">{(product.price * exchangeRates[currency]).toFixed(2)} {currency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <FaChartLine className="mr-2" /> Inventory Analytics
            </h2>
            {chartData && <Bar data={chartData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

