import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import { toast } from "react-toastify";
import RestaurantBarImage from "../assets/restaurant-bar.jpg"; // ✅ Import image

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.phoneNumber) {
      toast.warning("Please fill in all required fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Registration failed");

      toast.success("Successfully Registered! Login with your details.");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "inventoryapp");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
        method: "POST",
        body: data,
      });

      const file = await res.json();
      setForm({ ...form, imageUrl: file.url });
      toast.success("Image Successfully Uploaded");
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen items-center place-items-center bg-gray-100">
      {/* Left Side - Restaurant/Bar Image */}
      <div className="hidden sm:block">
        <img
          src={RestaurantBarImage}
          alt="Restaurant Bar"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <img className="mx-auto h-16" src="/assets/restaurant-logo.png" alt="Suits Admin" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Create an Account</h2>
          <p className="text-gray-600">Join us to manage your restaurant & sales</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={registerUser}>
          <div className="flex gap-4">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-800"
              value={form.firstName}
              onChange={handleInputChange}
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-800"
              value={form.lastName}
              onChange={handleInputChange}
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-800"
            value={form.email}
            onChange={handleInputChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-800"
            value={form.password}
            onChange={handleInputChange}
          />

          <input
            name="phoneNumber"
            type="number"
            placeholder="Phone Number"
            required
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-800"
            value={form.phoneNumber}
            onChange={handleInputChange}
          />

          <UploadImage uploadImage={uploadImage} />

          <div className="flex items-center">
            <input id="terms" type="checkbox" required className="w-4 h-4 text-yellow-800" />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">I agree to the Terms & Conditions</label>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-800 text-white py-2 rounded-lg hover:bg-yellow-900 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">Sign in now</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
