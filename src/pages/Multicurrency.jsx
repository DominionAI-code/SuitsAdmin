import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaExchangeAlt, FaSyncAlt } from "react-icons/fa";

const Multicurrency = () => {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExchangeRates();
  }, [baseCurrency]);

  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/currency-rates", {
        params: { base: baseCurrency }
      });
      setCurrencies(response.data.rates);
      convertAmount(amount, response.data.rates);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
    setLoading(false);
  };

  const convertAmount = (value, rates) => {
    const converted = {};
    Object.keys(rates).forEach((currency) => {
      converted[currency] = (value * rates[currency]).toFixed(2);
    });
    setConvertedAmount(converted);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    convertAmount(value, currencies);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />

        <div className="p-6">
          {/* Page Header */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Multicurrency</h1>
            <button
              onClick={fetchExchangeRates}
              className="bg-yellow-800 text-white px-4 py-2 rounded-lg flex items-center hover:bg-yellow-900 transition"
            >
              <FaSyncAlt className="mr-2" /> Refresh Rates
            </button>
          </div>

          {/* Currency Selection */}
          <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md mb-4">
            <label className="text-gray-700 font-semibold">Base Currency:</label>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="BTC">BTC - Bitcoin</option>
            </select>
          </div>

          {/* Conversion Input */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center space-x-4">
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="border border-gray-300 p-2 rounded-lg w-32"
              placeholder="Amount"
            />
            <span className="text-gray-700">in {baseCurrency}</span>
            <FaExchangeAlt className="text-xl text-gray-600" />
          </div>

          {/* Exchange Rates Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Exchange Rates</h2>
            {loading ? (
              <p className="text-gray-500">Loading exchange rates...</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">Currency</th>
                    <th className="p-2 text-left">Rate</th>
                    <th className="p-2 text-left">Converted Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(currencies).map((currency) => (
                    <tr key={currency} className="border-t hover:bg-gray-100 transition">
                      <td className="p-2">{currency}</td>
                      <td className="p-2">{currencies[currency]}</td>
                      <td className="p-2">{convertedAmount[currency]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Multicurrency;
