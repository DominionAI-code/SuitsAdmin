import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Login from "./Components/Login";
import Register from "./Components/Register";
import UserList from "./Components/UserList"
import Dashboard from "./Components/Dashboard";
import ProtectedRoute from "./Context/ProtectedRoute";
import Categories from "./Inventory/Categories";
import Products from "./Inventory/Products";
import ProductDetails from "./Inventory/ProductDetails";
import StockMovement from "./Inventory/StockMovement";
import LowStockAlert from "./Inventory/LowStockAlert";
import Inventory from "./Inventory/Inventory";
import OrderManager from './Orders/OrderManager';
import OrderDetails from './Orders/OrderDetails';
import SalesReport from './Orders/SalesReport';
import Table from "./Table/Table";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/users" element={<UserList />} />
        </Route>

          {/* ✅ Redirect root ("/") to "/login" */}
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/stock-movement" element={<StockMovement />} />
          <Route path="/low-stock-alerts" element={<LowStockAlert />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<OrderManager />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales-reports" element={<SalesReport />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
