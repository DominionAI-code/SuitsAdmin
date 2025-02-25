import { Link } from "react-router-dom";
import { FaBars, FaHome, FaStore, FaBox, FaTable, FaClipboardList, FaMoneyBill, FaChartBar } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`h-screen bg-gradient-to-b from-yellow-700 to-yellow-900 text-white p-5 shadow-lg transition-all ${isOpen ? "w-1/6" : "w-16"}`}>
      {/* Sidebar Toggle */}
      <button onClick={toggleSidebar} className="text-white text-2xl mb-4 focus:outline-none">
        <FaBars />
      </button>

      {/* Menu Items */}
      <nav className="space-y-4">
        {[
          { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
          { name: "POS", path: "/pos", icon: <FaStore /> },
          { name: "Inventory", path: "/inventory", icon: <FaBox /> },
          { name: "Tables", path: "/tables", icon: <FaTable /> },
          { name: "Orders", path: "/orders", icon: <FaClipboardList /> },
          { name: "Multicurrency", path: "/sales", icon: <FaMoneyBill /> },
          { name: "Reports", path: "/reports", icon: <FaChartBar /> },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center space-x-3 py-2 px-4 rounded-md transition-all duration-300 hover:bg-amber-900 hover:translate-x-2"
          >
            <span className="text-lg">{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
