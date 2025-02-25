import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaShoppingCart, FaDollarSign, FaBox } from "react-icons/fa";

// Register chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Dashboard = () => {
  // Get current month
  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });

  // Dummy data for stats
  const stats = [
    { title: "Total Sales", icon: <FaDollarSign />, percent: "+12%", amount: "5,400.00$", lastMonth: "4,800.00$" },
    { title: "Total Purchases", icon: <FaShoppingCart />, percent: "-5%", amount: "3,200.00$", lastMonth: "3,400.00$" },
    { title: "Total Stock", icon: <FaBox />, percent: "+8%", amount: "8,900.00$", lastMonth: "8,200.00$" },
  ];

  // Bar Chart Data
  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Sales ($)",
        data: [1200, 1900, 1500, 2200],
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderRadius: 5,
      },
      {
        label: "Stock (Units)",
        data: [500, 800, 650, 900],
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Dashboard View */}
        <div className="p-6">
          {/* Top Section */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <span className="text-gray-600 text-lg">{currentMonth}</span>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-lg flex items-center space-x-4 hover:shadow-xl transition duration-300">
                <div className="text-3xl text-indigo-600">{stat.icon}</div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">{stat.title}</h2>
                  <p className="text-sm text-green-500 font-semibold">{stat.percent}</p>
                  <h2 className="text-xl font-bold">{stat.amount}</h2>
                  <p className="text-gray-500 text-sm">{stat.lastMonth} Last month</p>
                </div>
              </div>
            ))}
          </div>

          {/* Graph Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Bar Chart */}
            <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Sales & Inventory Analytics</h2>
              <Bar data={chartData} />
            </div>

            {/* Recent Transactions */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Transactions</h2>
              <ul className="divide-y divide-gray-200">
                <li className="py-2 flex justify-between">
                  <span className="text-gray-700">Order #2345</span>
                  <span className="text-green-500 font-semibold">+50.00$</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span className="text-gray-700">Purchase #873</span>
                  <span className="text-red-500 font-semibold">-30.00$</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span className="text-gray-700">Stock Update</span>
                  <span className="text-blue-500 font-semibold">+200 Units</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import axios from "axios";
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import { FaShoppingCart, FaDollarSign, FaBox } from "react-icons/fa";

// // Register chart.js components
// ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// const Dashboard = () => {
//   const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });

//   // State for dashboard data
//   const [stats, setStats] = useState([]);
//   const [chartData, setChartData] = useState(null);
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/api/dashboard");
//         const data = response.data;

//         // Set statistics data
//         setStats([
//           { title: "Total Sales", icon: <FaDollarSign />, percent: `${data.salesPercent}%`, amount: `${data.salesAmount}$`, lastMonth: `${data.salesLastMonth}$` },
//           { title: "Total Purchases", icon: <FaShoppingCart />, percent: `${data.purchasesPercent}%`, amount: `${data.purchasesAmount}$`, lastMonth: `${data.purchasesLastMonth}$` },
//           { title: "Total Stock", icon: <FaBox />, percent: `${data.stockPercent}%`, amount: `${data.stockAmount}$`, lastMonth: `${data.stockLastMonth}$` },
//         ]);

//         // Set chart data dynamically
//         setChartData({
//           labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
//           datasets: [
//             {
//               label: "Sales ($)",
//               data: data.salesGraph,
//               backgroundColor: "rgba(75, 192, 192, 0.7)",
//               borderRadius: 5,
//             },
//             {
//               label: "Stock (Units)",
//               data: data.stockGraph,
//               backgroundColor: "rgba(255, 99, 132, 0.7)",
//               borderRadius: 5,
//             },
//           ],
//         });

//         // Set recent transactions
//         setTransactions(data.recentTransactions);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex flex-col flex-1">
//         {/* Header */}
//         <Header />

//         {/* Dashboard View */}
//         <div className="p-6">
//           {/* Top Section */}
//           <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
//             <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
//             <span className="text-gray-600 text-lg">{currentMonth}</span>
//           </div>

//           {/* Stats Section */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
//             {stats.map((stat, index) => (
//               <div key={index} className="p-4 bg-white rounded-lg shadow-lg flex items-center space-x-4 hover:shadow-xl transition duration-300">
//                 <div className="text-3xl text-indigo-600">{stat.icon}</div>
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-700">{stat.title}</h2>
//                   <p className="text-sm text-green-500 font-semibold">{stat.percent}</p>
//                   <h2 className="text-xl font-bold">{stat.amount}</h2>
//                   <p className="text-gray-500 text-sm">{stat.lastMonth} Last month</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Graph Section */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//             {/* Bar Chart */}
//             <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-lg font-semibold text-gray-700 mb-4">Sales & Inventory Analytics</h2>
//               {chartData && <Bar data={chartData} />}
//             </div>

//             {/* Recent Transactions */}
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Transactions</h2>
//               <ul className="divide-y divide-gray-200">
//                 {transactions.length > 0 ? (
//                   transactions.map((transaction, index) => (
//                     <li key={index} className="py-2 flex justify-between">
//                       <span className="text-gray-700">{transaction.type} #{transaction.id}</span>
//                       <span className={`font-semibold ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}>
//                         {transaction.amount > 0 ? `+${transaction.amount}$` : `${transaction.amount}$`}
//                       </span>
//                     </li>
//                   ))
//                 ) : (
//                   <p className="text-gray-500 text-sm">No recent transactions</p>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
