import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPayments() {

  const [payments, setPayments] = useState([]);

  useEffect(() => {

    axios.get("https://rentease-backend-m0bo.onrender.com/payment/all")
      .then((res) => {

        if (res.data.success) {
          setPayments(res.data.data);
        }

      })
      .catch((err) => console.log(err));

  }, []);

  // TOTAL REVENUE
  const totalRevenue = payments.reduce(
    (total, item) => total + item.amount,
    0
  );

  // CARD PAYMENTS
  const cardPayments = payments.filter(
    (item) => item.paymentMethod === "Card"
  ).length;

  // UPI PAYMENTS
  const upiPayments = payments.filter(
    (item) => item.paymentMethod === "UPI"
  ).length;

  return (

    <div style={{
      padding: "30px",
      background: "#f4f6f8",
      minHeight: "100vh"
    }}>

      {/* PAGE TITLE */}
      <div style={{
        marginBottom: "30px"
      }}>

        <h1 style={{
          fontSize: "38px",
          marginBottom: "10px"
        }}>
          Payments
        </h1>

        <p style={{
          color: "#666",
          fontSize: "17px"
        }}>
          View all tenant payment records and transactions.
        </p>

      </div>

      {/* CARDS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "30px"
      }}>

        <Card
          title="Total Payments"
          value={payments.length}
          color="#0a8f08"
        />

        <Card
          title="Total Revenue"
          value={`₹ ${totalRevenue}`}
          color="#2563eb"
        />

        <Card
          title="UPI Payments"
          value={upiPayments}
          color="#f59e0b"
        />

        <Card
          title="Card Payments"
          value={cardPayments}
          color="#9333ea"
        />

      </div>

      {/* TABLE */}
      <div style={{
        background: "white",
        borderRadius: "18px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
      }}>

        <table style={{
          width: "100%",
          borderCollapse: "collapse"
        }}>

          <thead>

            <tr>

              <th style={tableHead}>Tenant</th>
              <th style={tableHead}>Property</th>
              <th style={tableHead}>Amount</th>
              <th style={tableHead}>Method</th>
              <th style={tableHead}>Transaction ID</th>
              <th style={tableHead}>Date & Time</th>
              <th style={tableHead}>Status</th>

            </tr>

          </thead>

          <tbody>

            {payments.map((item) => (

              <tr key={item._id}>

                <td style={tableData}>
                  {item.tenantName}
                </td>

                <td style={tableData}>
                  {item.propertyName}
                </td>

                <td style={tableData}>
                  ₹ {item.amount}
                </td>

                <td style={tableData}>

                  {
                    item.paymentMethod === "Card"
                      ? "💳 Card"
                      : item.paymentMethod === "UPI"
                      ? "📱 UPI"
                      : "💵 COD"
                  }

                </td>

                <td style={tableData}>
                  {item.transactionId}
                </td>

                <td style={tableData}>
                  {
                    new Date(item.paymentDate)
                      .toLocaleString("en-IN")
                  }
                </td>

                <td style={tableData}>

                  <span style={{
                    background: "#e8f5e9",
                    color: "#0a8f08",
                    padding: "7px 14px",
                    borderRadius: "20px",
                    fontWeight: "600",
                    fontSize: "14px"
                  }}>
                    Paid
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}


function Card({ title, value, color }) {

  return (

    <div style={{
      background: "white",
      borderRadius: "18px",
      padding: "25px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
    }}>

      <h3 style={{
        color: "#666",
        marginBottom: "15px",
        fontSize: "17px"
      }}>
        {title}
      </h3>

      <h1 style={{
        color,
        margin: 0,
        fontSize: "32px"
      }}>
        {value}
      </h1>

    </div>

  );
}


const tableHead = {
  textAlign: "left",
  padding: "18px",
  borderBottom: "1px solid #eee",
  color: "#333",
  fontSize: "15px"
};

const tableData = {
  padding: "18px",
  borderBottom: "1px solid #f3f3f3",
  color: "#444",
  fontSize: "14px"
};