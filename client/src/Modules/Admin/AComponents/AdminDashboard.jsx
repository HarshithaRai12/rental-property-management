import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

  const [properties, setProperties] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7000/property/getproperties")
      .then(res => setProperties(res.data));

    axios.get("http://localhost:7000/request/getrequests")
      .then(res => setRequests(res.data));
  }, []);

  const approved = requests.filter(r => r.status === "approved");

  return (
    <div style={{ padding: "40px" }}>

      <h1 style={{ color: "green" }}>Admin Dashboard</h1>

      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "20px"
      }}>

        <div style={card}>
          <h2>{properties.length}</h2>
          <p>Total Properties</p>
        </div>

        <div style={card}>
          <h2>{requests.length}</h2>
          <p>Total Requests</p>
        </div>

        <div style={card}>
          <h2>{approved.length}</h2>
          <p>Approved Requests</p>
        </div>

      </div>

    </div>
  );
}

const card = {
  background: "white",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  width: "200px",
  textAlign: "center"
};