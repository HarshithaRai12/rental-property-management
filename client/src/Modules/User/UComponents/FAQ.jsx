import React from "react";

export default function FAQ() {
  return (
    <div
      style={{
        minHeight: "80vh",
        padding: "50px",
        background: "#f8faf8"
      }}
    >
      <h1 style={{ color: "green" }}>
        Frequently Asked Questions
      </h1>

      <p><b>How to request property?</b></p>
      <p>Login and click Request Property.</p>

      <p style={{ marginTop: "20px" }}>
        <b>How to track request?</b>
      </p>
      <p>Open My Requests page.</p>
    </div>
  );
}