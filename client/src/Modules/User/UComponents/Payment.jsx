import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


export default function Payment() {

  const navigate = useNavigate();
  const location = useLocation();

const property = location.state;

  const [method, setMethod] = useState("UPI");
  const [cardHolderName, setCardHolderName] = useState("");
const [cardNumber, setCardNumber] = useState("");
const [expiryDate, setExpiryDate] = useState("");
const [cvv, setCvv] = useState("");
const [upiId, setUpiId] = useState("");

  const handlePayment = async () => {

  if (method === "UPI") {

  // If user entered UPI ID, validate it
  if (upiId) {

    const upiPattern = /^[a-zA-Z0-9._-]+@upi$/;

    if (!upiPattern.test(upiId)) {

      alert("Enter a valid UPI ID");

      return;
    }

  }

}

    if (method === "Card") {

  if (
    !cardHolderName ||
    !cardNumber ||
    !expiryDate ||
    !cvv
  ) {

    alert("Please fill all card details");

    return;
  }

}

    try {

     const tenantName = localStorage.getItem("UserName");

const paymentData = {
  propertyId: property?._id,
  tenantName: tenantName,
  propertyName: property?.title,
  amount: property?.price,
  paymentMethod: method,
  cardHolderName: cardHolderName,
cardNumber: cardNumber,
};

      const res = await axios.post(
        "https://rentease-backend-m0bo.onrender.com/payment/pay",
        paymentData
      );

      if (res.data.success) {

  alert("Payment Successful ✅");

  navigate("/receipt", {
    state: res.data.data
  });

}

    } catch (error) {

      console.log(error);

      alert("Payment Failed");

    }

  };

  const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px"
};

  return (

    <div style={{
      minHeight: "100vh",
      background: "#f4f6f4",
      padding: "50px",
      fontFamily: "'Segoe UI', sans-serif"
    }}>

      <div style={{
        maxWidth: "1100px",
        margin: "auto",
        background: "white",
        borderRadius: "16px",
        padding: "40px",
        boxShadow: "0 2px 14px rgba(0,0,0,0.08)"
      }}>

        <button
          onClick={() => navigate("/myhouse")}
          style={{
            background: "none",
            border: "none",
            color: "#0a8f08",
            cursor: "pointer",
            marginBottom: "20px",
            fontSize: "15px",
            fontWeight: "600"
          }}
        >
          ← Back to My House
        </button>

        <h1 style={{
          color: "#0a8f08",
          marginBottom: "10px"
        }}>
          Make Payment
        </h1>

        <p style={{
          color: "#666",
          marginBottom: "35px"
        }}>
          Complete your rent payment securely.
        </p>

        <div style={{
          display: "flex",
          gap: "30px"
        }}>

          {/* Left Side */}
          <div style={{
            flex: 2,
            border: "1px solid #eee",
            borderRadius: "14px",
            padding: "30px"
          }}>

            <h3>Payment Details</h3>

            <div style={{ marginTop: "25px" }}>

              <label>Amount to Pay</label>

              <input
                type="text"
                value="₹ 20,000"
                readOnly
                style={{
                  width: "100%",
                  padding: "14px",
                  marginTop: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "15px"
                }}
              />

            </div>

            <div style={{ marginTop: "25px" }}>

              <label>Select Payment Method</label>

              
              <div style={{
  marginTop: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "15px"
}}>

  {/* UPI */}
  <label style={{
    border: method === "UPI" ? "2px solid #0a8f08" : "1px solid #ddd",
    padding: "15px",
    borderRadius: "10px",
    cursor: "pointer"
  }}>

    <input
      type="radio"
      value="UPI"
      checked={method === "UPI"}
      onChange={(e) => setMethod(e.target.value)}
    />
    {" "}UPI Payment

    {method === "UPI" && (

  <div style={{
    marginTop: "20px",
    textAlign: "center"
  }}>

    <img
      src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=RentPayment"
      alt="QR Code"
      style={{
        width: "180px",
        height: "180px",
        borderRadius: "10px"
      }}
    />

    <p style={{
      marginTop: "10px",
      color: "#555"
    }}>
      Scan QR to complete payment
    </p>

    {/* Divider */}
    <div style={{
      display: "flex",
      alignItems: "center",
      margin: "20px 0"
    }}>

      <hr style={{ flex: 1 }} />

      <span style={{
        margin: "0 10px",
        color: "#777",
        fontSize: "14px"
      }}>
        OR
      </span>

      <hr style={{ flex: 1 }} />

    </div>

    {/* UPI ID Input */}
   <input
  type="text"
  placeholder="Enter UPI ID (example@upi)"
  value={upiId}
  onChange={(e) => setUpiId(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px"
  }}
/>

  </div>

)}

  </label>


  {/* CARD */}
  <label style={{
    border: method === "Card" ? "2px solid #0a8f08" : "1px solid #ddd",
    padding: "15px",
    borderRadius: "10px",
    cursor: "pointer"
  }}>

    <input
      type="radio"
      value="Card"
      checked={method === "Card"}
      required  
      onChange={(e) => setMethod(e.target.value)}
    />
    {" "}Debit / Credit Card

    {method === "Card" && (

      <div style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>

        <input
  type="text"
  placeholder="Card Holder Name"
  style={inputStyle}
  value={cardHolderName}
  onChange={(e) => setCardHolderName(e.target.value)}
/>

        <input
  type="text"
  placeholder="Card Number"
  style={inputStyle}
  value={cardNumber}
  onChange={(e) => setCardNumber(e.target.value)}
/>

        <div style={{
          display: "flex",
          gap: "15px"
        }}>

          <input
  type="text"
  placeholder="MM/YY"
  style={inputStyle}
  value={expiryDate}
  onChange={(e) => setExpiryDate(e.target.value)}
/>

          <input
  type="password"
  placeholder="CVV"
  style={inputStyle}
  value={cvv}
  onChange={(e) => setCvv(e.target.value)}
/>

        </div>

      </div>

    )}

  </label>


  {/* COD */}
  <label style={{
    border: method === "COD" ? "2px solid #0a8f08" : "1px solid #ddd",
    padding: "15px",
    borderRadius: "10px",
    cursor: "pointer"
  }}>

    <input
      type="radio"
      value="COD"
      checked={method === "COD"}
      onChange={(e) => setMethod(e.target.value)}
    />
    {" "}Cash

    {method === "COD" && (

      <p style={{
        marginTop: "15px",
        color: "#555",
        fontSize: "14px"
      }}>
        You can pay the rent amount directly to the property owner.
      </p>

    )}

  </label>

</div>

            </div>

            <button
              onClick={handlePayment}
              style={{
                width: "100%",
                marginTop: "35px",
                background: "#0a8f08",
                color: "white",
                border: "none",
                padding: "15px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600"
              }}
            >
              🔒 Proceed to Pay
            </button>

          </div>

          {/* Right Side */}
          <div style={{
            flex: 1,
            border: "1px solid #eee",
            borderRadius: "14px",
            padding: "30px",
            height: "fit-content"
          }}>

            <h3>Payment Summary</h3>

            <div style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              fontSize: "15px"
            }}>

              <div style={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <span>Property</span>
                <strong>Houze</strong>
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <span>Location</span>
                <strong>Mangalore</strong>
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <span>Monthly Rent</span>
                <strong>₹ 20,000</strong>
              </div>

              <hr />

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "22px",
                color: "#0a8f08",
                fontWeight: "700"
              }}>
                <span>Total</span>
                <span>₹ 20,000</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}