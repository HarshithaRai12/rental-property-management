import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PaymentHistory() {

  const [payments, setPayments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    axios.get(
      "https://rentease-backend-m0bo.onrender.com/payment/history/Harshitha Rai"
    )
    .then((res) => {

      if (res.data.success) {
        setPayments(res.data.data);
      }

    })
    .catch((err) => console.log(err));

  }, []);

  return (

    <div style={{
      minHeight: "100vh",
      background: "#f4f6f4",
      padding: "40px",
      fontFamily: "'Segoe UI', sans-serif"
    }}>

      <div style={{
        maxWidth: "1200px",
        margin: "auto",
        background: "white",
        borderRadius: "18px",
        padding: "35px",
        boxShadow: "0 2px 15px rgba(0,0,0,0.08)"
      }}>

        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}>

          <div>

            <h1 style={{
              color: "#0a8f08",
              marginBottom: "8px"
            }}>
              Payment History
            </h1>

            <p style={{
              color: "#666",
              margin: 0
            }}>
              View all your previous rent payments.
            </p>

          </div>

          <button
            onClick={() => navigate("/myhouse")}
            style={{
              background: "#0a8f08",
              color: "white",
              border: "none",
              padding: "12px 22px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            ← Back
          </button>

        </div>

        {/* Table */}
        <div style={{
          overflowX: "auto"
        }}>

          <table style={{
            width: "100%",
            borderCollapse: "collapse"
          }}>

            <thead>

              <tr style={{
                background: "#f0faf0"
              }}>

                <th style={tableHead}>Date & Time</th>
                <th style={tableHead}>Property</th>
                <th style={tableHead}>Amount</th>
                <th style={tableHead}>Method</th>
                <th style={tableHead}>Transaction ID</th>
                <th style={tableHead}>Status</th>

              </tr>

            </thead>

            <tbody>

              {payments.map((item) => (

                <tr key={item._id}>

                  <td style={tableData}>
                    {new Date(item.paymentDate)
                      .toLocaleString("en-IN")}
                  </td>

                  <td style={tableData}>
                    {item.propertyName}
                  </td>

                  <td style={tableData}>
                    ₹ {item.amount}
                  </td>

                  <td style={tableData}>
                    {item.paymentMethod}
                  </td>

                  <td style={tableData}>
                    {item.transactionId}
                  </td>

                  <td style={tableData}>

                    <span style={{
                      background: "#e8f5e9",
                      color: "#0a8f08",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "600"
                    }}>
                      {item.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}


const tableHead = {
  padding: "16px",
  textAlign: "left",
  color: "#0a8f08",
  fontSize: "15px",
  borderBottom: "1px solid #ddd"
};

const tableData = {
  padding: "16px",
  borderBottom: "1px solid #f0f0f0",
  fontSize: "14px",
  color: "#333"
};

