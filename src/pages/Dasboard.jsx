import React from 'react'
import Sidebar from '../components/Sidebar'
import { useLocation } from "react-router-dom";

const Dasboard = () => {
  const location = useLocation();
  const insideDashboard = location.state?.insideDashboard || false;

  return (
    <div>
      {insideDashboard}
      <h2>Dashboard Content</h2>
    </div>
  );
};

export default Dasboard