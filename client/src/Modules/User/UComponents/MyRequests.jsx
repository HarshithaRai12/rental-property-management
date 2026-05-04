import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyRequests() {
  const [data, setData] = useState([]);

  const username = localStorage.getItem("UserName");

  useEffect(() => {
    axios
      .get("http://localhost:7000/request/getrequests")
      .then((res) => {
        const mine = res.data.filter(
          (item) => item.tenantName === username
        );
        setData(mine);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#f8faf8"
      }}
    >
      <h1 style={{ color: "green" }}>
        My Requests
      </h1>

      {data.map((item) => (
        <div
          key={item._id}
          style={{
            background: "white",
            padding: "20px",
            marginTop: "15px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
          }}
        >
          <h2>{item.propertyId.title}</h2>
          <p>{item.propertyId.location}</p>
          <p>₹ {item.propertyId.price}</p>
          <p>
            Status:
            <b style={{ color: "green" }}>
              {" "}
              {item.status}
            </b>
          </p>
        </div>
      ))}
    </div>
  );
}