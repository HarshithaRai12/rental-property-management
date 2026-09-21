import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`https:/ /rentease-backend-m0bo.onrender.com/property/getproperty/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleRequest = () => {
    const token = localStorage.getItem("UserToken");

    axios.post(
      "https:/ /rentease-backend-m0bo.onrender.com/request/addrequest",
      { propertyId: id },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(() => {
      alert("Request Sent Successfully");
    })
    .catch((err) => {
      console.log(err);

      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    });
  };

  if (!data) return <h2>Loading...</h2>;

  const isRented = data.status === "rented";

  return (
    <div style={{ padding: "30px", background: "#f5f7f6", minHeight: "100vh" }}>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          background: "none",
          border: "none",
          color: "green",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        ← Back to Properties
      </button>

      {/* MAIN CARD */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          background: "#fff",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
        }}
      >

        {/* IMAGE */}
        <div style={{ flex: 1 }}>
          {(data.propertyimages?.length > 0 || data.propertyimage) && (
            <img
              src={
                data.propertyimages?.length > 0
                  ? `https://rentease-backend-m0bo.onrender.com/image/${data.propertyimages[0]}`
                  : `https://rentease-backend-m0bo.onrender.com/image/${data.propertyimage}`
              }
              alt={data.title}
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover",
                borderRadius: "12px"
              }}
            />
          )}
        </div>

        {/* DETAILS */}
        <div style={{ flex: 1 }}>

          <h2>{data.title}</h2>

          <p style={{ color: "#666" }}>📍 {data.location}</p>

          <h3 style={{ color: "green", marginTop: "10px" }}>
            ₹ {data.price} / month
          </h3>

          {/* FEATURES */}
          <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
            <div style={box}>
              🛏 {data.bedrooms}
              <br /> Bedrooms
            </div>

            <div style={box}>
              🛁 {data.bathrooms}
              <br /> Bathrooms
            </div>

            <div style={box}>
              📐 {data.area}
              <br /> sq.ft
            </div>

            <div style={box}>
              🪑 {data.furnishing}
              <br /> Furnished
            </div>
          </div>

          {/* DESCRIPTION */}
          <h4 style={{ marginTop: "20px" }}>About this property</h4>
          <p style={{ color: "#555" }}>{data.description}</p>

          {/* BUTTON */}
          <button
            onClick={handleRequest}
            disabled={isRented}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "14px",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: isRented ? "not-allowed" : "pointer",
              background: isRented ? "#ccc" : "green",
              color: "#fff"
            }}
          >
            {isRented ? "Already Rented" : "Request Property"}
          </button>

        </div>
      </div>

      {/* ✅ MODERN PROPERTY DETAILS */}
      <div
        style={{
          marginTop: "20px",
          background: "#fff",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>Property Details</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px"
          }}
        >

          <div style={detailBox}>
            <span style={icon}>🏠</span>
            <div>
              <p style={label}>Property Type</p>
              <p style={value}>{data.type}</p>
            </div>
          </div>

          <div style={detailBox}>
            <span style={icon}>📐</span>
            <div>
              <p style={label}>Area</p>
              <p style={value}>{data.area} sq.ft</p>
            </div>
          </div>

          <div style={detailBox}>
            <span style={icon}>📍</span>
            <div>
              <p style={label}>Location</p>
              <p style={value}>{data.location}</p>
            </div>
          </div>

          <div style={detailBox}>
            <span style={icon}>🪑</span>
            <div>
              <p style={label}>Furnishing</p>
              <p style={value}>{data.furnishing}</p>
            </div>
          </div>

          <div style={detailBox}>
            <span style={icon}>🏢</span>
            <div>
              <p style={label}>Configuration</p>
              <p style={value}>{data.type}</p>
            </div>
          </div>

          <div style={detailBox}>
            <span style={icon}>⏱</span>
            <div>
              <p style={label}>Availability</p>
              <p style={value}>
                {data.status === "available" ? "Available" : "Rented"}
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

/* STYLES */
const box = {
  background: "#f2f2f2",
  padding: "10px",
  borderRadius: "10px",
  textAlign: "center",
  minWidth: "80px"
};

const detailBox = {
  display: "flex",
  alignItems: "center",
  gap: "12px"
};

const icon = {
  fontSize: "20px",
  color: "green"
};

const label = {
  margin: 0,
  fontSize: "13px",
  color: "#777"
};

const value = {
  margin: 0,
  fontWeight: "bold"
};