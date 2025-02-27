import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import api from '../Services/api';
import { 
  LogOut, 
  Clock, 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  CreditCard, 
  FileText, 
  BarChart3, 
  User 
} from 'lucide-react';
import Inventory from "../Inventory/Inventory";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const navigate = useNavigate();
  const [info, setInfo] = useState({ username: '', role: '' });
  const [error, setError] = useState("");

  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let token = localStorage.getItem("access_token");
  
        if (!token) {
          throw new Error("No access token found. Please log in.");
        }
  
        // Fetch user details
        const response = await api.get("/users/", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.data && response.data.username && response.data.role) {
          setInfo(response.data);
        } else {
          throw new Error("Invalid user data format");
        }
      } catch (error) {
        if (error.response?.status === 403) {
          setError("You do not have permission to access this resource.");
        } else if (error.response?.status === 401) {
          setError("Session expired. Please log in again.");
          localStorage.clear();
          window.location.href = "/login";
        } else { 
          setError(error.response?.data?.message || "Failed to fetch user details");
        }
      }
    };
  
    fetchUserDetails();
  }, []);
  
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Brand Logo */}
            <div className="flex items-center">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-700 to-indigo-500 text-transparent bg-clip-text">
                SuitsAdmin
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-5">
              {/* Date and Time */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 shadow-sm">
                <Clock className="h-5 w-5 text-indigo-600" />
                <span className="text-sm font-bold text-slate-700">
                  {currentTime}
                </span>
              </div>

              {/* User Profile Section */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 shadow-sm">
                <div className="p-1.5 bg-indigo-100 rounded-full">
                  <User className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{info.username}</p>
                  <p className="text-xs font-semibold text-indigo-600">
                    {info.role}
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-2 text-sm font-bold transition-colors shadow-md hover:shadow-lg"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="bg-indigo-800 text-white w-72 p-5 shadow-xl">
          <div className="mb-6 mt-2">
            <h2 className="text-xl font-bold text-white">Billing Dashboard</h2>
          </div>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-500 rounded-lg text-white font-bold text-sm transition-colors">
                  <div className="bg-indigo-500 p-2 rounded-md">
                    <LayoutDashboard className="h-5 w-5 text-white" />
                  </div>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-500 rounded-lg text-white font-bold text-sm transition-colors">
                  <div className="bg-indigo-500 p-2 rounded-md">
                    <Package className="h-5 w-5 text-white" />
                    <Inventory />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-500 rounded-lg text-white font-bold text-sm transition-colors">
                  <div className="bg-indigo-500 p-2 rounded-md">
                    <ShoppingCart className="h-5 w-5 text-white" />
                  </div>
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/table" className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-500 rounded-lg text-white font-bold text-sm transition-colors">
                  <div className="bg-indigo-500 p-2 rounded-md">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  Tables
                </Link>
              </li>
              <li>
                <Link to="/billing" className="flex items-center gap-3 px-4 py-3 bg-indigo-600 rounded-lg text-white font-bold text-sm transition-colors shadow-md">
                  <div className="bg-indigo-500 p-2 rounded-md">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  Billing
                </Link>
              </li>
              <li>
                <Link to="/report" className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-500 rounded-lg text-white font-bold text-sm transition-colors">
                  <div className="bg-indigo-500 p-2 rounded-md">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  Reports
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-sm font-bold">
              {error}
            </div>
          )}
          <Outlet /> {/* This will render the nested routes */}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-sm font-bold text-slate-600">
        &copy; {new Date().getFullYear()} SuitsAdmin. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;