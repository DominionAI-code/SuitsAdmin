// import { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

// const WelcomeImage = new URL("../assets/welcome-bg.jpg", import.meta.url).href;

// function Home() {
//   const [user, setUser] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   useEffect(() => {
//     // Fetch user from local storage after login
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <Header user={user} />

//         {/* Welcome Section */}
//         <div
//           className="flex-1 flex items-center justify-center bg-cover bg-center relative overflow-hidden"
//           style={{ backgroundImage: `url(${WelcomeImage})` }}
//         >
//           {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}

//           <h1 className="relative text-red-700 text-5xl font-extrabold animate-fadeIn">
//             Welcome, {user?.firstName || "Guest"}!
//           </h1>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;



import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const WelcomeImage = new URL("../assets/welcome-bg.jpg", import.meta.url).href;

function Home() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Fetch user from local storage after login
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <Header user={user} />

        {/* Welcome Section */}
        <div
          className="flex-1 flex items-center justify-center bg-cover bg-center relative overflow-hidden p-4 sm:p-6 md:p-8 lg:p-12 text-center"
          style={{ backgroundImage: `url(${WelcomeImage})` }}
        >
          <h1 className="relative text-red-700 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold animate-fadeIn leading-tight">
            Welcome, {user?.firstName || "Guest"}!
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;