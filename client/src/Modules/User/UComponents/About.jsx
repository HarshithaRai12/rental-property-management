import React from "react";

export default function About() {
  return (
    <div
      style={{
        minHeight: "80vh",
        padding: "50px",
        background: "#f8faf8"
      }}
    >
      <h1 style={{ color: "green" }}>
        About RentalHome
      </h1>

      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        RentalHome helps users find affordable,
        trusted rental properties quickly and
        easily. Owners can list homes and users
        can request properties online.
      </p>
    </div>
  );
}