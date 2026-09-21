import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function MyHouse() {
  const [house, setHouse] = useState([])
  const navigate = useNavigate()
  

  useEffect(() => {
    const token = localStorage.getItem("UserToken")
    if (!token) {
      navigate("/userlogin")
      return  
    }
    axios.get("http://localhost:7000/request/myhouse", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setHouse(res.data.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div style={{
      padding: "40px 60px",
      minHeight: "100vh",
      background: "#f4f6f4",
      fontFamily: "'Segoe UI', sans-serif"
    }}>

      {/* Page Header */}
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{
          color: "#1e7e1e",
          fontSize: "32px",
          fontWeight: "700",
          margin: "0 0 6px 0"
        }}>
          My House
        </h1>
        <p style={{ color: "#666", margin: 0, fontSize: "15px" }}>
          Here is your approved property. Happy Renting! 🏠
        </p>
      </div>

      {/* Empty State */}
      {house.length === 0 ? (
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "60px",
          textAlign: "center",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
        }}>
          <p style={{ fontSize: "18px", color: "#555" }}>
            You have not rented any property yet.
          </p>
          <button
            onClick={() => navigate("/browse")}
            style={{
              marginTop: "16px",
              padding: "12px 24px",
              background: "#1e7e1e",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "600"
            }}
          >
            Browse Properties
          </button>
        </div>
      ) : (

        house.map((item) => (
          <div
            key={item._id}
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
              display: "flex",
              gap: "32px",
              marginBottom: "28px",
              alignItems: "flex-start"
            }}
          >
            {/* Property Image */}
            <img
              src={
                item.propertyId.propertyimages?.length
                  ? `http://localhost:7000/image/${item.propertyId.propertyimages[0]}`
                  : `http://localhost:7000/image/${item.propertyId.propertyimage}`
              }
              alt={item.propertyId.title}
              style={{
                width: "380px",
                height: "280px",
                objectFit: "cover",
                borderRadius: "12px",
                flexShrink: 0
              }}
            />

            {/* Property Details */}
            <div style={{ flex: 1 }}>
              {/* Title */}
              <h2 style={{
                fontSize: "26px",
                fontWeight: "700",
                margin: "0 0 6px 0",
                color: "#111"
              }}>
                {item.propertyId.title}
              </h2>

              {/* Location */}
              <p style={{
                color: "#e05c7a",
                fontSize: "15px",
                margin: "0 0 20px 0",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}>
                <span>📍</span> {item.propertyId.location}
              </p>

              {/* Details Table */}
              <div style={{ borderTop: "1px solid #f0f0f0" }}>

                <DetailRow
                  icon="🏠"
                  label="Property Type"
                  value={item.propertyId.type}
                />
                <DetailRow
                  icon="₹"
                  label="Price"
                  value={`${Number(item.propertyId.price).toLocaleString('en-IN')}`}
                  bold
                />
                <DetailRow
                  icon="📅"
                  label="Approved On"
                  value={
                    item.approvedOn
                      ? new Date(item.approvedOn).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'long', year: 'numeric'
                        })
                      : "20 May 2024"
                  }
                  bold
                />
                <DetailRow
                  icon="👤"
                  label="Tenant Name"
                  value={item.user?.name}
                  bold
                />

                {/* Status Row */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 0",
                  borderBottom: "1px solid #f0f0f0"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#555" }}>
                    <span>✅</span>
                    <span style={{ fontSize: "15px" }}>Status</span>
                  </div>
                  <span style={{
                    background: "#e8f5e9",
                    color: "#1e7e1e",
                    padding: "4px 14px",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "600",
                    border: "1px solid #c8e6c9"
                  }}>
                    Approved
                  </span>

                  
                </div>
              </div>

              {/* Congratulations Banner */}
              <div style={{
                marginTop: "18px",
                background: "#f0faf0",
                border: "1px solid #d4edda",
                borderRadius: "10px",
                padding: "14px 18px",
                display: "flex",
                alignItems: "flex-start",
                gap: "10px"
              }}>
                <span style={{ fontSize: "20px", marginTop: "1px" }}>✅</span>
                <div>
                  <p style={{
                    color: "#1e7e1e",
                    fontWeight: "700",
                    margin: "0 0 4px 0",
                    fontSize: "15px"
                  }}>
                    Congratulations!
                  </p>
                  <p style={{ margin: 0, color: "#444", fontSize: "14px" }}>
                    You have successfully rented this property. Enjoy your new home!
                  </p>
                </div>
              </div>
              <div style={{
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "20px"
}}>

  <button
   onClick={() =>
  navigate("/payment", {
    state: item.propertyId
    
  })
}
style={{
              padding: "12px 28px",
              background: "#1e7e1e",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "600",
              whiteSpace: "nowrap"
            }} 
  >
    💳 Pay Now
  </button>

</div>
            </div>
          </div>
        ))
      )}

      {/* Footer CTA */}
      {house.length > 0 && (
        <div style={{
          marginTop: "16px",
          background: "white",
          borderRadius: "14px",
          padding: "20px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "2px solid #1e7e1e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px"
            }}>
              🏠
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: "700", fontSize: "15px", color: "#111" }}>
                Looking for another place?
              </p>
              <p style={{ margin: 0, color: "#777", fontSize: "13px" }}>
                Browse more properties and find your next home.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/browse")}
            style={{
              padding: "12px 28px",
              background: "#1e7e1e",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "600",
              whiteSpace: "nowrap"
            }}
          >
            Browse Properties
          </button>
        </div>
      )}

    </div>
  )
}

// Reusable detail row component
function DetailRow({ icon, label, value, bold }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 0",
      borderBottom: "1px solid #f0f0f0"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#555" }}>
        <span>{icon}</span>
        <span style={{ fontSize: "15px" }}>{label}</span>
      </div>
      <span style={{
        fontWeight: bold ? "700" : "400",
        color: "#111",
        fontSize: "15px"
      }}>
        {value}
      </span>
    </div>
  )
}
