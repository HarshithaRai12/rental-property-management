import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PropertyDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:7000/property/getproperties`)
      .then((res) => {
        const found = res.data.find((p) => p._id === id);
        setData(found);
      });
  }, [id]);

  const handleRequest = () => {
  const username = localStorage.getItem("UserName");

  axios.post("http://localhost:7000/request/addrequest", {
    propertyId: data._id,
    tenantName: username
  })
    .then(() => {
      alert("Request Sent Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

  if (!data) return <h2>Loading...</h2>;

  return (
    <div
      style={{
        padding: "40px",
        background: "#f8faf8",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ color: "green" }}>{data.title}</h1>

      <img
        src={`http://localhost:7000/image/${data.propertyimage}`}
        width="500"
        style={{ borderRadius: "12px", marginTop: "20px" }}
      />

      <p style={{ marginTop: "20px" }}>📍 {data.location}</p>
      <p>🏠 {data.type}</p>
      <p>₹ {data.price}</p>
      <p>{data.description}</p>
      <button
  onClick={handleRequest}
  style={{
    marginTop: "20px",
    padding: "12px 25px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }}
>
  Request Property
</button>
    </div>
  );
}