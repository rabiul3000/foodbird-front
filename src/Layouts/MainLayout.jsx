import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import LoadingPage from "../pages/LoadingPage/LoadingPage";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
  }, [location]);

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  return (
    <div>
      <Navbar />
      {loading ? <LoadingPage /> : <Outlet />}
    </div>
  );
};

export default MainLayout;
