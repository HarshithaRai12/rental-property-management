import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "../AComponents/Sidebar";
import AdminDashboard from "../AComponents/AdminDashboard";
import AddProperty from "../AComponents/AddProperty";
import ViewProperty from "../AComponents/ViewProperty";
import ViewRequests from "../AComponents/ViewRequests";
import AdminLogin from "../AComponents/AdminLogin";

export default function AdminRoute() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route path="login" element={<AdminLogin />} />

      {/* ADMIN PANEL */}
      <Route path="/" element={<Sidebar />}>

        <Route index element={<AdminDashboard />} />
        <Route path="addproperty" element={<AddProperty />} />
        <Route path="viewproperty" element={<ViewProperty />} />
        <Route path="viewrequests" element={<ViewRequests />} />

      </Route>

    </Routes>
  );
}

// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import Sidebar from "../AComponents/Sidebar";
// import AddProperty from '../AComponents/AddProperty'
// import ViewProperty from '../AComponents/ViewProperty'
// import UpdateProperty from '../AComponents/UpdateProperty'
// import ViewRequests from '../AComponents/ViewRequests'
// import AdminLogin from '../AComponents/AdminLogin'
// import AdminDashboard from "../AComponents/AdminDashboard";

// export default function AdminRoute() {
//   return (
//     <Routes>
//       <Route path="/Admin" element={<Sidebar />}/>
//       <Route path="/addproperty" element={<AddProperty />} />
//       <Route path="/viewproperty" element={<ViewProperty />} />
//       <Route path="/updateproperty" element={<UpdateProperty />} />
//       <Route path="/requests" element={<ViewRequests />} />
//       <Route path="/adminlogin" element={<AdminLogin />} />
//       <Route path="/" element={<AdminDashboard />} />
//     </Routes>
//   )
// }