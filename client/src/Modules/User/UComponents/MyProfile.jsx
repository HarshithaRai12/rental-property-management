import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyProfile() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("UserToken");

   axios.get("http://localhost:7000/user/getprofile", {
  headers: {
    Authorization: `Bearer ${token}`
  }    
})
    .then((res) => {
      console.log(res.data);  
      setUser(res.data.udata);
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);

  if (!user) return <h2 style={{ padding: "40px" }}>Loading...</h2>;

  return (
    <div style={{
      padding: "40px",
      background: "#f8faf8",
      minHeight: "100vh"
    }}>
      <h1 style={{ color: "green" }}>My Profile</h1>

      <div style={{
        marginTop: "20px",
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "400px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Address:</b> {user.address}</p>
      </div>
    </div>
  );
}