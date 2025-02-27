import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./Components/Login";
import Register from "./Components/Register";
import UserList from "./Components/UserList"
import ForgetPassword from "./pages/ForgetPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Inventory from "./pages/Inventory";
import Tables from "./pages/Tables";
import Orders from "./pages/Orders";
import Multicurrency from "./pages/Multicurrency";
import Reports from "./pages/Reports";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* ✅ Redirect root ("/") to "/login" */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/sales" element={<Multicurrency />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
