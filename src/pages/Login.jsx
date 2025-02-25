// import { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import RestaurantLoginImage from "../assets/restaurant-login.jpeg"; // ✅ Import image
// import RestaurantLogo from "../assets/restaurant-logo.jpg";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
  
//   const authContext = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const loginUser = async (e) => {
//     e.preventDefault();

//     if (!form.email || !form.password) {
//       toast.warning("Please fill in all fields!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:4000/api/login", form);
//       const userData = response.data;
//       localStorage.setItem("user", JSON.stringify(userData));
      
//       authContext.signin(userData._id, () => {
//         toast.success("Login successful!");
//         navigate("/home");
//       });
//     } catch (error) {
//       toast.error("Invalid credentials, try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 h-screen items-center place-items-center bg-amber-50">
//       <div className="hidden sm:block relative w-[3/5] h-screen">
//         {/* Background Image */}
//         <img
//             src={RestaurantLoginImage}
//             alt="Restaurant Login"
//             className="w-full h-full object-cover"
//         />

//         {/* Light Dark Overlay (Faint) */}
//         {/* <div className="absolute inset-0 bg-gray-400 bg-opacity-1"></div>   */}
//         </div>


//       {/* <div className="hidden sm:block bg-opacity-50">
//         <img
//         src={RestaurantLoginImage}
//         alt="Restaurant Login"
//         className="w-[3/5] h-screen object-cover"
//         />
//       </div> */}

//       {/* Right Side - Login Form */}
//       <div className="w-full max-w-md p-8 bg-gray-50 shadow-lg rounded-lg">
//         <div className="text-center">
//           <img
//             className="mx-auto h-16"
//             src={RestaurantLogo}
//             alt="Suits Admin"
//           />
//           <h2 className="mt-4 text-2xl font-bold text-gray-900">Welcome Back!</h2>
//           <p className="text-gray-600">Sign in to manage your restaurant & sales</p>
//         </div>

//         <form className="mt-6 space-y-4" onSubmit={loginUser}>
//           <div>
//             <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-800"
//               placeholder="Enter your email"
//               value={form.email}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               autoComplete="current-password"
//               required
//               className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-800"
//               placeholder="Enter your password"
//               value={form.password}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="flex justify-between items-center">
//             <div className="flex items-center">
//               <input id="remember-me" type="checkbox" className="w-4 h-4 text-yellow-800" />
//               <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">Remember me</label>
//             </div>
//             <Link to="/forgot-password" className="text-sm text-yellow-800 hover:underline">
//               Forgot password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-yellow-800 text-white py-2 rounded-lg hover:bg-yellow-900 flex items-center justify-center"
//             disabled={loading}
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm text-gray-600">
//           Don't have an account?{" "}
//           <Link to="/register" className="text-yellow-800 hover:underline">Register now</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import RestaurantLoginImage from "../assets/restaurant-login.jpeg";
import RestaurantLogo from "../assets/restaurant-logo.jpg";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.warning("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/login", form);
      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData));
      authContext.signin(userData._id, () => {
        toast.success("Login successful!");
        navigate("/home");
      });
    } catch (error) {
      toast.error("Invalid credentials, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full items-center justify-center bg-amber-50 p-4 md:p-0">
      {/* Left side - Image for larger screens */}
      <div className="hidden md:flex md:w-3/5 h-full">
        <img src={RestaurantLoginImage} alt="Restaurant Login" className="w-full h-full object-cover" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full h-screen max-w-md p-6 md:p-8 bg-gray-50 shadow-lg rounded-lg flex flex-col items-center">
        <img className="h-16" src={RestaurantLogo} alt="Suits Admin" />
        <h2 className="mt-4 text-2xl md:text-3xl font-bold text-gray-900">Welcome Back!</h2>
        <p className="text-gray-600 text-sm md:text-base text-center">Sign in to manage your restaurant & sales</p>
        
        <form className="mt-6 w-full space-y-4" onSubmit={loginUser}>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-800"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-800"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <input id="remember-me" type="checkbox" className="w-4 h-4 text-yellow-800" />
              <label htmlFor="remember-me" className="ml-2 text-gray-700">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-yellow-800 hover:underline">Forgot password?</Link>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-800 text-white py-2 rounded-lg hover:bg-yellow-900 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-yellow-800 hover:underline">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;