import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaChair, FaCheckCircle, FaTimesCircle, FaUsers, FaPlus, FaMinus } from "react-icons/fa";

const TablePage = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tables from backend
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/tables");
        setTables(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load tables.");
        setLoading(false);
      }
    };
    fetchTables();
  }, []);

  // Change table status
  const updateTableStatus = async (tableId, newStatus) => {
    try {
      await axios.put(`http://localhost:4000/api/tables/${tableId}`, { status: newStatus });
      setTables((prevTables) =>
        prevTables.map((table) =>
          table.id === tableId ? { ...table, status: newStatus } : table
        )
      );
    } catch (err) {
      alert("Error updating table status");
    }
  };

  // Merge tables
  const mergeTables = (table1Id, table2Id) => {
    console.log(`Merging Table ${table1Id} with Table ${table2Id}`);
    // Backend integration for merging logic
  };

  // Split table
  const splitTable = (tableId) => {
    console.log(`Splitting Table ${tableId}`);
    // Backend integration for splitting logic
  };

  if (loading) return <p className="text-center mt-10">Loading tables...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header />

        {/* Table Management View */}
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Table Management</h1>

          {/* Table Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tables.map((table) => (
              <div
                key={table.id}
                className={`p-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 ${
                  table.status === "Available" ? "bg-green-100" :
                  table.status === "Occupied" ? "bg-red-100" :
                  "bg-yellow-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-700">Table {table.number}</h2>
                  <FaChair className="text-2xl text-gray-500" />
                </div>
                <p className="text-gray-600 mt-1">Seats: {table.seats}</p>

                {/* Status Display */}
                <div className="flex items-center mt-2">
                  {table.status === "Available" && <FaCheckCircle className="text-green-500 mr-2" />}
                  {table.status === "Occupied" && <FaTimesCircle className="text-red-500 mr-2" />}
                  {table.status === "Reserved" && <FaUsers className="text-yellow-500 mr-2" />}
                  <span className="font-semibold">{table.status}</span>
                </div>

                {/* Action Buttons */}
                <div className="mt-3 flex gap-2">
                  {table.status === "Available" && (
                    <button
                      onClick={() => updateTableStatus(table.id, "Reserved")}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition"
                    >
                      Reserve
                    </button>
                  )}
                  {table.status === "Reserved" && (
                    <button
                      onClick={() => updateTableStatus(table.id, "Occupied")}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                    >
                      Mark Occupied
                    </button>
                  )}
                  {table.status === "Occupied" && (
                    <button
                      onClick={() => updateTableStatus(table.id, "Available")}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition"
                    >
                      Free Table
                    </button>
                  )}
                </div>

                {/* Merge & Split Actions */}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => mergeTables(table.id, table.id + 1)}
                    className="bg-yellow-800 hover:bg-yellow-900 text-white px-3 py-1 rounded-md text-sm transition flex items-center gap-1"
                  >
                    <FaPlus /> Merge
                  </button>
                  <button
                    onClick={() => splitTable(table.id)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm transition flex items-center gap-1"
                  >
                    <FaMinus /> Split
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePage;