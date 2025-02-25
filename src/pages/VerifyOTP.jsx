import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4000/api/auth/verify-otp/", { email, otp });
      toast.success("OTP Verified! Reset your password now.");
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-center">Verify OTP</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-2 border rounded mb-3"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;
