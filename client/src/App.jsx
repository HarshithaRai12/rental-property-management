import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import TopBar from "./Modules/User/UComponents/TopBar";
import AdminRoute from './Modules/Admin/ARoutes/AdminRoute'
import UserRoute from './Modules/User/URoutes/UserRoute'
import Footer from "./Modules/User/UComponents/Footer";

function App() {

  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <TopBar />}

      <Routes>
        <Route path="/*" element={<UserRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>

      {!isAdmin && <Footer />}
    </>
  );
}

export default App;