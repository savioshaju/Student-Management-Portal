import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { useLocation,useNavigate } from 'react-router-dom';
const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="flex  min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;