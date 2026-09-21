import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Receipt() {

  const location = useLocation();
  const navigate = useNavigate();

  const payment = location.state;

  if (!payment) {
    return <h2>No Receipt Found</h2>;
  }

  return (

    <div style={{
      minHeight: "100vh",
      background: "#f4f6f4",
      padding: "40px",
      fontFamily: "'Segoe UI', sans-serif"
    }}>

      <div style={{
        maxWidth: "1000px",
        margin: "auto",
        background: "white",
        borderRadius: "18px",
        padding: "40px",
        boxShadow: "0 2px 15px rgba(0,0,0,0.08)"
      }}>

        {/* Success Banner */}
        <div style={{
          background: "#eef9ee",
          border: "1px solid #cde8cd",
          padding: "20px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: "18px"
        }}>

          <div style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#0a8f08",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px"
          }}>
            ✓
          </div>

          <div>
            <h1 style={{
              margin: 0,
              color: "#0a8f08"
            }}>
              Payment Successful!
            </h1>

            <p style={{
              margin: "6px 0 0 0",
              color: "#555"
            }}>
              Your payment has been received successfully.
            </p>
          </div>

        </div>

        {/* Receipt Title */}
        <div style={{
          textAlign: "center",
          marginTop: "40px",
          marginBottom: "40px"
        }}>

          <h1 style={{
            color: "#0a8f08",
            marginBottom: "10px"
          }}>
            Payment Receipt
          </h1>

          <p style={{
            color: "#666",
            fontSize: "15px"
          }}>
            Transaction ID: <strong>{payment.transactionId}</strong>
          </p>

        </div>

        {/* Details Section */}
        <div style={{
          display: "flex",
          gap: "25px"
        }}>

          {/* Left */}
          <div style={{
            flex: 1,
            border: "1px solid #eee",
            borderRadius: "14px",
            padding: "25px"
          }}>

            <h3 style={{ color: "#0a8f08" }}>
              Payment Details
            </h3>

            <ReceiptRow
  label="Payment Method"
  value={payment.paymentMethod}
/>

{
  payment.paymentMethod === "Card" && (
    <>
      <ReceiptRow
        label="Card Holder"
        value={payment.cardHolderName}
      />

      <ReceiptRow
        label="Card Number"
        value={
          "**** **** **** " +
          payment.cardNumber?.slice(-4)
        }
      />
    </>
  )
}

            {/* <ReceiptRow
              label="Payment Method"
              value={payment.paymentMethod}
            /> */}

            <ReceiptRow
              label="Payment Status"
              value={payment.status}
            />

            <ReceiptRow
              label="Date & Time"
              value={
                new Date(payment.paymentDate).toLocaleString("en-IN")
              }
            />

          </div>

          {/* Right */}
          <div style={{
            flex: 1,
            border: "1px solid #eee",
            borderRadius: "14px",
            padding: "25px"
          }}>

            <h3 style={{ color: "#0a8f08" }}>
              Property Details
            </h3>

            <ReceiptRow
              label="Property"
              value={payment.propertyName}
            />

            <ReceiptRow
              label="Amount Paid"
              value={`₹ ${payment.amount}`}
            />

          </div>

        </div>

        {/* Total */}
        <div style={{
          marginTop: "35px",
          background: "#f3fbf3",
          border: "1px dashed #8fd18f",
          padding: "22px",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "28px",
          fontWeight: "700",
          color: "#0a8f08"
        }}>

          <span>Total Paid</span>

          <span>₹ {payment.amount}</span>

        </div>

        {/* Buttons */}
        <div style={{
          marginTop: "40px",
          display: "flex",
          gap: "20px"
        }}>

          <button
            onClick={() => window.print()}
            style={{
              flex: 1,
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #0a8f08",
              background: "white",
              color: "#0a8f08",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            🖨 Print Receipt
          </button>

          <button
            onClick={() => navigate("/myhouse")}
            style={{
              flex: 1,
              padding: "15px",
              borderRadius: "10px",
              border: "none",
              background: "#0a8f08",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            🏠 Back to My House
          </button>

        </div>

      </div>

    </div>

  );
}


function ReceiptRow({ label, value }) {

  return (

    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "14px 0",
      borderBottom: "1px solid #f0f0f0"
    }}>

      <span style={{ color: "#555" }}>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>

  );
}