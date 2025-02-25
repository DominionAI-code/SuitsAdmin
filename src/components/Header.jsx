// import { useState } from "react";
// import { Link } from "react-router-dom";
// import Logo from "../assets/restaurant-logo.jpg";
// import ProfilePlaceholder from "../assets/user-placeholder.jpg";

// const Header = ({ user }) => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   return (
//     <header className="flex justify-between items-center p-5 bg-white shadow-md">
//       {/* Logo & Name */}
//       <div className="flex items-center space-x-3">
//         <img src={Logo} alt="Logo" className="h-10 w-10" />
//         <h1 className="text-xl font-bold text-gray-800">Suits Admin</h1>
//       </div>

//       {/* User Profile */}
//       <div className="relative">
//         <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center space-x-3 focus:outline-none">
//           <p className="text-gray-700 font-semibold">{user?.firstName || "User"}</p>
//           <img src={user?.imageUrl || ProfilePlaceholder} alt="User" className="w-10 h-10 rounded-full border-2 border-indigo-500 shadow-md" />
//         </button>

//         {/* Dropdown Menu */}
//         {showDropdown && (
//           <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
//             <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
//               Profile
//             </Link>
//             <button
//               className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
//               onClick={() => {
//                 localStorage.removeItem("user");
//                 window.location.href = "/login";
//               }}
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;


import { Link } from "react-router-dom";
import Logo from "../assets/restaurant-logo.jpg";

const Header = ({ user }) => {
  // Check if the user has an uploaded profile image, otherwise use a default placeholder
  const profileImage = user?.profilePicture || "/assets/user-placeholder.jpg"; // If image is in "public/assets"

  return (
    <header className="bg-yellow-900 shadow-md p-4 flex justify-between items-center">
      <Link to="/">
        <img src={Logo} alt="Suits Admin" className="h-10 rounded-4xl" />
      </Link>

      <div className="flex items-center gap-4">
        <p className="text-gray-200 font-medium">{user?.name || "Guest"}</p>

        {/* Profile Picture */}
        <img
          src={profileImage}
          alt="User Profile"
          className="w-10 h-10 rounded-full border border-gray-300 object-cover"
        />
      </div>
    </header>
  );
};

export default Header;
