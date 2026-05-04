import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function BrowseProperty() {

  const [properties, setProperties] = useState([])

  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  // ✅ FETCH FUNCTION (NEW)
  const fetchProperties = () => {
    axios.get("http://localhost:7000/property/getproperties")
      .then((res) => {
        setProperties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ✅ USE EFFECT
  useEffect(() => {
    fetchProperties();
  }, []);

  // ✅ REQUEST FUNCTION
  const handleRequest = async (propertyId) => {

    const token = localStorage.getItem("UserToken");
    const username = localStorage.getItem("UserName");

    if (!token) {
      alert("Please login first");
      navigate("/userlogin");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:7000/request/addrequest",
        {
          propertyId: propertyId,
          tenantName: username
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Request Sent Successfully");

      // 🔥 VERY IMPORTANT (FIX)
      fetchProperties();  

    } catch (err) {
      console.log(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  const filteredProperties = properties.filter((item) => {

    const matchLocation =
      item.location.toLowerCase().includes(location.toLowerCase());

    const matchType =
      type === "" ? true : item.type === type;

    const matchPrice =
      price === "" ? true : item.price <= Number(price);

    return matchLocation && matchType && matchPrice;
  });

  return (
    <div
      style={{
        padding: "40px",
        background: "#f8faf8",
        minHeight: "100vh"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "green"
        }}
      >
        Available Properties
      </h1>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "25px",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        <input
          placeholder="Search Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{
            padding: "10px",
            width: "200px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            padding: "10px",
            width: "150px",
            borderRadius: "6px"
          }}
        >
          <option value="">All Types</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
        </select>

        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            padding: "10px",
            width: "150px",
            borderRadius: "6px"
          }}
        >
          <option value="">Max Price</option>
          <option value="10000">Below 10k</option>
          <option value="20000">Below 20k</option>
          <option value="50000">Below 50k</option>
        </select>

        <button
          onClick={() => {
            setLocation("");
            setType("");
            setPrice("");
          }}
          style={{
            padding: "10px 18px",
            background: "#ddd",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Reset
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "25px"
        }}
      >
        {filteredProperties.map((item) => (
          <div
            key={item._id}
            style={{
              background: "white",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}
          >
            <img
              src={`http://localhost:7000/image/${item.propertyimage}`}
              width="100%"
              height="220"
              style={{ objectFit: "cover" }}
            />

            <div style={{ padding: "18px" }}>
              <h2>{item.title}</h2>

              <p>📍 {item.location}</p>
              <p>🏠 {item.type}</p>
              <p>₹ {item.price}</p>

              <p style={{ color: "gray" }}>
                {item.description}
              </p>

              <button
                onClick={() => navigate(`/property/${item._id}`)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#222",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  cursor: "pointer"
                }}
              >
                View Details
              </button>

              <button
                onClick={() => handleRequest(item._id)}
                disabled={item.status === "rented"}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  background: item.status === "rented" ? "gray" : "green",
                  color: "white",
                  cursor: item.status === "rented" ? "not-allowed" : "pointer"
                }}
              >
                {item.status === "rented" ? "Already Rented" : "Request Property"}
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}