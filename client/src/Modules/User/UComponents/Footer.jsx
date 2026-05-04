import React from "react";

export default function Footer() {
  return (
    <div
      style={{
        background: "#111",
        color: "white",
        padding: "30px",
        textAlign: "center"
      }}
    >
      <h2 style={{ color: "#4caf50" }}>
        RentalHome
      </h2>

      <p>
        Find trusted rental homes with ease.
      </p>

      <p style={{ marginTop: "10px", color: "#aaa" }}>
        © 2026 RentalHome. All rights reserved.
      </p>
    </div>
  );
}