import React, { useState, useEffect } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaDownload, FaFilter, FaFileCsv, FaSync } from "react-icons/fa";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from "chart.js";

// Register chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [salesData, setSalesData] = useState(null);
  const [profitData, setProfitData] = useState(null);
  const [bestSelling, setBestSelling] = useState([]);
  const [leastSelling, setLeastSelling] = useState([]);
  const [filter, setFilter] = useState("monthly");
  const [customers, setCustomers] = useState([]);
  const [expenses, setExpenses] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);
  const [refunds, setRefunds] = useState(0);

  useEffect(() => {
    fetchReports();
  }, [filter]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/reports?filter=${filter}`);
      const data = response.data;
      
      setReports(data.reports);
      setRevenue(data.totalRevenue);
      setExpenses(data.totalExpenses);
      setProfit(data.totalProfit);
      setRefunds(data.totalRefunds);
      setBestSelling(data.bestSellingProducts);
      setLeastSelling(data.leastSellingProducts);
      setCustomers(data.customerInsights);

      // Update Charts
      setSalesData({
        labels: data.salesGraph.labels,
        datasets: [
          { label: "Sales ($)", data: data.salesGraph.values, backgroundColor: "rgba(75, 192, 192, 0.7)", borderRadius: 5 },
        ],
      });

      setProfitData({
        labels: ["Revenue", "Expenses", "Profit"],
        datasets: [
          { data: [data.totalRevenue, data.totalExpenses, data.totalProfit], backgroundColor: ["#36A2EB", "#FF6384", "#4CAF50"] },
        ],
      });
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Report Content */}
        <div className="p-6">
          {/* Top Section */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Business Reports</h1>
            <div className="flex space-x-4">
              <select onChange={(e) => setFilter(e.target.value)} value={filter} className="p-2 border rounded-md bg-gray-50">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <button className="bg-blue-500 text-white p-2 rounded-md flex items-center"><FaFilter className="mr-2" /> Apply Filter</button>
              <button className="bg-green-500 text-white p-2 rounded-md flex items-center"><FaDownload className="mr-2" /> Download CSV</button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
            {[
              { title: "Total Revenue", value: `$${revenue}`, color: "text-green-600" },
              { title: "Total Expenses", value: `$${expenses}`, color: "text-red-500" },
              { title: "Total Profit", value: `$${profit}`, color: "text-blue-600" },
              { title: "Total Refunds", value: `$${refunds}`, color: "text-orange-500" }
            ].map((stat, index) => (
              <div key={index} className={`p-4 bg-white rounded-lg shadow-lg flex flex-col items-center hover:shadow-xl transition duration-300`}>
                <h2 className="text-lg font-semibold text-gray-700">{stat.title}</h2>
                <h2 className={`text-xl font-bold ${stat.color}`}>{stat.value}</h2>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Sales Performance</h2>
              {salesData && <Bar data={salesData} />}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Profit & Expense Analysis</h2>
              {profitData && <Doughnut data={profitData} />}
            </div>
          </div>

          {/* Best & Worst Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Best-Selling Products</h2>
              <ul>
                {bestSelling.map((item, index) => <li key={index} className="text-gray-600">{item.name} - {item.sold} units</li>)}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Least-Selling Products</h2>
              <ul>
                {leastSelling.map((item, index) => <li key={index} className="text-gray-600">{item.name} - {item.sold} units</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
