

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "40px 80px",
        background: "#f8faf8",
        gap: "50px",
      }}
    >
      <div style={{ flex: 1 }}>
        <h1
          style={{
            fontSize: "64px",
            lineHeight: "1.1",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          Find Your Perfect <br />
          <span style={{ color: "green" }}>Rental Home</span>
        </h1>

        <p
          style={{
            fontSize: "24px",
            color: "gray",
            marginBottom: "30px",
          }}
        >
          Affordable homes. Trusted owners. Easy booking.
        </p>

        <button
          onClick={() => navigate("/browse")}
          style={{
            padding: "16px 34px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Browse Properties
        </button>
      </div>

      <div style={{ flex: 1, textAlign: "center" }}>
        <img
          src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900"
          style={{
            width: "100%",
            maxWidth: "650px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </div>
  );
}