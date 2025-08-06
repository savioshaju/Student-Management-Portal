import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavSidebar from './NavSidebar';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <>
      <nav className="w-full bg-gray-100 shadow-md px-4 py-3 flex items-center fixed top-0 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-none focus:outline-none text-green-700 font-bold text-lg"
        >
          ☰
        </button>
      </nav>

      {isSidebarOpen && <NavSidebar />}
    </>
  );
};

export default Navbar;
