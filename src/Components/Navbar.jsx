import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavSidebar from './NavSidebar';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const hideButton = /^\/user\/\d+$/.test(location.pathname);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <>
      <nav className="w-full bg-gray-100 shadow-md px-4 py-3 flex items-center gap-6 fixed top-0 z-50">
        {!hideButton && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-none focus:outline-none text-blue-500 font-bold text-lg"
          >
            ☰
          </button>
        )}
        <h1 className="text-blue-600 font-bold text-lg">
          Student Management Portal
        </h1>
      </nav>

      {isSidebarOpen && <NavSidebar />}
    </>
  );
};

export default Navbar;
